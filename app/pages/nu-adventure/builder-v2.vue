<template>
  <UContainer>
    <div v-if="focus === 'start'" class="mx-auto text-center">
      <h1>Choose a storyline</h1>
      <AdvStorylinePicker @picked-storyline="chooseStoryline" />
    </div>
    <AdvStorylineBuilder v-if="focus === 'storyline'" :storyline="storyline" />
    <AdvSceneBuilder v-if="focus === 'scene'" :scene="activeScene" />
  </UContainer>
</template>

<script setup lang="ts">
import type { AdventureStoryline } from '~/types/adventure-types'

const adventureStore = useAdvBldrStore()

definePageMeta({
  layout: 'adventure-builder',
})

const storyline: Ref<AdventureStoryline | null> = ref(null)
const activeScene = ref(null)

const chooseStoryline = () => {
  storyline.value = adventureStore.storyline
}

const focus = computed(() => {
  if (!storyline.value) return 'start'
  return activeScene.value ? 'scene' : 'storyline'
})

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
