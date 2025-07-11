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
      <h1 class="flex-grow text-2xl font-bold">Flux Administration</h1>
      <UButtonGroup class="gap-x-1">
        <UButton label="Review Ratings" :disabled="isShowingRatings" @click="toggleMode" />
        <UButton label="Review Flags" :disabled="isShowingFlags" @click="toggleMode" />
      </UButtonGroup>
    </div>

    <FlagReviewPanel v-if="isShowingFlags" />

    <UCard v-if="isShowingRatings" class="mb-8">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Flux Rating Review</h2>
          <div class="flex space-x-2">
            <USwitch v-model="onlyNeedsReviewFilter" label="Needs Review" size="xs" />
            <USelect
              v-model="ratingFilter"
              :items="ratingOpts"
              placeholder="Filter by"
              size="xs"
              class="w-40"
            />
            <UButton
              @click="reloadRatings"
              icon="i-ph-arrow-fat-right-duotone"
              variant="ghost"
              size="xs"
            />
          </div>
        </div>
      </template>

      <div v-if="ratings">
        <div v-for="rating in ratings.items" :key="rating.id" class="border-b last:border-0 py-4">
          <div class="flex justify-between mb-2" @click="selectRating(rating)">
            <div class="text-sm flex items-center">
              <div class="mr-4">Flux: {{ rating.fluxId }}</div>
              <UBadge
                :color="ratingColor(rating.rating)"
                size="sm"
                :label="ratingDisplay(rating.rating)"
                class="mr-2"
              />
            </div>
            <div class="text-sm">
              {{
                !rating.reviewedAt
                  ? 'Needs review'
                  : 'Reviewed at ' + formatDateTime(new Date(rating.reviewedAt))
              }}
            </div>
            <div v-if="rating.createdAt" class="text-xs text-gray-500">
              {{ formatDateTime(new Date(rating.createdAt)) }}
            </div>
          </div>
        </div>
        <div v-if="activeRating" class="mt-12">
          <h2 class="text-cherenkov">Regarding Flux {{ activeRating.fluxId }}</h2>
          <div class="flex items-center my-6">
            <UBadge
              :color="ratingColor(activeRating.rating)"
              size="sm"
              :label="ratingDisplay(activeRating.rating)"
              class="mr-2"
            />
            <div class="text-sm">Rating reason: {{ activeRating.reason }}</div>
          </div>
          <div>
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
                  <USelect v-model="reviewDetails.adjustedRating" :items="ratingOpts" size="xs" />
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
          <FluxSimpleView v-if="flux" :flux="flux" />
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
import type { FluxRating, FluxRatingLevel, FluxRatingBatch, Flux } from '~/types/won-types'

const adminService = useAdminService()

const mode = ref('ratings')
const toggleMode = () => {
  mode.value = mode.value === 'ratings' ? 'flags' : 'ratings'
}
const isShowingRatings = computed(() => mode.value === 'ratings')
const isShowingFlags = computed(() => mode.value === 'flags')

const onlyNeedsReviewFilter = ref(true)
const ratingFilter = ref(null)
const ratingLevels: Ref<FluxRatingLevel[]> = ref([])
const ratingOpts = computed((): SelectItem[] => {
  const items = ratingLevels.value.map((level) => ({ label: level.display, value: level.code }))
  return [{ label: '-- all --', value: 'all' }, ...items]
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
  flux.value = null
}
const selectRating = (rating: FluxRating) => {
  activeRating.value = rating
  clearReviewDetails()
  handleOpenFlux()
}

const flux: Ref<Flux | null> = ref(null)
const handleOpenFlux = async () => {
  console.log('opening flux %d', activeRating.value?.fluxId)
  if (activeRating.value) {
    const result = await useFluxService().getFlux(activeRating.value?.fluxId)
    console.log('flux result %o', result)
    flux.value = result
  } else {
    alert(
      'Somehow you have not selected a rating for review, so we do not know which flux to load.',
    )
  }
}

const loadNextBatch = async () => {
  activeRating.value = null
  clearReviewDetails()
  const batch = await adminService.fetchFluxRatings(batchSize, nextBatchOffset.value, {
    rating: ratingFilter.value,
    needsReview: onlyNeedsReviewFilter.value,
  })
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

// Watch for filter changes and reload data
watch(ratingFilter, async () => {
  await reloadRatings()
})

watch(onlyNeedsReviewFilter, async () => {
  await reloadRatings()
})

const replaceRating = (updatedRating: FluxRating) => {
  const index = ratings.value.items.findIndex((rating) => rating.id === updatedRating.id)
  ratings.value.items[index] = updatedRating
}

// Action handlers
const confirmRating = async (id: number) => {
  const success = await adminService.confirmFluxRating(id, reviewDetails.note)
  console.log('confirmed: %o', success)
  replaceRating(success.data)
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
  replaceRating(success.data)
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
