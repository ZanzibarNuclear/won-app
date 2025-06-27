<template>
  <USelect
    :items="chapterOptions"
    v-model="selected"
    size="sm"
    placeholder="Select a chapter"
    @update:model-value="onChoose"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  chapters: Array<{ id: string; title: string }>
}>()

const emit = defineEmits<{
  (e: 'chosen', id: string): void
}>()

const selected = ref('.')

const chapterOptions = computed(() => {
  const options = props.chapters.map((ch) => ({
    value: ch.id,
    label: ch.title,
  }))
  const items = [{ value: '.', label: '--Choose a chapter--' }, ...options]
  return items
})

function onChoose(val: string) {
  emit('chosen', val)
}
</script>
<style scoped></style>
