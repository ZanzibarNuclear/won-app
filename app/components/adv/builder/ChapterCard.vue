<template>
  <UCard :ui="cardStyle">
    <template #header>
      {{ chapter.title }}
    </template>
    <div class="space-y-2">
      <p>{{ chapter.description }}</p>
      <p>
        <span class="font-bold">Opening scene:</span>
        {{ openingScene ? openingScene.title : 'not set' }}
      </p>
      <p>Sequence #: {{ chapter.order }}</p>
    </div>
    <template #footer>
      <UButton
        @click="$emit('edit')"
        icon="i-ph-pencil-duotone"
        size="sm"
        block
        variant="subtle"
        label="Edit Chapter"
      />
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Chapter } from '~/types/adventure-types'

const props = defineProps<{
  chapter: Chapter
}>()
defineEmits(['edit'])

const openingScene = computed(() => {
  const { openingSceneId } = props.chapter
  if (openingSceneId) {
    return props.chapter.scenes.find((scene) => scene._id === openingSceneId)
  }
})

const cardStyle = {
  header: 'p-2 sm:px-2',
  body: 'p-2 sm:p-2',
  footer: 'p-2 sm:px-2',
}
</script>
