<template>
  <div>
    <!-- Main Header -->
    <div class="shadow dark:shadow-cooling-tower max-w-2xl mx-auto px-4 py-3 flex items-center min-h-[56px]">
      <UPageHeader title="Adventures in Nuclear"
        description="Choose one of these adventures, and explore the world of possibility." headline="Adventure" />
    </div>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto p-4">
      <!-- Storyline Selection -->
      <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UCard v-for="storyline in storylines" :key="storyline._id"
          class="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
          @click="selectStoryline(storyline)">
          <!-- Cover Art -->
          <div v-if="storyline.coverArt" class="relative overflow-hidden">
            <NuxtImg :src="storyline.coverArt" width="400" height="250"
              class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
            <!-- Gradient overlay for better text readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          <!-- Title and Description -->
          <div class="p-6">
            <h3 class="font-bold text-2xl text-center mb-3 text-gray-900 dark:text-white">
              {{ storyline.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 text-center leading-relaxed">
              {{ storyline.description }}
            </p>

            <!-- Play button -->
            <div class="mt-6 text-center">
              <UButton color="primary" size="lg" class="w-full" @click.stop="selectStoryline(storyline)">
                <span class="i-heroicons-play-20-solid mr-2"></span>
                Play Adventure
              </UButton>
            </div>
          </div>
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