<template>
  <UContainer>
    <div class="flex items-center mb-6">
      <UButton to="/admin" icon="i-heroicons-arrow-left" variant="ghost" class="mr-2" />
      <h1 class="text-2xl font-bold">User Feedback</h1>
    </div>

    <UCard class="mb-8">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Feedback Submissions</h2>
          <div class="flex space-x-2">
            <USelect
              v-model="statusFilter"
              :options="statusOptions"
              placeholder="Status"
              size="sm"
              class="w-40"
            />
            <UButton
              @click="loadFeedback"
              icon="i-heroicons-arrow-path"
              color="gray"
              variant="ghost"
              size="sm"
            />
          </div>
        </div>
      </template>

      <div v-if="feedbackItems.length > 0">
        <div v-for="item in feedbackItems" :key="item.id" class="border-b last:border-0 py-4">
          <div class="flex justify-between mb-2">
            <div class="flex items-center">
              <UBadge :color="getFeedbackTypeColor(item.type)" class="mr-2">
                {{ item.type }}
              </UBadge>
              <div class="text-sm">{{ formatDateTime(new Date(item.submittedAt)) }}</div>
            </div>
            <UBadge :color="getStatusColor(item.status)">
              {{ item.status }}
            </UBadge>
          </div>

          <div class="mb-2">
            <div class="font-medium">{{ item.subject }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              From: {{ item.userEmail || 'Anonymous' }}
              {{ item.userId ? `(User ID: ${item.userId})` : '' }}
            </div>
          </div>

          <UAccordion :items="[{ label: 'View Message', content: item.message, default: false }]" />

          <div class="flex justify-end mt-3 space-x-2">
            <UButton
              v-if="item.status === 'new'"
              @click="markAsInProgress(item.id)"
              color="blue"
              variant="soft"
              size="xs"
              icon="i-heroicons-clock"
              label="Mark In Progress"
            />
            <UButton
              v-if="['new', 'in_progress'].includes(item.status)"
              @click="markAsResolved(item.id)"
              color="green"
              variant="soft"
              size="xs"
              icon="i-heroicons-check"
              label="Mark Resolved"
            />
            <UButton
              @click="openReplyModal(item)"
              color="primary"
              variant="soft"
              size="xs"
              icon="i-heroicons-paper-airplane"
              label="Reply"
            />
          </div>
        </div>
      </div>
      <div v-else class="py-8 text-center text-gray-500">No feedback submissions found</div>

      <template #footer>
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500">
            Showing {{ feedbackItems.length }} of {{ totalFeedback }} feedback items
          </div>
          <UPagination
            v-if="totalPages > 1"
            v-model="currentPage"
            :total="totalPages"
            :ui="{ wrapper: 'flex items-center gap-1' }"
          />
        </div>
      </template>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">Feedback Overview</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded">
          <div class="text-3xl font-bold text-primary mb-1">{{ stats.total }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Total Submissions</div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded">
          <div class="text-3xl font-bold text-blue-500 mb-1">{{ stats.new }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">New</div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded">
          <div class="text-3xl font-bold text-yellow-500 mb-1">{{ stats.inProgress }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded">
          <div class="text-3xl font-bold text-green-500 mb-1">{{ stats.resolved }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Resolved</div>
        </div>
      </div>

      <div>
        <h3 class="font-medium mb-3">Feedback by Type</h3>
        <div class="h-64">
          <div class="grid grid-cols-2 h-full">
            <div class="flex flex-col justify-center">
              <div v-for="(value, type) in feedbackByType" :key="type" class="mb-2">
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full mr-2" :class="getTypeColorClass(type)"></div>
                  <div class="text-sm">{{ type }}</div>
                </div>
                <div class="text-xs text-gray-500">{{ value }} submissions</div>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <!-- Placeholder for chart -->
              <div class="w-40 h-40 rounded-full border-8 border-gray-200 relative">
                <div
                  class="absolute inset-0 border-t-8 border-l-8 border-primary rounded-full"
                ></div>
                <div
                  class="absolute inset-0 border-r-8 border-yellow-500 rounded-full"
                  style="clip: rect(0, 100px, 100px, 50px)"
                ></div>
                <div
                  class="absolute inset-0 border-b-8 border-green-500 rounded-full"
                  style="clip: rect(50px, 100px, 100px, 0)"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Reply Modal -->
    <UModal v-model="isReplyModalOpen">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">Reply to Feedback</h3>
        </template>

        <div v-if="selectedFeedback" class="mb-4">
          <p class="text-sm text-gray-500">
            To: {{ selectedFeedback.userEmail || 'Anonymous User' }}
          </p>
          <p class="text-sm text-gray-500">Subject: Re: {{ selectedFeedback.subject }}</p>
        </div>

        <UTextarea
          v-model="replyMessage"
          placeholder="Type your reply here..."
          class="w-full mb-4"
          rows="6"
        />

        <template #footer>
          <div class="flex justify-end space-x-2">
            <UButton @click="isReplyModalOpen = false" color="gray" variant="soft" label="Cancel" />
            <UButton @click="sendReply" color="primary" label="Send Reply" />
          </div>
        </template>
      </UCard>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
// Mock feedback data interface
interface FeedbackItem {
  id: string
  type: 'bug_report' | 'feature_request' | 'general' | 'question' | 'complaint'
  subject: string
  message: string
  submittedAt: string
  status: 'new' | 'in_progress' | 'resolved'
  userId?: string
  userEmail?: string
}

// State
const statusFilter = ref('')
const currentPage = ref(1)
const totalPages = ref(3)
const totalFeedback = ref(12)
const isReplyModalOpen = ref(false)
const replyMessage = ref('')
const selectedFeedback = ref<FeedbackItem | null>(null)

// Filter options
const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'New', value: 'new' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Resolved', value: 'resolved' },
]

// Mock statistics
const stats = reactive({
  total: 42,
  new: 12,
  inProgress: 8,
  resolved: 22,
})

// Mock feedback by type data
const feedbackByType = reactive({
  'Bug Report': 15,
  'Feature Request': 12,
  Question: 8,
  General: 5,
  Complaint: 2,
})

// Mock feedback data
const feedbackItems = ref<FeedbackItem[]>([
  {
    id: 'fb_1001',
    type: 'bug_report',
    subject: 'Error when posting flux with images',
    message:
      'I tried to post a flux with multiple images but got an error saying "Maximum file size exceeded" even though my images are under 2MB each.',
    submittedAt: '2023-05-21T14:32:45Z',
    status: 'new',
    userId: 'user_123',
    userEmail: 'user123@example.com',
  },
  {
    id: 'fb_1002',
    type: 'feature_request',
    subject: 'Add dark mode to the app',
    message:
      "It would be great to have a dark mode option for the app. It's hard to use at night with the current bright theme.",
    submittedAt: '2023-05-20T09:15:22Z',
    status: 'in_progress',
    userId: 'user_456',
    userEmail: 'user456@example.com',
  },
  {
    id: 'fb_1003',
    type: 'question',
    subject: 'How do I change my profile picture?',
    message:
      "I've been trying to update my profile picture but can't find where to do it. Can you please help?",
    submittedAt: '2023-05-19T16:45:11Z',
    status: 'resolved',
    userEmail: 'anonymous@example.com',
  },
  {
    id: 'fb_1004',
    type: 'general',
    subject: 'Love the new design!',
    message:
      "Just wanted to say that I really like the new design of the website. It's much more intuitive and looks great!",
    submittedAt: '2023-05-18T11:22:33Z',
    status: 'new',
    userId: 'user_789',
    userEmail: 'user789@example.com',
  },
  {
    id: 'fb_1005',
    type: 'complaint',
    subject: 'Too many notifications',
    message:
      "I'm getting way too many email notifications from the system. Please add more granular control over notification settings.",
    submittedAt: '2023-05-17T08:12:18Z',
    status: 'new',
    userId: 'user_101',
    userEmail: 'user101@example.com',
  },
])

// Format date and time for display
const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

// Get color for feedback type badge
const getFeedbackTypeColor = (type: string) => {
  const colorMap: Record<string, string> = {
    bug_report: 'red',
    feature_request: 'blue',
    general: 'gray',
    question: 'green',
    complaint: 'orange',
  }
  return colorMap[type] || 'gray'
}

// Get color class for chart
const getTypeColorClass = (type: string) => {
  const colorMap: Record<string, string> = {
    'Bug Report': 'bg-red-500',
    'Feature Request': 'bg-blue-500',
    Question: 'bg-green-500',
    General: 'bg-gray-500',
    Complaint: 'bg-orange-500',
  }
  return colorMap[type] || 'bg-gray-500'
}

// Get color for status badge
const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    new: 'blue',
    in_progress: 'yellow',
    resolved: 'green',
  }
  return colorMap[status] || 'gray'
}

// Load feedback (mock implementation)
const loadFeedback = () => {
  // In a real implementation, this would fetch data from the API
  console.log('Loading feedback with status filter:', statusFilter.value)
}

// Action handlers
const markAsInProgress = (id: string) => {
  console.log('Marking feedback as in progress:', id)
  const item = feedbackItems.value.find((item) => item.id === id)
  if (item) {
    item.status = 'in_progress'
    stats.new--
    stats.inProgress++
  }
}

const markAsResolved = (id: string) => {
  console.log('Marking feedback as resolved:', id)
  const item = feedbackItems.value.find((item) => item.id === id)
  if (item) {
    if (item.status === 'new') {
      stats.new--
    } else if (item.status === 'in_progress') {
      stats.inProgress--
    }
    item.status = 'resolved'
    stats.resolved++
  }
}

const openReplyModal = (item: FeedbackItem) => {
  selectedFeedback.value = item
  isReplyModalOpen.value = true
}

const sendReply = () => {
  if (!selectedFeedback.value || !replyMessage.value.trim()) {
    return
  }

  console.log('Sending reply to:', selectedFeedback.value.id)
  console.log('Message:', replyMessage.value)

  // In a real implementation, this would send the reply via API

  // Close modal and reset form
  isReplyModalOpen.value = false
  replyMessage.value = ''
  selectedFeedback.value = null
}

onMounted(() => {
  loadFeedback()
})
</script>
