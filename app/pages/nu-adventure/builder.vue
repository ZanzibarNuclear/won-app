<template>
  <UContainer class="my-12">
    <div v-if="!storyline" class="mx-auto text-center">
      <h1>Choose a storyline</h1>
      <AdvStorylinePicker @picked-storyline="chooseStoryline" />
    </div>
    <div v-if="storyline">
      <AdvStorylineBuilder :storyline="storyline!" @updated="handleStorylineUpdate" />
      <AdvChapterBuilder
        :chapters="storyline!.chapters"
        @update-chapter="handleUpdateChapter"
        @build-scene="handleBuildScene"
      />
    </div>
    <!-- <div v-if="storyline">
      <AdvOldStorylineBuilder
        v-if="!activeChapter && !activeScene"
        :storyline="storyline!"
        @update-chapter="handleUpdateChapter"
        @build-scene="handleBuildScene"
      />
    </div> -->
    <div v-if="activeScene">
      <!-- <UButton class="mb-4" @click="clearActiveScene" icon="i-ph-arrow-left-bold">
        Back to Chapters
      </UButton> -->
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

function handleUpdateChapter(updatedChapter: Chapter) {
  const index = storyline.value?.chapters.findIndex((ch) => ch.id === updatedChapter.id)
  if (index !== undefined && index >= 0) {
    storyline.value!.chapters[index] = updatedChapter
  } else {
    storyline.value!.chapters.push(updatedChapter)
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
