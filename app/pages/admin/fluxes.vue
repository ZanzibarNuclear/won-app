<template>
  <UContainer>
    <div class="flex items-center mb-6">
      <UButton
        to="/admin"
        icon="i-ph-arrow-bend-up-left-duotone"
        size="xl"
        variant="ghost"
        class="mr-2"
      />
      <h1 class="text-2xl font-bold">Flux Administration</h1>
    </div>

    <UCard class="mb-8">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Flux Rating Review</h2>
          <div class="flex space-x-2">
            <USelect
              v-model="ratingFilter"
              :items="ratingOptions"
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

      <div v-if="activeRatings">
        <div
          v-for="ratingInfo in activeRatings"
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
                color="info"
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
          <div class="text-sm text-gray-500">Showing {{ activeRatings.length }} flagged items</div>
          <div class="flex space-x-2">
            <UButton
              v-if="isMoreRatings"
              @click="loadMoreRatings"
              size="sm"
              color="primary"
              variant="soft"
              icon="i-heroicons-arrow-down"
              label="Get More"
            />
            <UButton
              @click="reloadRatings"
              size="sm"
              variant="soft"
              icon="i-heroicons-arrow-path"
              label="Reload"
            />
          </div>
        </div>
      </template>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'
import type { FluxRating } from '~/types/won-types'

const ratingFilter = ref(null)
type BadgeColor =
  | 'neutral'
  | 'success'
  | 'primary'
  | 'warning'
  | 'error'
  | 'secondary'
  | 'info'
  | undefined

const ratingOptions: SelectItem[] = [
  { label: 'all', value: 'any', color: 'neutral' },
  { label: 'G', value: 'safe', color: 'success' },
  { label: 'PG', value: 'edgy', color: 'info' },
  { label: 'R', value: 'harsh', color: 'warning' },
  { label: 'X', value: 'violation', color: 'error' },
]

const batchSize = 10
const nextBatchOffset = ref(0)
const isMoreRatings = ref(true)
const activeRatings: Ref<FluxRating[]> = ref([])

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

const ratingColor = (key: string): BadgeColor => {
  const rating = ratingOptions.find((item) => item.value === key)
  if (rating) {
    return rating.color
  } else {
    return 'neutral'
  }
}

const activeRatingFilter = computed(() => {
  if (ratingFilter.value && ratingFilter.value !== 'any') {
    return [ratingFilter.value]
  } else {
    return []
  }
})

// Watch for filter changes and reload data
watch(activeRatingFilter, async () => {
  await loadFluxRatings()
})

onMounted(async () => {
  await loadFluxRatings()
})

// formatDateTime is provided by auto-loaded utils

// Load flagged fluxes (initial load)
const loadFluxRatings = async () => {
  // Reset offset to 0 for initial load
  nextBatchOffset.value = 0

  const ratings = await useAdminService().fetchFluxRatings(
    batchSize,
    0, // Start from offset 0
    activeRatingFilter.value,
    true, // needsReview parameter
  )

  if (ratings) {
    // Replace existing ratings with new ones
    activeRatings.value = ratings.items

    // Update hasMore flag
    isMoreRatings.value = ratings.hasMore

    // Update the offset for next batch
    nextBatchOffset.value = ratings.total
  }
}

// Load more ratings (append to existing)
const loadMoreRatings = async () => {
  if (!isMoreRatings.value) return

  const ratings = await useAdminService().fetchFluxRatings(
    batchSize,
    nextBatchOffset.value,
    activeRatingFilter.value,
    true, // needsReview parameter
  )

  if (ratings) {
    // Append new ratings to existing ones
    activeRatings.value = ratings.items

    // Update hasMore flag
    isMoreRatings.value = ratings.hasMore

    // Update the offset for next batch
    nextBatchOffset.value += ratings.total
  }
}

// Reload ratings (reset and load from beginning)
const reloadRatings = () => {
  loadFluxRatings()
}

// Action handlers
const confirmRating = (id: number) => {
  console.log('Confirm flux rating:', id)
  // Remove from the list for demo purposes
  activeRatings.value = activeRatings.value.filter((flux) => flux.id !== id)
  stats.pending--
  stats.approved++

  // Reload if no items left
  if (activeRatings.value.length === 0) {
    loadFluxRatings()
  }
}

const adjustRating = (id: number, ratingValue: string) => {
  console.log('Adjust flux rating:', id, ratingValue)
  // Remove from the list for demo purposes
  activeRatings.value = activeRatings.value.filter((flux) => flux.id !== id)
  stats.pending--
  stats.approved++

  // Reload if no items left
  if (activeRatings.value.length === 0) {
    loadFluxRatings()
  }
}

// Clear violation of terms of use - must be generally blocked from view
const blockFlux = (id: number) => {
  console.log('Block flux:', id)
  // Remove from the list for demo purposes
  activeRatings.value = activeRatings.value.filter((flux) => flux.id !== id)
  stats.pending--

  // Reload if no items left
  if (activeRatings.value.length === 0) {
    loadFluxRatings()
  }
}

const deleteFlux = (id: number) => {
  console.log('Delete flux:', id)
}

// Mock data for flagged fluxes - keep for reference
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
</script>
