<template>
  <UContainer>
    <AdvPlayerGameSelector v-if="!selectedStoryline" @storyline-selected="handleStorylineSelected" />
    <AdvPlayerStorylineViewer v-else :storyline="selectedStoryline" @back-to-selector="handleBackToSelector" />
  </UContainer>
</template>

<script setup lang="ts">
import type { Storyline } from '~/types/adventure-types'

definePageMeta({
  layout: 'adventure',
})

const selectedStoryline = ref<Storyline | null>(null)

async function handleStorylineSelected(storylineSummary: any) {
  // Fetch the full storyline data
  const api = useAdventureApi()
  const storyline = await api.fetchStoryline(storylineSummary._id)
  if (storyline) {
    selectedStoryline.value = storyline
  }
}

function handleBackToSelector() {
  selectedStoryline.value = null
}
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
