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
import { computed, ref } from 'vue'

const props = defineProps<{
  scenes: Array<{ id: string; title: string }>
}>()

const emit = defineEmits<{
  (e: 'chosen', id: string): void
}>()

const selected = ref('.')

const sceneOptions = computed(() => {
  const items = [{ value: '.', label: '--Choose a scene--' }]
  const options = props.scenes.map((ch) => ({
    value: ch.id,
    label: ch.title,
  }))
  return items.concat(options)
})

function onChoose(val: string) {
  if (val === '.') {
    return
  }
  emit('chosen', val)
}
</script>
<style scoped></style>
