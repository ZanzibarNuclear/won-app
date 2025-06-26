<template>
  <UContainer class="my-12">
    <div v-if="!storyline" class="mx-auto text-center">
      <h1>Choose a storyline</h1>
      <AdvStorylinePicker @picked-storyline="chooseStoryline" />
    </div>
    <AdvStorylineBuilder
      v-if="storyline && pageState.showStoryline"
      :storyline="storyline"
      @updated="handleStorylineUpdated"
    />
    <AdvChapterBuilder
      v-if="storyline"
      :chapters="storyline.chapters"
      :is-edit="pageState.chapterEdit"
    />
    <AdvSceneBuilder v-if="pageState.scene" :scene="pageState.scene" />
  </UContainer>
</template>

<script setup lang="ts">
import type { AdventureStoryline, Chapter, Scene } from '~/types/adventure-types'

const adventureStore = useAdvBldrStore()

definePageMeta({
  layout: 'adventure-builder',
})

const storyline: Ref<AdventureStoryline | null> = ref(null)
const activeScene = ref(null)

const pageState = reactive({
  showStoryline: !!storyline.value,
  chapter: null as Chapter | null,
  chapterEdit: false,
  scene: null as Scene | null,
  sceneEdit: false,
})

const chooseStoryline = () => {
  storyline.value = adventureStore.storyline
  pageState.showStoryline = true
}

onMounted(() => {
  // during dev, jump to whatever I'm working on
  chooseStoryline()
})

function handleStorylineUpdated(updatedStoryline: AdventureStoryline) {
  storyline.value = updatedStoryline
}

function handleSelectChapter(chapterId: string) {
  const chapter = storyline.value?.chapters.find((ch) => ch.id === chapterId)
  if (chapter) {
    pageState.chapter = chapter
    pageState.chapterEdit = true
  }
}

function handleBuildScene(scene: any) {
  activeScene.value = scene
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
