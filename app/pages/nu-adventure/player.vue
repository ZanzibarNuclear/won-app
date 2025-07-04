<template>
  <UContainer>
    <!-- Storyline Title Bar (only in play mode) -->
    <div v-if="playMode && selectedStoryline" class="bg-gray-900 text-white text-xs py-1 px-4">
      {{ selectedStoryline.title }}
    </div>

    <!-- Main Header -->
    <div class="shadow px-4 py-3 flex items-center min-h-[56px]">
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
      <template v-else>
        <UPageHeader title="Adventures in Nuclear"
          description="Choose one of these adventures, and explore the world of possibility." headline="Adventure" />
      </template>
    </div>

    <!-- Main Content -->
    <main class="max-w-2xl mx-auto p-4">
      <!-- Storyline Selection -->
      <div v-if="!selectedStoryline">
        <UCard v-for="storyline in storylines" :key="storyline._id" class="mb-4 cursor-pointer hover:shadow-lg"
          @click="selectStoryline(storyline)">
          <div class="font-bold text-base">{{ storyline.title }}</div>
          <div class="text-sm text-gray-500">{{ storyline.description }}</div>
        </UCard>
      </div>

      <!-- Chapter Selection -->
      <div v-else-if="!selectedChapter">
        <UCard v-for="chapter in chapters" :key="chapter._id" class="mb-4 cursor-pointer hover:shadow-lg"
          @click="selectChapter(chapter)">
          <div class="font-bold text-base">{{ chapter.title }}</div>
          <div class="text-sm text-gray-500">{{ chapter.description }}</div>
        </UCard>
        <UButton class="mt-6" color="neutral" variant="ghost" @click="resetStoryline">Back to Storylines</UButton>
      </div>

      <!-- Play Mode -->
      <div v-else-if="playMode && currentScene">
        <!-- Scene Content Blocks -->
        <div v-for="block in currentScene.content" :key="block._id || block.label" class="mb-6">
          <component :is="getBlockComponent(block)" :block="block" />
        </div>

        <!-- Transitions (Choices) -->
        <div v-if="currentScene.transitions && currentScene.transitions.length > 0" class="mt-8 flex flex-col gap-3">
          <UButton v-for="transition in currentScene.transitions" :key="transition.toSceneId"
            @click="goToScene(transition.toSceneId)">
            {{ transition.prompt || transition.label }}
          </UButton>
        </div>
        <div v-else class="mt-8 text-center text-lg font-semibold text-primary-600">
          End of Chapter
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="flex justify-center items-center min-h-[200px]">
        <span class="i-heroicons-arrow-path-20-solid animate-spin w-6 h-6 text-primary-500" />
      </div>
    </main>
  </UContainer>
</template>

<script setup lang="ts">
import { useAdventureApi } from '~/composables/useAdventureApi'
import type { StorylineSummary, Storyline, Chapter, Scene, ContentBlock } from '~/types/adventure-types'

const api = useAdventureApi()

const storylines = ref<StorylineSummary[]>([])
const selectedStoryline = ref<Storyline | null>(null)
const chapters = ref<Chapter[]>([])
const selectedChapter = ref<Chapter | null>(null)
const playMode = ref(false)
const showedInterest = ref(false)

const currentScene = ref<Scene | null>(null)
const previousSceneId = ref<string | null>(null)
const sceneHistory = ref<string[]>([])

// Fetch all storylines on mount
onMounted(async () => {
  if (!showedInterest.value) {
    useWonTracking().logInterest('adventure-player')
    showedInterest.value = true
  }
  storylines.value = await api.fetchStorylines() || []
})

async function selectStoryline(storylineSummary: StorylineSummary) {
  // Fetch full storyline (with chapters)
  const storyline = await api.fetchStoryline(storylineSummary._id)
  if (storyline) {
    selectedStoryline.value = storyline
    chapters.value = storyline.chapters || []
    selectedChapter.value = null
    playMode.value = false
  }
}

function resetStoryline() {
  selectedStoryline.value = null
  chapters.value = []
  selectedChapter.value = null
  playMode.value = false
  currentScene.value = null
  previousSceneId.value = null
  sceneHistory.value = []
}

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

function getBlockComponent(block: ContentBlock) {
  switch (block.type) {
    case 'passage':
      return PassageBlock
    case 'image':
      return ImageBlock
    case 'video':
      return VideoBlock
    default:
      return PassageBlock
  }
}

const PassageBlock = defineComponent({
  props: { block: { type: Object, required: true } },
  setup(props) {
    return () =>
      h('div', { class: 'prose prose-sm max-w-none' }, [
        h('div', { innerHTML: props.block.html })
      ])
  }
})

const ImageBlock = defineComponent({
  props: { block: { type: Object, required: true } },
  setup(props) {
    return () =>
      h('figure', { class: 'my-4' }, [
        h('img', { src: props.block.imageSrc, alt: props.block.label, class: 'rounded shadow' }),
        props.block.caption ? h('figcaption', { class: 'text-xs text-gray-500 mt-2' }, props.block.caption) : null
      ])
  }
})

const VideoBlock = defineComponent({
  props: { block: { type: Object, required: true } },
  setup(props) {
    return () =>
      h('div', { class: 'my-4' }, [
        h('iframe', {
          src: props.block.url,
          class: 'w-full aspect-video rounded shadow',
          allowfullscreen: true
        })
      ])
  }
})
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
