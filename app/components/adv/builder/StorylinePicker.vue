<template>
  <div>
    <p v-if="!storylines">Loading...</p>
    <AdvBuilderPicker v-if="storylines" :items="storylines" label="Storyline" placeholder="Pick a storyline"
      select-class="w-48 mr-2" :show-button="false" :show-label="true"
      @chosen="(id: string) => $emit('pickedStoryline', id)" />
  </div>
</template>

<script setup lang="ts">
import type { StorylineSummary } from '~/types/adventure-types'

defineProps<{
  storylines?: StorylineSummary[]
}>()

defineEmits(['pickedStoryline'])
</script>

<style scoped></style>
