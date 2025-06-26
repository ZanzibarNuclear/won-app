<template>
  <UContainer>
    <AdvOldStorylineBuilder v-if="!activeScene" :storyline="storyline" />
    <AdvSceneBuilder v-else :scene="activeScene" />
  </UContainer>
</template>

<script setup lang="ts">
const adventureStore = useAdvBldrStore()

definePageMeta({
  layout: 'adventure-builder',
})

const storyline = ref(adventureStore.storyline)
const activeScene = ref(null)

function handleBuildScene(scene: any) {
  activeScene.value = scene
}
</script>

<style scoped></style>
