<template>
  <div>
    <p v-if="!storylines">Loading...</p>
    <div v-if="storylines" class="flex items-center gap-2">
      <AdvBuilderPicker :items="storylines" label="Storyline" placeholder="Pick a storyline" select-class="w-48 mr-2"
        :show-button="false" :show-label="true" @chosen="(id: string) => $emit('pickedStoryline', id)" />
      <UButton @click="$emit('createStoryline')" icon="i-ph-plus-square-duotone" size="sm" variant="subtle"
        label="Create storyline" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StorylineSummary } from '~/types/adventure-types'

defineProps<{
  storylines?: StorylineSummary[]
}>()

defineEmits(['pickedStoryline', 'createStoryline'])
</script>

<style scoped></style>
