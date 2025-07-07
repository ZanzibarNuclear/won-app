<template>
  <div>
    <!-- Main Header -->
    <div class="shadow dark:shadow-cooling-tower max-w-2xl mx-auto px-4 py-3 flex items-center min-h-[56px]">
      <UPageHeader title="Adventures in Nuclear"
        description="Choose one of these adventures, and explore the world of possibility." headline="Adventure" />
    </div>

    <!-- Main Content -->
    <main class="max-w-2xl mx-auto p-4">
      <!-- Storyline Selection -->
      <div v-if="!loading">
        <UCard v-for="storyline in storylines" :key="storyline._id" class="mb-4 cursor-pointer hover:shadow-lg"
          @click="selectStoryline(storyline)">
          <template #header>
            <NuxtImg v-if="storyline.coverArt" :src="storyline.coverArt" width="300" class="mx-auto" />
          </template>
          <div class="font-bold text-2xl text-center">{{ storyline.title }}</div>
          <div class="text-sm dark:text-cooling-tower-dark text-cooling-tower mt-4">{{ storyline.description }}</div>
        </UCard>
      </div>

      <!-- Loading State -->
      <div v-else class="flex justify-center items-center min-h-[200px]">
        <span class="i-heroicons-arrow-path-20-solid animate-spin w-6 h-6 text-primary-500" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAdventureApi } from '~/composables/useAdventureApi'
import type { StorylineSummary } from '~/types/adventure-types'

const api = useAdventureApi()

const storylines = ref<StorylineSummary[]>([])
const loading = ref(true)
const showedInterest = ref(false)

// Emit the selected storyline to parent
const emit = defineEmits<{
  storylineSelected: [storyline: StorylineSummary]
}>()

// Fetch all storylines on mount
onMounted(async () => {
  if (!showedInterest.value) {
    useWonTracking().logInterest('adventure-player')
    showedInterest.value = true
  }

  try {
    const fetchedStorylines = await api.fetchStorylines()
    storylines.value = (fetchedStorylines || []).filter(storyline => storyline.publishedAt)
  } catch (error) {
    console.error('Failed to fetch storylines:', error)
  } finally {
    loading.value = false
  }
})

function selectStoryline(storyline: StorylineSummary) {
  emit('storylineSelected', storyline)
}
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>