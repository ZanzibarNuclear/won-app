<template>
  <div>
    <UButton @click="emit('pickedStoryline')"> Pick Storyline </UButton>
  </div>
</template>

<script setup lang="ts">
import type { AdventureStoryline } from '~/types/adventure-types'

const props = defineProps<{
  adventures?: AdventureStoryline[]
}>()
const emit = defineEmits(['pickedStoryline'])

function pickStoryline() {
  emit('pickedStoryline')
}
</script>

<style scoped></style>
