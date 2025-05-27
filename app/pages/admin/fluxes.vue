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
              :items="ratingOpts"
              placeholder="Filter by"
              size="sm"
              class="w-40"
            />
            <UButton
              @click="reloadRatings"
              icon="i-ph-arrow-fat-right-duotone"
              variant="ghost"
              size="md"
            />
          </div>
        </div>
      </template>

      <div v-if="ratings">
        <div v-for="rating in ratings.items" :key="rating.id" class="border-b last:border-0 py-4">
          <div class="flex justify-between mb-2" @click="selectRating(rating)">
            <div class="flex items-center">
              <UBadge
                :color="ratingColor(rating.rating)"
                size="sm"
                :label="ratingDisplay(rating.rating)"
                class="mr-2"
              />
              <div class="text-sm">Rating reason: {{ rating.reason }}</div>
            </div>
            <div v-if="rating.createdAt" class="text-xs text-gray-500">
              {{ formatDateTime(new Date(rating.createdAt)) }}
            </div>
          </div>
        </div>
        <div v-if="activeRating">
          <div>
            <UInput v-model="reviewDetails.note" placeholder="Optional note" class="w-full" />
          </div>
          <div>Comment: {{ activeRating.reviewNote }}</div>
          <div class="flex justify-between items-center my-2">
            <div class="flex space-x-2">
              <UButton
                @click="confirmRating(activeRating.id)"
                color="success"
                variant="soft"
                size="xs"
                icon="i-ph-thumbs-up-duotone"
                label="Confirm"
              />
              <UButtonGroup>
                <UButton
                  @click="adjustRating(activeRating.id)"
                  color="info"
                  variant="soft"
                  size="xs"
                  label="Adjust"
                />
                <USelect
                  :v-model="reviewDetails.adjustedRating"
                  :items="ratingOpts"
                  size="xs"
                  update:model-value="pickRating"
                />
              </UButtonGroup>
            </div>
            <div class="flex space-x-2">
              <UButton
                @click="blockFlux(activeRating.id)"
                color="warning"
                variant="soft"
                size="xs"
                icon="i-heroicons-eye-slash"
                label="Block"
              />
              <UButton
                @click="deleteFlux(activeRating.id)"
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

      <template #footer>
        <div class="flex justify-between items-center">
          <div class="flex space-x-2">
            <UButton
              v-if="ratings.hasMore"
              @click="loadNextBatch"
              size="sm"
              color="primary"
              variant="soft"
              icon="i-ph-arrow-right-duotone"
              label="Next"
            />
            <UButton
              @click="reloadRatings"
              size="sm"
              variant="soft"
              icon="i-ph-arrow-arc-left-duotone"
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
import type { FluxRating, FluxRatingLevel, FluxRatingBatch } from '~/types/won-types'

const adminService = useAdminService()

const ratingFilter = ref(null)
const ratingLevels: Ref<FluxRatingLevel[]> = ref([])
const ratingOpts = computed((): SelectItem[] => {
  return ratingLevels.value.map((level) => ({ label: level.display, value: level.code }))
})
const ratingDisplay = (ratingCode: string) => {
  const level = ratingLevels.value.find((level) => level.code === ratingCode)
  return level ? level.display : 'Unknown'
}
const lookupRatingLevel = (code: string) => {
  return ratingLevels.value.find((level) => level.code === code)
}
const ratingColor = (code: string) => {
  const severity = lookupRatingLevel(code)?.severity
  switch (severity) {
    case 1:
      return 'success'
    case 2:
      return 'info'
    case 3:
      return 'warning'
    case 4:
      return 'error'
    default:
      return 'neutral'
  }
}

const batchSize = 5
const nextBatchOffset = ref(0)
const ratings: Ref<FluxRatingBatch> = ref({
  items: [],
  total: 0,
  hasMore: false,
})
const activeRating: Ref<FluxRating | null> = ref(null)
const reviewDetails = reactive({
  adjustedRating: null,
  note: '',
})
const clearReviewDetails = () => {
  reviewDetails.adjustedRating = null
  reviewDetails.note = ''
}
const selectRating = (rating: FluxRating) => {
  activeRating.value = rating
}

const loadNextBatch = async () => {
  const batch = await adminService.fetchFluxRatings(
    batchSize,
    nextBatchOffset.value,
    activeRatingFilter.value,
  )
  if (batch) {
    ratings.value = batch
    nextBatchOffset.value += batch.total
  }
}
const reloadRatings = async () => {
  // Reset offset to 0 for initial load
  nextBatchOffset.value = 0
  await loadNextBatch()
}

onMounted(async () => {
  ratingLevels.value = await adminService.fetchRatingLevels()
  ratingLevels.value.sort((a, b) => {
    return a.severity - b.severity
  })
  await reloadRatings()
})

const activeRatingFilter = computed(() => {
  if (ratingFilter.value && ratingFilter.value !== 'any') {
    return [ratingFilter.value]
  } else {
    return []
  }
})

// Watch for filter changes and reload data
watch(activeRatingFilter, async () => {
  await reloadRatings()
})

// Action handlers
const confirmRating = async (id: number) => {
  const success = await adminService.confirmFluxRating(id, reviewDetails.note)
  console.log('confirmed: %o', success)
}

const adjustRating = async (id: number) => {
  if (!reviewDetails.adjustedRating) {
    alert('Did you forgot to choose a rating? Or would you rather confirm?')
    return
  }
  if (reviewDetails.adjustedRating === activeRating.value?.rating) {
    alert('Do you want to change the rating? If not, click to confirm instead.')
    return
  }
  const success = await adminService.adjustFluxRating(
    id,
    reviewDetails.adjustedRating,
    reviewDetails.note,
  )
  console.log('adjusted: %o', success)
}

// Clear violation of terms of use - must be generally blocked from view
const blockFlux = async (id: number) => {
  const success = await adminService.blockFlux(id)
  console.log('blocked: %o', success)
}

const deleteFlux = async (id: number) => {
  const success = await adminService.deleteFlux(id)
  console.log('deleted: %o', success)
}
</script>
