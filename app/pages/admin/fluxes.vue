<template>
  <UContainer>
    <div class="flex items-center mb-6">
      <UButton to="/admin" icon="i-heroicons-arrow-left" variant="ghost" class="mr-2" />
      <h1 class="text-2xl font-bold">Flux Administration</h1>
    </div>

    <UCard class="mb-8">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Flagged Content</h2>
          <div class="flex space-x-2">
            <USelect
              v-model="filterType"
              :options="filterOptions"
              placeholder="Filter by"
              size="sm"
              class="w-40"
            />
            <UButton
              @click="loadFlaggedFluxes"
              icon="i-heroicons-arrow-path"
              color="gray"
              variant="ghost"
              size="sm"
            />
          </div>
        </div>
      </template>

      <div v-if="flaggedFluxes.length > 0">
        <div v-for="flux in flaggedFluxes" :key="flux.id" class="border-b last:border-0 py-4">
          <div class="flex justify-between mb-2">
            <div class="flex items-center">
              <UAvatar :src="flux.author.avatar" :alt="flux.author.alias" size="sm" class="mr-2" />
              <div>
                <div class="font-medium">{{ flux.author.alias }}</div>
                <div class="text-xs text-gray-500">@{{ flux.author.handle }}</div>
              </div>
            </div>
            <div class="flex items-center">
              <UBadge :color="getFlagTypeColor(flux.flagType)" size="sm" class="mr-2">
                {{ flux.flagType }}
              </UBadge>
              <div class="text-xs text-gray-500">
                {{ formatDateTime(new Date(flux.flaggedAt)) }}
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded mb-3">
            {{ flux.content }}
          </div>

          <div class="flex justify-between items-center">
            <div class="text-xs text-gray-500">
              Flagged by: {{ flux.flaggedBy }} • Flags: {{ flux.flagCount }}
            </div>
            <div class="flex space-x-2">
              <UButton
                @click="approveFlux(flux.id)"
                color="green"
                variant="soft"
                size="xs"
                icon="i-heroicons-check"
                label="Approve"
              />
              <UButton
                @click="hideFlux(flux.id)"
                color="yellow"
                variant="soft"
                size="xs"
                icon="i-heroicons-eye-slash"
                label="Hide"
              />
              <UButton
                @click="deleteFlux(flux.id)"
                color="red"
                variant="soft"
                size="xs"
                icon="i-heroicons-trash"
                label="Delete"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="py-8 text-center text-gray-500">No flagged content found</div>

      <template #footer>
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500">
            Showing {{ flaggedFluxes.length }} of {{ totalFlagged }} flagged items
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
        <h2 class="text-xl font-semibold">Moderation Statistics</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded">
          <div class="text-3xl font-bold text-primary mb-1">{{ stats.pending }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Pending Review</div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded">
          <div class="text-3xl font-bold text-green-500 mb-1">{{ stats.approved }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Approved</div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded">
          <div class="text-3xl font-bold text-red-500 mb-1">{{ stats.removed }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Removed</div>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { useFluxService } from '~/composables/useFluxService'
import type { Flux } from '~/types/won-types'

// Mock data for flagged fluxes
interface FlaggedFlux extends Flux {
  flagType: 'spam' | 'inappropriate' | 'harassment' | 'misinformation' | 'other'
  flaggedAt: string
  flaggedBy: string
  flagCount: number
  status: 'pending' | 'approved' | 'hidden' | 'deleted'
}

const filterType = ref('all')
const filterOptions = [
  { label: 'All Flags', value: 'all' },
  { label: 'Spam', value: 'spam' },
  { label: 'Inappropriate', value: 'inappropriate' },
  { label: 'Harassment', value: 'harassment' },
  { label: 'Misinformation', value: 'misinformation' },
  { label: 'System Flagged', value: 'system' },
  { label: 'User Flagged', value: 'user' },
]

const currentPage = ref(1)
const totalPages = ref(5)
const totalFlagged = ref(23)

// Mock statistics
const stats = reactive({
  pending: 23,
  approved: 156,
  removed: 42,
})

// Mock data for flagged fluxes
const flaggedFluxes = ref<FlaggedFlux[]>([
  {
    id: 1,
    authorId: 101,
    author: {
      alias: 'NuclearEnthusiast',
      handle: 'nuclear_fan',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nuclear_fan',
    },
    reactingTo: null,
    content:
      'This content has been flagged as potentially containing misinformation about nuclear energy safety protocols.',
    views: 245,
    boosts: 12,
    reactions: 8,
    postedAt: '2023-05-15T14:23:45Z',
    updatedAt: '2023-05-15T14:23:45Z',
    flagType: 'misinformation',
    flaggedAt: '2023-05-16T08:12:33Z',
    flaggedBy: 'System Bot',
    flagCount: 1,
    status: 'pending',
  },
  {
    id: 2,
    authorId: 102,
    author: {
      alias: 'AtomicAdvocate',
      handle: 'atom_adv',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=atom_adv',
    },
    reactingTo: null,
    content:
      'This post contains language that may violate our community guidelines regarding respectful discourse.',
    views: 189,
    boosts: 5,
    reactions: 23,
    postedAt: '2023-05-14T09:45:12Z',
    updatedAt: '2023-05-14T09:45:12Z',
    flagType: 'harassment',
    flaggedAt: '2023-05-14T10:22:18Z',
    flaggedBy: 'User: ModeratorOne',
    flagCount: 3,
    status: 'pending',
  },
  {
    id: 3,
    authorId: 103,
    author: {
      alias: 'FissionFan',
      handle: 'fission_fan',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fission_fan',
    },
    reactingTo: null,
    content:
      'This post has been automatically flagged for containing promotional content that may be considered spam.',
    views: 78,
    boosts: 0,
    reactions: 2,
    postedAt: '2023-05-13T16:33:21Z',
    updatedAt: '2023-05-13T16:33:21Z',
    flagType: 'spam',
    flaggedAt: '2023-05-13T16:35:42Z',
    flaggedBy: 'System Bot',
    flagCount: 1,
    status: 'pending',
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

// Get color for flag type badge
const getFlagTypeColor = (type: string) => {
  const colorMap: Record<string, string> = {
    spam: 'yellow',
    inappropriate: 'orange',
    harassment: 'red',
    misinformation: 'blue',
    other: 'gray',
  }
  return colorMap[type] || 'gray'
}

// Load flagged fluxes (mock implementation)
const loadFlaggedFluxes = () => {
  // In a real implementation, this would fetch data from the API
  console.log('Loading flagged fluxes with filter:', filterType.value)
}

// Action handlers
const approveFlux = (id: number) => {
  console.log('Approving flux:', id)
  // Remove from the list for demo purposes
  flaggedFluxes.value = flaggedFluxes.value.filter((flux) => flux.id !== id)
  stats.pending--
  stats.approved++
}

const hideFlux = (id: number) => {
  console.log('Hiding flux:', id)
  // Remove from the list for demo purposes
  flaggedFluxes.value = flaggedFluxes.value.filter((flux) => flux.id !== id)
  stats.pending--
}

const deleteFlux = (id: number) => {
  console.log('Deleting flux:', id)
  // Remove from the list for demo purposes
  flaggedFluxes.value = flaggedFluxes.value.filter((flux) => flux.id !== id)
  stats.pending--
  stats.removed++
}

onMounted(() => {
  loadFlaggedFluxes()
})
</script>
