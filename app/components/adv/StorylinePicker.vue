<template>
  <div>
    <p v-if="!storylines">Loading...</p>
    <USelect :items="items" v-model="picked" placeholder="WTF?" class="w-48" />
    <UButton @click="onChoose" label="Go" />
  </div>
</template>

<script setup lang="ts">
import type { StorylineSummary } from '~/types/adventure-types'

const props = defineProps<{
  storylines?: StorylineSummary[]
}>()
const emit = defineEmits(['pickedStoryline'])

const picked = ref('.')

const items = computed(() => {
  const options =
    props.storylines?.map((s) => ({
      label: s.title,
      value: s._id,
    })) || []
  const items = [{ label: '--Choose a storyline--', value: '.' }, ...options]
  return items
})

function onChoose() {
  if (picked.value === '.') {
    alert('Choose a storyline to continue.')
  }
  emit('pickedStoryline', picked.value)
}
</script>

<style scoped></style>
