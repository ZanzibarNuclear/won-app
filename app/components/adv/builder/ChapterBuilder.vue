<template>
  <div>
    <AdvChapterPicker
      v-if="chapters"
      :chapters="chapters"
      @chosen="handleSelectChapter"
      class="my-4"
    />
    <button class="mb-4" @click="switchToSceneBuilder">Work on Scenes</button>
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

// State
const pageState = reactive({
  chapter: null as Chapter | null,
  chapterEdit: false,
  sceneBuilder: false,
})

// Methods
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
