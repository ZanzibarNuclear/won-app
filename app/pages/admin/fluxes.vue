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
                icon="i-ph-thumbs-up-duotone"
                label="Confirm"
              />
              <UButtonGroup>
                <UButton color="info" variant="soft" size="xs" label="Adjust" />
                <UDropdownMenu :items="adjustRatingOptions">
                  <UButton variant="ghost" color="info" icon="i-ph-arrow-down" />
                </UDropdownMenu>
              </UButtonGroup>
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
import type { DropdownMenuItem, SelectItem } from '@nuxt/ui'
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

const adjustRatingOptions: DropdownMenuItem[] = [
  { label: 'G', value: 'safe' },
  { label: 'PG', value: 'edgy' },
  { label: 'R', value: 'harsh' },
  { label: 'X', value: 'violation' },
]

const batchSize = 10
const nextBatchOffset = ref(0)
const isMoreRatings = ref(true)
const activeRatings: Ref<FluxRating[]> = ref([])

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
  await reloadRatings()
})

onMounted(async () => {
  await reloadRatings()
})

// formatDateTime is provided by auto-loaded utils

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

const adjustRating = async (id: number, ratingValue: string) => {
  console.log('Adjusting flux rating:', id, 'to', ratingValue)
  const success = await adminService.adjustFluxRating(id, ratingValue)
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
