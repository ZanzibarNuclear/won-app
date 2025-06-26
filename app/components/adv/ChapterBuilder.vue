<template>
  <div class="border-2 border-gray-300 mb-8 p-4 rounded-lg">
    <h3>Chapter Builder</h3>
    <div class="space-x-1">
      <AdvChapterPicker
        v-if="chapters"
        :chapters="chapters"
        @chosen="handleSelectChapter"
        class="my-4"
      />
      <UButton @click="handleAddChapter" icon="i-ph-plus-square-duotone" size="sm" variant="subtle">
        Add Chapter
      </UButton>
    </div>
    <div v-if="activeChapter">
      <div v-if="isEdit" class="mb-4">
        <AdvChapterForm
          :chapter="activeChapter"
          :is-new="isActiveNew"
          @submit="handleUpdateChapter"
          @cancel="isEdit = false"
        />
      </div>
      <div v-else class="mb-4">
        <div v-if="activeChapter" class="space-y-4">
          <h4 class="text-lg font-semibold">Title: {{ activeChapter.title }}</h4>
          <div>
            <UButton @click="isEdit = true" icon="i-ph-pencil-duotone">Edit</UButton>
          </div>
          <AdvScenePicker
            v-if="activeChapter.scenes"
            :scenes="activeChapter.scenes"
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
  chapters: Array<Chapter>
}>()
const emit = defineEmits(['add-chapter', 'update-chapter', 'build-scene'])

const activeChapter = ref<Chapter | null>(null)
const isEdit = ref(false)

const isActiveNew = computed(() => {
  return !!(activeChapter.value?.id === '')
})

// Methods
function handleAddChapter() {
  activeChapter.value = {
    id: '',
    title: 'New Chapter',
    scenes: [],
  }
}

function handleSelectChapter(chapterId: string) {
  const chosenChapter = props.chapters.find((ch) => ch.id === chapterId) || null
  activeChapter.value = chosenChapter
}

function handleUpdateChapter(updatedChapter: Chapter) {
  emit('update-chapter', updatedChapter)
  isEdit.value = false
}

function handleSelectScene(sceneId: string) {
  const scene = activeChapter.value?.scenes.find((s) => s.id === sceneId)
  if (scene) {
    emit('build-scene', scene)
  } else {
    console.warn(`Scene with ID ${sceneId} not found in chapter ${activeChapter.value?.title}`)
  }
  isEdit.value = false
}
</script>

<style scoped></style>
