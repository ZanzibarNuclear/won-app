<template>
  <div class="border-2 border-gray-300 mb-8 p-4 rounded-lg">
    <h3>Chapter Builder</h3>
    <div v-if="chapter">
      <div v-if="isEdit" class="mb-4">
        <AdvChapterForm
          :chapter="chapter"
          :is-new="isNew"
          @submit="handleUpdateChapter"
          @cancel="isEdit = false"
        />
      </div>
      <div v-else class="mb-4">
        <div class="space-y-4">
          <h4 class="text-lg font-semibold">Title: {{ chapter.title }}</h4>
          <div>
            <UButton @click="isEdit = true" icon="i-ph-pencil-duotone">Edit</UButton>
          </div>
          <AdvScenePicker
            v-if="chapter.scenes"
            :scenes="chapter.scenes"
            @chosen="handleSelectScene"
          />
        </div>
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

function handleSelectScene(sceneId: string) {
  const scene = props.chapter?.scenes.find((s) => s.id === sceneId)
  if (scene) {
    emit('build-scene', scene)
  } else {
    console.warn(`Scene with ID ${sceneId} not found in chapter ${props.chapter?.title}`)
  }
  isEdit.value = false
}
</script>

<style scoped></style>
