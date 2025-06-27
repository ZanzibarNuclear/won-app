<template>
  <UContainer class="my-12">
    <AdvBuilderBreadcrumbTrail
      :storyline="storyline"
      :chapter="activeChapter"
      :scene="activeScene"
      @up-to-storyline="handleUpTo('storyline')"
      @up-to-chapter="handleUpTo('chapter')"
    />
    <div v-if="!storyline" class="mx-auto text-center">
      <h1>Choose a storyline</h1>
      <AdvStorylinePicker @picked-storyline="chooseStoryline" />
    </div>
    <div v-if="storyline && !activeChapter">
      <AdvStorylineBuilder
        :storyline="storyline!"
        @updated="handleStorylineUpdate"
        @build-chapter="handleBuildChapter"
      />
    </div>
    <div v-if="activeChapter && !activeScene">
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
import { normalizeStoryline } from '~/types/adventure-types'

const adventureStore = useAdvBldrStore()

definePageMeta({
  layout: 'adventure-builder',
})

const storyline: Ref<AdventureStoryline | null> = ref(null)
const activeChapter: Ref<Chapter | null> = ref(null)
const isNewChapter = ref(false)
const activeScene: Ref<Scene | null> = ref(null)

const chooseStoryline = () => {
  storyline.value = normalizeStoryline(adventureStore.storyline)
}

onMounted(() => {
  // during dev, jump to whatever I'm working on
  chooseStoryline()
})

function handleUpTo(level: 'storyline' | 'chapter') {
  if (level === 'storyline') {
    activeChapter.value = null
    activeScene.value = null
  } else if (level === 'chapter') {
    activeScene.value = null
  }
}

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
  activeScene.value = null
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
    isNewChapter.value = false
  } else {
    activeChapter.value = null
    alert('That is strange. The chapter you picked was not found.')
  }
}

function handleBuildScene(sceneId: string | null) {
  if (!sceneId) {
    activeScene.value = {
      id: crypto.randomUUID(),
      title: 'New Scene',
      contentBlocks: [],
    }
    activeChapter.value?.scenes.push(activeScene.value)
    return
  } else if (sceneId === '.') {
    activeScene.value = null
    return
  }

  const scene = activeChapter.value?.scenes.find((s) => s.id === sceneId)
  if (scene) {
    activeScene.value = scene
  } else {
    alert('That is strange. The scene you picked was not found.')
  }
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
