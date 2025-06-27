<template>
  <UContainer class="my-12">
    <div v-if="!storyline" class="mx-auto text-center">
      <h1>Choose a storyline</h1>
      <AdvStorylinePicker @picked-storyline="chooseStoryline" />
    </div>
    <div v-if="storyline">
      <AdvStorylineBuilder
        :storyline="storyline!"
        @updated="handleStorylineUpdate"
        @build-chapter="handleBuildChapter"
      />
    </div>
    <div v-if="activeChapter">
      <AdvChapterBuilder
        :chapter="activeChapter"
        :is-new="isNewChapter"
        @update-chapter="handleChapterUpdate"
        @build-scene="handleBuildScene"
      />
    </div>
    <div v-if="activeScene">
      <AdvSceneBuilder v-if="activeScene" :scene="activeScene" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { AdventureStoryline, Chapter, Scene } from '~/types/adventure-types'

const adventureStore = useAdvBldrStore()

definePageMeta({
  layout: 'adventure-builder',
})

const storyline: Ref<AdventureStoryline | null> = ref(null)
const activeChapter: Ref<Chapter | null> = ref(null)
const isNewChapter = ref(false)
const activeScene: Ref<Scene | null> = ref(null)

const showStoryline = computed(() => {
  return storyline && !activeScene.value
})

const chooseStoryline = () => {
  storyline.value = adventureStore.storyline
}

onMounted(() => {
  // during dev, jump to whatever I'm working on
  chooseStoryline()
})

function handleStorylineUpdate(updatedStoryline: AdventureStoryline) {
  storyline.value = updatedStoryline
}

function handleChapterUpdate(updatedChapter: Chapter) {
  if (updatedChapter.id === '') {
    updatedChapter.id = crypto.randomUUID()
  }

  const index = storyline.value?.chapters.findIndex((ch) => ch.id === updatedChapter.id)
  if (index !== undefined && index >= 0) {
    storyline.value!.chapters[index] = updatedChapter
  } else {
    storyline.value!.chapters.push(updatedChapter)
  }
  activeChapter.value = updatedChapter
}

function handleBuildChapter(chapterId: string | null) {
  if (!chapterId) {
    isNewChapter.value = true
    activeChapter.value = {
      id: '',
      title: 'New Chapter',
      scenes: [],
    }
    return
  } else if (chapterId === '.') {
    activeChapter.value = null
    return
  }

  const chapter = storyline.value?.chapters.find((ch) => ch.id === chapterId)
  if (chapter) {
    activeChapter.value = chapter
    activeScene.value = null // Reset active scene when a chapter is selected
    isNewChapter.value = false
  } else {
    console.warn(`Chapter with ID ${chapterId} not found in storyline.`)
  }
}

function handleBuildScene(scene: any) {
  activeScene.value = scene
}

function clearActiveScene() {
  activeScene.value = null
}
</script>

<style scoped>
.builder-layout {
  display: flex;
  height: 100vh;
}
.left-panel {
  width: 300px;
  border-right: 1px solid #eee;
  padding: 1rem;
}
.right-panel {
  flex: 1;
  padding: 2rem;
}
</style>
