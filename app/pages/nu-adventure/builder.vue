<template>
  <UContainer>
    <AdvStorylineBuilder v-if="!activeScene" :storyline="storyline" />
    <AdvBuilderScenes v-else :scene="activeScene" />
  </UContainer>
</template>

<script setup lang="ts">
import sample from './sample-storyline.js'

definePageMeta({
  layout: 'adventure-builder',
})

const storyline = ref(sample)
const activeScene = ref(null)

function handleBuildScene(scene: any) {
  activeScene.value = scene
}
</script>

<style scoped></style>
