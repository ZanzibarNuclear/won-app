<template>
  <USelect
    :items="chapterOptions"
    v-model="selected"
    placeholder="Select a chapter"
    @update:model-value="onChoose"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  chapters: Array<{ id: string; title: string }>
}>()

const emit = defineEmits<{
  (e: 'chosen', id: string): void
}>()

const selected = ref('.')

const chapterOptions = computed(() => {
  const items = [{ value: '.', label: '--Choose a chapter--' }]
  const options = props.chapters.map((ch) => ({
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
