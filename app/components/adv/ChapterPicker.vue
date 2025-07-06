<template>
  <AdvGenericPicker :items="chapters" placeholder="Select a chapter" @chosen="(id: string) => $emit('chosen', id)" />
</template>

<script setup lang="ts">
import type { Chapter } from '~/types/adventure-types'

defineProps<{
  chapters: Array<Chapter>
}>()

defineEmits<{
  (e: 'chosen', id: string): void
}>()
</script>
