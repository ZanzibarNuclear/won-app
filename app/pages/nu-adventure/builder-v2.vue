<template>
  <UContainer class="my-12">
    <div v-if="!storyline" class="mx-auto text-center">
      <h1>Choose a storyline</h1>
      <AdvStorylinePicker @picked-storyline="chooseStoryline" />
    </div>
    <div v-if="storyline && pageState.showStoryline" class="mx-auto w-3/4">
      <AdvStorylineForm
        v-if="pageState.storylineEdit"
        :storyline="storyline"
        :is-new="false"
        @submit="handleUpdateStoryline"
        @cancel="pageState.storylineEdit = false"
      />
      <div v-else>
        <NuxtImg v-if="storyline.coverArt" :src="storyline.coverArt" width="250" />
        <h3>{{ storyline?.title }}</h3>
        <div>{{ storyline?.description }}</div>
        <UButton @click="pageState.storylineEdit = true" class="mt-4"> Edit Storyline </UButton>
      </div>
    </div>
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

const pageState = reactive({
  showStoryline: !!storyline.value,
  storylineEdit: false,
  chapter: null,
  chapterEdit: false,
  scene: null,
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

function handleUpdateStoryline(updatedStoryline: AdventureStoryline) {
  // send to service

  // refresh copy in store
  storyline.value = updatedStoryline
  pageState.storylineEdit = false
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
