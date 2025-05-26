<template>
  <UContainer>
    <div class="flex items-center mb-6">
      <UButton to="/admin" icon="i-heroicons-arrow-left" variant="ghost" class="mr-2" />
      <h1 class="text-2xl font-bold">Flux Administration</h1>
    </div>

    <UCard class="mb-8">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Flux Rating Review</h2>
          <div class="flex space-x-2">
            <USelect
              v-model="ratingFilter"
              :options="ratingOptions"
              placeholder="Filter by"
              size="sm"
              class="w-40"
            />
            <UButton
              @click="loadFluxRatings"
              icon="i-heroicons-arrow-path"
              variant="ghost"
              size="sm"
            />
          </div>
        </div>
      </template>

      <div v-if="fluxRatings.length > 0">
        <div
          v-for="ratingInfo in fluxRatings"
          :key="ratingInfo.id"
          class="border-b last:border-0 py-4"
        >
          <div class="flex justify-between mb-2">
            <MemberNameTag alias="Bubba" handle="bubba-42" />
            <div class="flex items-center">
              <UBadge
                :color="ratingColor(ratingInfo.rating)"
                size="sm"
                :label="ratingLabel(ratingInfo.rating)"
                class="mr-2"
              />
              <div v-if="ratingInfo.blockedAt" class="text-xs text-gray-500">
                {{ formatDateTime(new Date(ratingInfo.blockedAt)) }}
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded mb-3">
            <span v-html="ratingInfo.content" />
          </div>

          <div class="flex justify-between items-center">
            <div class="text-xs text-gray-500">Rating reason: {{ ratingInfo.reason }}</div>
            <div class="flex space-x-2">
              <UButton
                @click="confirmRating(ratingInfo.id)"
                color="success"
                variant="soft"
                size="xs"
                icon="i-heroicons-check"
                label="Confirm"
              />
              <!-- use drop down button to choose an alternate rating -->
              <UButton
                @click="adjustRating(ratingInfo.id, 'violation')"
                color="success"
                variant="soft"
                size="xs"
                icon="i-heroicons-check"
                label="Adjust"
              />
              <UButton
                @click="blockFlux(ratingInfo.id)"
                color="warning"
                variant="soft"
                size="xs"
                icon="i-heroicons-eye-slash"
                label="Block"
              />
              <UButton
                @click="deleteFlux(ratingInfo.id)"
                color="error"
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
            Showing {{ fluxRatings.length }} of {{ totalFlagged }} flagged items
          </div>
          <UPagination v-if="totalPages > 1" v-model="currentPage" :total="totalPages" />
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
import type { FluxRating } from '~/types/won-types'

const ratingFilter = ref(null)
const ratingOptions = [
  { label: '-- all --', value: null, color: 'neutral' },
  { label: 'G', value: 'safe', color: 'success' },
  { label: 'PG', value: 'edgy', color: 'primary' },
  { label: 'R', value: 'harsh', color: 'warning' },
  { label: 'X', value: 'violation', color: 'error' },
]

const batchSize = 10
const nextBatchOffset = ref(0)
const isMoreRatings = ref(true)
const activeRatings: Ref<FluxRating[]> = ref([])

const currentPage = ref(1)
const totalPages = ref(5)
const totalFlagged = ref(23)

// Mock statistics
const stats = reactive({
  pending: 23,
  approved: 156,
  removed: 42,
})

const ratingLabel = (key: string) => {
  const rating = ratingOptions.find((item) => item.value === key)
  if (rating) {
    return rating.label
  } else {
    return '??'
  }
}

const ratingColor = (key: string) => {
  const rating = ratingOptions.find((item) => item.value === key)
  if (rating) {
    return rating.color
  } else {
    return 'neutral'
  }
}

// Mock data for flagged fluxes
const fluxRatings = ref<FluxRating[]>([
  {
    id: 155,
    rating: 'safe',
    reason: 'The post expresses a request for kindness and contains no inappropriate content.',
    fluxId: 1,
    authorId: 1,
    content: '<p>This is my first time fluxing. Please be kind.</p>',
    blockedAt: null,
    actionTaken: null,
    reviewNote: null,
  },
  {
    id: 156,
    rating: 'edgy',
    reason:
      "The post contains a neutral statement and does not violate any of the forum's guidelines.",
    fluxId: 2,
    authorId: 1,
    content: '<p>Something new to boost.</p>',
    blockedAt: null,
    actionTaken: null,
    reviewNote: null,
  },
  {
    id: 15600,
    rating: 'harsh',
    reason:
      "The post contains a neutral statement and does not violate any of the forum's guidelines.",
    fluxId: 2,
    authorId: 1,
    content: '<p>Something new to boost.</p>',
    blockedAt: null,
    actionTaken: null,
    reviewNote: null,
  },
  {
    id: 15601,
    rating: 'violation',
    reason:
      "The post contains a neutral statement and does not violate any of the forum's guidelines.",
    fluxId: 2,
    authorId: 1,
    content: '<p>Something new to boost.</p>',
    blockedAt: null,
    actionTaken: null,
    reviewNote: null,
  },
])

// formatDateTime is provided by auto-loaded utils

// Load flagged fluxes (mock implementation)
const loadFluxRatings = async () => {
  const ratings = await useAdminService().fetchFluxRatings(batchSize, nextBatchOffset.value)
  if (ratings) {
    activeRatings.value = ratings.items
    nextBatchOffset.value += ratings.total
    isMoreRatings.value = ratings.hasMore
  }
}

// Action handlers
const confirmRating = (id: number) => {
  console.log('Confirm flux rating:', id)
  // Remove from the list for demo purposes
  fluxRatings.value = fluxRatings.value.filter((flux) => flux.id !== id)
  stats.pending--
  stats.approved++
}

const adjustRating = (id: number, ratingValue: string) => {
  console.log('Adjust flux rating:', id, ratingValue)
  // Remove from the list for demo purposes
  fluxRatings.value = fluxRatings.value.filter((flux) => flux.id !== id)
  stats.pending--
  stats.approved++
}

// Clear violation of terms of use - must be generally blocked from view
const blockFlux = (id: number) => {
  console.log('Block flux:', id)
  // Remove from the list for demo purposes
  fluxRatings.value = fluxRatings.value.filter((flux) => flux.id !== id)
  stats.pending--
}

// Too far; best to "delete" and suspend user
const deleteFlux = (id: number) => {
  console.log('Delete flux:', id)
  // Remove from the list for demo purposes
  fluxRatings.value = fluxRatings.value.filter((flux) => flux.id !== id)
  stats.pending--
  stats.removed++
}

onMounted(() => {
  loadFluxRatings()
})
</script>
