<template>
  <div class="border-2 border-gray-300 mb-8 p-4 rounded-lg">
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
    <UButton class="mb-4" @click="switchToSceneBuilder">Work on Scenes</UButton>
    <div v-if="pageState.chapter && pageState.chapterEdit" class="mb-4">
      <AdvChapterForm
        :chapter="pageState.chapter"
        @submit="handleChapterUpdate"
        @cancel="pageState.chapterEdit = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Chapter } from '~/types/adventure-types'

const props = defineProps<{
  chapters: Array<Chapter>
}>()
const emit = defineEmits(['add-chapter', 'update-chapter'])

const activeChapter = ref<Chapter | null>(null)
const isEdit = ref(false)

// State
const pageState = reactive({
  chapter: null as Chapter | null,
  chapterEdit: false,
  sceneBuilder: false,
})

// Methods
function handleAddChapter() {
  emit('add-chapter', {
    title: 'New Chapter',
    description: '',
    scenes: [],
  })
}

function handleSelectChapter(chapterId: string) {
  const chosenChapter = props.chapters.find((ch) => ch.id === chapterId) || null
  pageState.chapter = chosenChapter
  pageState.chapterEdit = !!pageState.chapter
}

function handleChapterUpdate(updatedChapter: Chapter) {
  pageState.chapter = updatedChapter
  pageState.chapterEdit = false
}

function switchToSceneBuilder() {
  pageState.sceneBuilder = true
}
</script>

<style scoped></style>
