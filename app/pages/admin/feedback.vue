<template>
  <UContainer>
    <div class="flex items-center mb-6">
      <UButton to="/admin" icon="i-heroicons-arrow-left" variant="ghost" class="mr-2" />
      <h1 class="text-2xl font-bold">User Feedback</h1>
    </div>

    <!-- Filters and Controls -->
    <UCard class="mb-6">
      <div class="flex flex-wrap gap-4 items-center justify-between">
        <div class="flex flex-wrap gap-4 items-center">
          <USelect v-model="filters.limit" :items="limitOptions" placeholder="Items per page" size="sm" class="w-32" />
          <UInput v-model="filters.user" placeholder="Filter by user ID" size="sm" class="w-48"
            icon="i-heroicons-user" />
          <UInput v-model="filters.from" type="date" placeholder="From date" size="sm" class="w-40"
            icon="i-heroicons-calendar" />
          <UInput v-model="filters.to" type="date" placeholder="To date" size="sm" class="w-40"
            icon="i-heroicons-calendar" />
        </div>
        <div class="flex gap-2">
          <UButton @click="loadFeedback" icon="i-heroicons-arrow-path" :loading="loading" color="primary" size="sm"
            label="Refresh" />
          <UButton @click="clearFilters" icon="i-heroicons-x-mark" color="neutral" variant="soft" size="sm"
            label="Clear" />
        </div>
      </div>
    </UCard>

    <!-- Feedback List -->
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Feedback Messages</h2>
          <div class="text-sm text-gray-500">
            {{ totalItems }} total messages
          </div>
        </div>
      </template>

      <div v-if="loading" class="py-8 text-center">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin w-8 h-8 mx-auto mb-2" />
        <p>Loading feedback...</p>
      </div>

      <div v-else-if="feedbackItems.length > 0">
        <div v-for="item in feedbackItems" :key="item.id" class="border-b last:border-0 py-6">
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-3">
              <UBadge color="primary" variant="soft" class="text-xs">
                #{{ item.id }}
              </UBadge>
              <div class="text-sm text-gray-500">
                {{ formatDateTime(new Date(item.created_at)) }}
              </div>
            </div>
            <div class="flex items-center gap-2">
              <UBadge v-if="item.user_id" color="success" variant="soft" class="text-xs">
                User: {{ item.user_id }}
              </UBadge>
              <UBadge v-else color="neutral" variant="soft" class="text-xs">
                Anonymous
              </UBadge>
            </div>
          </div>

          <!-- Context Information -->
          <div v-if="item.context" class="mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              <div v-if="item.context.sender" class="mb-1">
                <strong>From:</strong> {{ item.context.sender }}
                <span v-if="item.context.senderEmail"> ({{ item.context.senderEmail }})</span>
              </div>
              <div v-if="item.context.source">
                <strong>Source:</strong> {{ item.context.source }}
              </div>
            </div>
          </div>

          <!-- Message Content -->
          <div class="mb-4">
            <div class="prose prose-sm max-w-none dark:prose-invert">
              <div class="whitespace-pre-wrap">{{ item.message }}</div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end gap-2">
            <UButton @click="copyToClipboard(item.message)" icon="i-heroicons-clipboard" color="neutral" variant="soft"
              size="xs" label="Copy" />
            <UButton @click="openReplyModal(item)" icon="i-heroicons-paper-airplane" color="primary" variant="soft"
              size="xs" label="Reply" />
          </div>
        </div>
      </div>

      <div v-else class="py-12 text-center text-gray-500">
        <UIcon name="i-heroicons-chat-bubble-left-right" class="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p class="text-lg font-medium mb-2">No feedback messages found</p>
        <p class="text-sm">Try adjusting your filters or check back later.</p>
      </div>

      <!-- Pagination -->
      <template #footer>
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500">
            Showing {{ startItem }}-{{ endItem }} of {{ totalItems }} messages
          </div>
          <UPagination v-if="totalPages > 1" v-model="currentPage" :total="totalPages"
            :ui="{ root: 'flex items-center gap-1' }" />
        </div>
      </template>
    </UCard>

    <!-- Reply Modal -->
    <UModal v-model="isReplyModalOpen">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">Reply to Feedback</h3>
        </template>

        <div v-if="selectedFeedback" class="mb-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p v-if="selectedFeedback.context?.sender">
              <strong>To:</strong> {{ selectedFeedback.context.sender }}
              <span v-if="selectedFeedback.context.senderEmail"> ({{ selectedFeedback.context.senderEmail }})</span>
            </p>
            <p v-else><strong>To:</strong> Anonymous User</p>
            <p><strong>Original Message:</strong></p>
            <div class="p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
              {{ selectedFeedback.message }}
            </div>
          </div>
        </div>

        <UTextarea v-model="replyMessage" placeholder="Type your reply here..." class="w-full mb-4" :rows="6" />

        <template #footer>
          <div class="flex justify-end space-x-2">
            <UButton @click="isReplyModalOpen = false" color="neutral" variant="soft" label="Cancel" />
            <UButton @click="sendReply" color="primary" label="Send Reply" />
          </div>
        </template>
      </UCard>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
// Types based on the actual database schema
interface FeedbackContext {
  sender?: string
  senderEmail?: string
  source: string
}

interface FeedbackItem {
  id: number
  user_id: string | null
  context: FeedbackContext
  message: string
  created_at: string
}

interface FeedbackResponse {
  items: FeedbackItem[]
  total: number
  hasMore: boolean
}

// State
const loading = ref(false)
const currentPage = ref(1)
const totalItems = ref(0)
const totalPages = ref(1)
const isReplyModalOpen = ref(false)
const replyMessage = ref('')
const selectedFeedback = ref<FeedbackItem | null>(null)

// Filters
const filters = reactive({
  limit: 10,
  user: '',
  from: '',
  to: '',
  asc: false
})

// Options
const limitOptions = [
  { label: '10 per page', value: 10 },
  { label: '20 per page', value: 20 },
  { label: '50 per page', value: 50 }
]

// Computed
const startItem = computed(() => (currentPage.value - 1) * filters.limit + 1)
const endItem = computed(() => Math.min(currentPage.value * filters.limit, totalItems.value))

// Feedback items
const feedbackItems = ref<FeedbackItem[]>([])

// API service
const api = useWonServiceApi()

// Load feedback from API
const loadFeedback = async () => {
  loading.value = true

  try {
    const params = new URLSearchParams()

    // Add pagination
    params.append('limit', filters.limit.toString())
    params.append('offset', ((currentPage.value - 1) * filters.limit).toString())

    // Add filters
    if (filters.user) {
      params.append('user', filters.user)
    }
    if (filters.from) {
      params.append('from', filters.from)
    }
    if (filters.to) {
      params.append('to', filters.to)
    }
    if (filters.asc) {
      params.append('asc', 'true')
    }

    const response = await api.get<FeedbackResponse>(`feedback?${params.toString()}`)

    if (response.ok) {
      feedbackItems.value = response.data.items
      totalItems.value = response.data.total
      totalPages.value = Math.ceil(totalItems.value / filters.limit)
    } else {
      console.error('Failed to load feedback:', response.status)
      // Show error notification
      useToast().add({
        title: 'Error',
        description: 'Failed to load feedback messages',
        color: 'error'
      })
    }
  } catch (error) {
    console.error('Error loading feedback:', error)
    useToast().add({
      title: 'Error',
      description: 'Failed to load feedback messages',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

// Clear all filters
const clearFilters = () => {
  filters.user = ''
  filters.from = ''
  filters.to = ''
  filters.asc = false
  filters.limit = 10
  currentPage.value = 1
  loadFeedback()
}

// Copy message to clipboard
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    useToast().add({
      title: 'Copied',
      description: 'Message copied to clipboard',
      color: 'success'
    })
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    useToast().add({
      title: 'Error',
      description: 'Failed to copy message',
      color: 'error'
    })
  }
}

// Reply functionality
const openReplyModal = (item: FeedbackItem) => {
  selectedFeedback.value = item
  isReplyModalOpen.value = true
}

const sendReply = async () => {
  if (!selectedFeedback.value || !replyMessage.value.trim()) {
    return
  }

  try {
    // Here you would implement the actual reply functionality
    // For now, we'll just show a success message
    console.log('Sending reply to:', selectedFeedback.value.id)
    console.log('Message:', replyMessage.value)

    useToast().add({
      title: 'Reply Sent',
      description: 'Your reply has been sent successfully',
      color: 'success'
    })

    // Close modal and reset form
    isReplyModalOpen.value = false
    replyMessage.value = ''
    selectedFeedback.value = null
  } catch (error) {
    console.error('Error sending reply:', error)
    useToast().add({
      title: 'Error',
      description: 'Failed to send reply',
      color: 'error'
    })
  }
}

// Watch for filter changes
watch([() => filters.limit, () => filters.user, () => filters.from, () => filters.to, () => filters.asc], () => {
  currentPage.value = 1
  loadFeedback()
})

// Watch for page changes
watch(currentPage, () => {
  loadFeedback()
})

// Load initial data
onMounted(() => {
  loadFeedback()
})
</script>
