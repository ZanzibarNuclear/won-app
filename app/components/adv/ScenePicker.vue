<template>
  <USelect
    :items="sceneOptions"
    v-model="selected"
    size="sm"
    placeholder="Select a scene"
    @update:model-value="onChoose"
  />
</template>

<script setup lang="ts">
import type { Scene } from '~/types/adventure-types'

const props = defineProps<{
  scenes: Array<Scene>
}>()

const emit = defineEmits<{
  (e: 'chosen', id: string): void
}>()

const selected = ref('.')

const sceneOptions = computed(() => {
  const options = props.scenes.map((scene) => ({
    value: scene._id,
    label: scene.title,
  }))
  const items = [{ value: '.', label: '--Choose a scene--' }, ...options]
  return items
})

function onChoose(val: string) {
  emit('chosen', val)
}
</script>
<style scoped></style>
