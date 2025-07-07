<template>
  <div>
    <!-- Storyline Title Bar (only in play mode) -->
    <div v-if="playMode && selectedStoryline" class="bg-gray-900 text-white text-xs py-1 px-4">
      {{ selectedStoryline.title }}
    </div>

    <!-- Main Header -->
    <div class="shadow dark:shadow-cooling-tower max-w-2xl mx-auto px-4 py-3 flex items-center min-h-[56px]">
      <template v-if="playMode && selectedChapter">
        <button v-if="previousSceneId" @click="goBack" class="mr-2 text-gray-500 hover:text-primary-500"
          aria-label="Back">
          <span class="i-heroicons-arrow-left-20-solid w-5 h-5" />
        </button>
        <h2 class="text-lg font-semibold">{{ selectedChapter.title }}</h2>
      </template>
      <template v-else-if="selectedStoryline">
        <h2 class="text-lg font-semibold">Pick a Chapter</h2>
      </template>
    </div>

    <!-- Main Content -->
    <main class="max-w-2xl mx-auto p-4">
      <!-- Chapter Selection -->
      <div v-if="!selectedChapter">
        <div class="flex justify-between items-center mb-4">
          <UButton color="primary" @click="selectChapter(chapters[0]!)">
            Start at the Beginning
          </UButton>
          <UButton color="neutral" variant="ghost" @click="resetStoryline">Back to Storylines</UButton>
        </div>
        <UCard v-for="chapter in chapters" :key="chapter._id" class="mb-4 cursor-pointer hover:shadow-lg"
          @click="selectChapter(chapter)">
          <div class="font-bold text-base">{{ chapter.title }}</div>
          <div class="text-sm text-gray-500">{{ chapter.description }}</div>
        </UCard>
      </div>

      <!-- Ending State -->
      <div v-else-if="showEnding" class="text-center">
        <h2 class="text-2xl font-bold text-primary-600 mb-4">The End</h2>
        <p class="text-lg text-gray-600 mb-8">Thanks for playing. Want to play again or try another?</p>
        <UButton @click="restartCurrentStoryline" color="neutral" variant="ghost">
          Play Again
        </UButton>
        <div class="mt-6">
          <UButton @click="resetToStorylines" color="primary" class="mb-4">
            Try Another Adventure
          </UButton>
        </div>
      </div>

      <!-- Play Mode -->
      <div v-else-if="playMode && currentScene">
        <!-- Scene Content Blocks -->
        <div v-for="block in currentScene.content" :key="block._id || block.label" class="mb-6">
          <AdvPlayerContentView :block="block" />
        </div>

        <!-- Transitions (Choices) -->
        <div v-if="currentScene.transitions && currentScene.transitions.length > 0" class="mt-8 flex flex-col gap-3">
          <div class="text-center text-xl ">What are you going to do?</div>
          <UButton v-for="transition in currentScene.transitions" :key="transition.toSceneId"
            @click="goToScene(transition.toSceneId)">
            {{ transition.prompt || transition.label }}
          </UButton>
        </div>
        <div v-else class="mt-8 text-center">
          <div class="text-lg font-semibold text-primary-600 mb-4">
            End of Chapter
          </div>
          <UButton @click="continueToNextChapter" color="primary">
            Continue
          </UButton>
        </div>
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
import type { Storyline, Chapter, Scene } from '~/types/adventure-types'

const api = useAdventureApi()

// Props
const props = defineProps<{
  storyline: Storyline
}>()

// Emits
const emit = defineEmits<{
  backToSelector: []
}>()

const selectedStoryline = ref<Storyline | null>(null)
const chapters = ref<Chapter[]>([])
const selectedChapter = ref<Chapter | null>(null)
const playMode = ref(false)

const currentScene = ref<Scene | null>(null)
const previousSceneId = ref<string | null>(null)
const sceneHistory = ref<string[]>([])
const showEnding = ref(false)

// Initialize with the provided storyline
onMounted(() => {
  selectedStoryline.value = props.storyline
  chapters.value = props.storyline.chapters || []
})

async function selectChapter(chapter: Chapter) {
  selectedChapter.value = chapter
  playMode.value = true
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

function resetStoryline() {
  emit('backToSelector')
}

async function loadScene(sceneId: string) {
  if (currentScene.value && currentScene.value._id) {
    previousSceneId.value = currentScene.value._id
    sceneHistory.value.push(currentScene.value._id)
  }
  const scene = await api.fetchScene(sceneId)
  if (scene) {
    currentScene.value = scene
  }
}

function goToScene(sceneId: string) {
  loadScene(sceneId)
}

function goBack() {
  if (sceneHistory.value.length > 0) {
    const prevId = sceneHistory.value.pop() ?? null
    if (prevId) {
      previousSceneId.value = sceneHistory.value.length > 0 ? sceneHistory.value[sceneHistory.value.length - 1] ?? null : null
      loadScene(prevId)
    }
  }
}

async function continueToNextChapter() {
  if (!selectedStoryline.value || !selectedChapter.value) return

  const currentChapterIndex = selectedStoryline.value.chapters.findIndex(ch => ch._id === selectedChapter.value?._id)
  const nextChapter = selectedStoryline.value.chapters[currentChapterIndex + 1]

  if (nextChapter) {
    // Continue to next chapter
    await selectChapter(nextChapter)
  } else {
    // Show ending
    showEnding.value = true
    playMode.value = false
  }
}

function resetToStorylines() {
  emit('backToSelector')
}

function restartCurrentStoryline() {
  if (!selectedStoryline.value) return

  showEnding.value = false
  selectedChapter.value = null
  playMode.value = false
  currentScene.value = null
  previousSceneId.value = null
  sceneHistory.value = []
}
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>