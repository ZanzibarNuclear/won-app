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
              @click="reloadRatings"
              icon="i-ph-arrow-fat-right-duotone"
              variant="ghost"
              size="md"
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
            <div class="flex items-center">
              <UBadge
                :color="ratingColor(ratingInfo.rating)"
                size="sm"
                :label="ratingLabel(ratingInfo.rating)"
                class="mr-2"
              />
              <div class="text-sm">Rating reason: {{ ratingInfo.reason }}</div>
            </div>
            <div v-if="ratingInfo.blockedAt" class="text-xs text-gray-500">
              {{ formatDateTime(new Date(ratingInfo.blockedAt)) }}
            </div>
          </div>

          <div><UInput v-model="comment" placeholder="Optional comment" class="w-full" /></div>

          <div class="flex justify-between items-center my-2">
            <div class="flex space-x-2">
              <UButton
                @click="confirmRating(ratingInfo.id)"
                color="success"
                variant="soft"
                size="xs"
                icon="i-ph-thumbs-up-duotone"
                label="Confirm"
              />
              <UButtonGroup>
                <UButton
                  @click="adjustRating(ratingInfo.id)"
                  color="info"
                  variant="soft"
                  size="xs"
                  label="Adjust"
                />
                <select name="altRating" onchange="">
                  <option value="safe">G</option>
                  <option value="edgy">PG</option>
                  <option value="harsh">R</option>
                  <option value="violation">X</option>
                </select>
                <USelect
                  :default-value="ratingInfo.rating"
                  :items="adjustRatingOptions"
                  size="xs"
                  update:model-value="pickRating"
                />
              </UButtonGroup>
            </div>
            <div class="flex space-x-2">
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

          <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded my-6">
            <span v-html="ratingInfo.content" />
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
import type { FluxRating } from '~/types/won-types'

const adminService = useAdminService()

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

const adjustRatingOptions: SelectItem[] = [
  { label: 'G', value: 'safe' },
  { label: 'PG', value: 'edgy' },
  { label: 'R', value: 'harsh' },
  { label: 'X', value: 'violation' },
]

const batchSize = 2
const nextBatchOffset = ref(0)
const isMoreRatings = ref(true)
const activeRatings: Ref<FluxRating[]> = ref([])
const comment = ref('')

const ratingLabel = (key: string) => {
  const rating = ratingOptions.find((item) => item!.value === key)
  if (rating) {
    return rating.label
  } else {
    return '??'
  }
}

const ratingColor = (key: string): BadgeColor => {
  const rating = ratingOptions.find((item) => item!.value === key)
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
  await reloadRatings()
})

onMounted(async () => {
  await reloadRatings()
})

// formatDateTime is provided by auto-loaded utils
const pickRating = (event: any) => {
  console.log(event)
}

// Load flagged fluxes (initial load)
const reloadRatings = async () => {
  // Reset offset to 0 for initial load
  nextBatchOffset.value = 0
  isMoreRatings.value = true
  await loadMoreRatings()
}

// Load more ratings (append to existing)
const loadMoreRatings = async () => {
  if (!isMoreRatings.value) return

  const ratings = await adminService.fetchFluxRatings(
    batchSize,
    nextBatchOffset.value,
    activeRatingFilter.value,
  )

  if (ratings) {
    activeRatings.value = ratings.items
    isMoreRatings.value = ratings.hasMore
    nextBatchOffset.value += ratings.total
  }
}

// Action handlers
const confirmRating = async (id: number) => {
  console.log('Confirming flux rating:', id)
  const success = await adminService.confirmFluxRating(id)
}

const adjustRating = async (id: number) => {
  console.log('Adjusting flux rating:', id, 'to', bah.value)
  const success = await adminService.adjustFluxRating(id, bah.value)
}

// Clear violation of terms of use - must be generally blocked from view
const blockFlux = async (id: number) => {
  console.log('Blocking flux:', id)
  const success = await adminService.blockFlux(id)
}

const deleteFlux = async (id: number) => {
  console.log('Deleting flux:', id)
  const success = await adminService.deleteFlux(id)
}
</script>
