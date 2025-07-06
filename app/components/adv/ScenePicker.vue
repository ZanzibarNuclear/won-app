<template>
  <AdvGenericPicker :items="scenes" placeholder="Select a scene" @chosen="(id: string) => $emit('chosen', id)" />
</template>

<script setup lang="ts">
import type { Scene } from '~/types/adventure-types'

defineProps<{
  scenes: Array<Scene>
}>()

defineEmits<{
  (e: 'chosen', id: string): void
}>()
</script>
