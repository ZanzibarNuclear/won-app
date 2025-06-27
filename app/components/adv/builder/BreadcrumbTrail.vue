<template>
  <div v-if="chapter" class="border-2 mb-8 p-4 rounded-lg">
    <UButton @click="$emit('up-to-storyline')" variant="ghost"
      >Storyline: {{ storyline!.title }}</UButton
    >
    <span v-if="scene"> / </span>
    <UButton v-if="scene" @click="$emit('up-to-chapter')" variant="ghost"
      >Chapter: {{ chapter!.title }}</UButton
    >
  </div>
</template>

<script setup lang="ts">
import type { AdventureStoryline, Chapter, Scene } from '~/types/adventure-types'

const props = defineProps<{
  storyline?: AdventureStoryline | null
  chapter?: Chapter | null
  scene?: Scene | null
}>()
const emit = defineEmits(['up-to-storyline', 'up-to-chapter'])
</script>

<style scoped></style>
