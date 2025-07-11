<template>
  <div>
    <!-- Main content area -->
    <div class="p-6">
      <!-- Storyline Selection -->
      <div v-if="!gameState.currentStoryline.value" class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold mb-4">Adventures in Nuclear</h1>
          <p class="text-lg text-gray-600 dark:text-gray-300">Choose an adventure and explore the world of possibility.
          </p>
        </div>

        <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard v-for="storyline in storylines" :key="storyline._id"
            class="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
            @click="selectStoryline(storyline)">
            <!-- Cover Art -->
            <div v-if="storyline.coverArt" class="relative overflow-hidden">
              <NuxtImg :src="storyline.coverArt" width="400" height="250"
                class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
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
      </div>

      <!-- Storyline Overview -->
      <div v-else-if="gameState.currentStoryline.value && !gameState.currentChapter.value" class="max-w-4xl mx-auto">
        <div class="bg-white dark:bg-cooling-tower rounded-lg shadow-lg overflow-hidden">
          <!-- Cover Art and Info -->
          <div class="md:flex">
            <div v-if="gameState.currentStoryline.value.coverArt" class="md:w-1/3">
              <NuxtImg :src="gameState.currentStoryline.value.coverArt" width="400" height="300"
                class="w-full h-64 md:h-full object-cover" />
            </div>
            <div class="md:w-2/3 p-6">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {{ gameState.currentStoryline.value.title }}
              </h1>
              <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {{ gameState.currentStoryline.value.description }}
              </p>

              <!-- Begin Button -->
              <div class="flex flex-col sm:flex-row gap-4">
                <UButton color="primary" size="lg"
                  @click="selectChapter(gameState.currentStoryline.value!.chapters[0]!)" class="flex-1">
                  <span class="i-heroicons-play-20-solid mr-2"></span>
                  Begin Adventure
                </UButton>
                <UButton color="neutral" variant="ghost" @click="resetStoryline" class="flex-1">
                  <span class="i-heroicons-arrow-left-20-solid mr-2"></span>
                  Back to Storylines
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Chapter Selection -->
        <div class="mt-8">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Or choose a specific chapter:</h2>
          <div class="grid gap-4">
            <UCard v-for="(chapter, index) in gameState.currentStoryline.value.chapters" :key="chapter._id"
              class="cursor-pointer hover:shadow-lg transition-shadow" @click="selectChapter(chapter)">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-4">
                    <span class="text-sm font-semibold text-primary-600 dark:text-primary-400">{{ index + 1 }}</span>
                  </div>
                  <div>
                    <div class="font-bold text-base">{{ chapter.title }}</div>
                    <div class="text-sm text-gray-500">{{ chapter.description }}</div>
                  </div>
                </div>
                <span class="i-heroicons-arrow-right-20-solid text-gray-400"></span>
              </div>
            </UCard>
          </div>
        </div>
      </div>

      <!-- Game Scene -->
      <div v-else-if="gameState.currentChapter.value && gameState.currentScene.value" class="max-w-4xl mx-auto">
        <!-- Scene Header -->
        <div class="flex items-center mb-6">
          <button v-if="canGoBack" @click="goBack" class="mr-3 text-gray-500 hover:text-primary-500" aria-label="Back">
            <span class="i-heroicons-arrow-left-20-solid w-6 h-6" />
          </button>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ gameState.currentChapter.value.title }}
          </h2>
        </div>

        <!-- Scene Content -->
        <div class="bg-white dark:bg-cooling-tower rounded-lg shadow-lg p-6">
          <!-- Scene Content Blocks -->
          <div v-for="block in gameState.currentScene.value.content" :key="block._id || block.label" class="mb-6">
            <AdvPlayerContentView :block="block" />
          </div>

          <!-- Transitions (Choices) -->
          <div v-if="gameState.currentScene.value.transitions && gameState.currentScene.value.transitions.length > 0"
            class="mt-8">
            <div class="text-center text-xl font-semibold text-gray-900 dark:text-white mb-4">What are you going to do?
            </div>
            <div class="flex flex-col gap-3">
              <UButton v-for="transition in gameState.currentScene.value.transitions" :key="transition.toSceneId"
                @click="goToScene(transition.toSceneId)" class="w-full">
                {{ transition.prompt || transition.label }}
              </UButton>
            </div>
          </div>

          <!-- End of Chapter -->
          <div v-else class="mt-8 text-center">
            <div class="text-lg font-semibold text-primary-600 mb-4">End of Chapter</div>
            <UButton @click="continueToNextChapter" color="primary" class="w-full">
              Continue
            </UButton>
          </div>
        </div>
      </div>

      <!-- Ending State -->
      <div v-else-if="showEnding" class="max-w-2xl mx-auto text-center">
        <h2 class="text-2xl font-bold text-primary-600 mb-4">The End</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">Thanks for playing. Want to play again or try another?
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <UButton @click="restartCurrentStoryline" color="neutral" variant="ghost">
            Play Again
          </UButton>
          <UButton @click="resetStoryline" color="primary">
            Try Another Adventure
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdventureApi } from '~/composables/useAdventureApi'
import type { StorylineSummary } from '~/types/adventure-types'

definePageMeta({
  layout: 'adventure',
})

const api = useAdventureApi()
const gameState = useAdventureGameState()

// Local state for storyline selection
const storylines = ref<StorylineSummary[]>([])
const loading = ref(true)
const showEnding = ref(false)

// Computed
const canGoBack = computed(() => gameState.sceneHistory.value.length > 0)

// Fetch storylines on mount
onMounted(async () => {
  try {
    const fetchedStorylines = await api.fetchStorylines()
    storylines.value = (fetchedStorylines || []).filter(storyline => storyline.publishedAt)
  } catch (error) {
    console.error('Failed to fetch storylines:', error)
  } finally {
    loading.value = false
  }
})

// Methods
async function selectStoryline(storylineSummary: StorylineSummary) {
  const storyline = await api.fetchStoryline(storylineSummary._id)
  if (storyline) {
    gameState.setStoryline(storyline)
  }
}

function resetStoryline() {
  gameState.reset()
  showEnding.value = false
}

async function selectChapter(chapter: any) {
  gameState.setChapter(chapter)
  // Load opening scene
  if (chapter.openingSceneId) {
    await loadScene(chapter.openingSceneId)
  } else if (chapter.scenes && chapter.scenes.length > 0) {
    const firstSceneId = chapter.scenes[0]?._id
    if (typeof firstSceneId === 'string') {
      await loadScene(firstSceneId)
    }
  }
}

async function loadScene(sceneId: string) {
  const scene = await api.fetchScene(sceneId)
  if (scene) {
    gameState.setScene(scene)
  }
}

function goToScene(sceneId: string) {
  loadScene(sceneId)
}

function goBack() {
  const prevId = gameState.goBack()
  if (prevId) {
    loadScene(prevId)
  }
}

async function continueToNextChapter() {
  if (!gameState.currentStoryline.value || !gameState.currentChapter.value) return

  const currentChapterIndex = gameState.currentStoryline.value.chapters.findIndex(ch => ch._id === gameState.currentChapter.value?._id)
  const nextChapter = gameState.currentStoryline.value.chapters[currentChapterIndex + 1]

  if (nextChapter) {
    await selectChapter(nextChapter)
  } else {
    showEnding.value = true
  }
}

function restartCurrentStoryline() {
  if (!gameState.currentStoryline.value) return
  showEnding.value = false
  gameState.reset()
}
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
