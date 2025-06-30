<template>
  <div class="border-2 border-gray-300 mb-8 p-4 rounded-lg">
    <h3>Chapter Builder</h3>
    <div v-if="chapter">
      <AdvChapterForm
        v-if="isEdit"
        :chapter="chapter"
        :is-new="isNew"
        @submit="handleUpdateChapter"
        @cancel="isEdit = false"
      />
      <AdvChapterCard v-else :chapter="chapter" @edit="isEdit = true" class="space-y-4" />
      <div class="my-4 space-x-2">
        <AdvScenePicker
          v-if="chapter.scenes"
          :scenes="chapter.scenes"
          @chosen="handleSelectScene"
        />
        <UButton
          @click="handleAddScene"
          icon="i-ph-plus-square-duotone"
          size="sm"
          variant="subtle"
          label="Add Scene"
        />
      </div>
    </div>
    <p v-else class="text-gray-500">No chapter selected.</p>
  </div>
</template>

<script setup lang="ts">
import type { Chapter } from '~/types/adventure-types'

const props = defineProps<{
  chapter: Chapter
  isNew: boolean
}>()
const emit = defineEmits(['update-chapter', 'build-scene'])

const isEdit = ref(false)

function handleUpdateChapter(updatedChapter: Chapter) {
  emit('update-chapter', updatedChapter)
  isEdit.value = false
}

function handleAddScene() {
  emit('build-scene', null)
}

function handleSelectScene(sceneId: string) {
  emit('build-scene', sceneId)
}
</script>

<style scoped></style>
