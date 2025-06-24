<template>
  <div class="builder-layout">
    <div class="left-panel">
      <AdvStorylineNav
        :chapters="chapters"
        :selected="selected"
        @select="handleSelect"
        @add-chapter="handleAddChapter"
        @add-scene="handleAddScene"
      />
    </div>
    <div class="right-panel">
      <component :is="currentForm" :item="selected" @submit="handleSubmit" @cancel="handleCancel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AdvChapterForm from '~/components/adv/ChapterForm.vue'
import AdvSceneForm from '~/components/adv/SceneForm.vue'
const chapters = ref([
  {
    id: 'chapter-1',
    title: 'Chapter 1',
    scenes: [
      { id: 'scene-1', title: 'Scene 1', content: 'This is scene 1 content.' },
      { id: 'scene-2', title: 'Scene 2', content: 'This is scene 2 content.' },
    ],
  },
  {
    id: 'chapter-2',
    title: 'Chapter 2',
    scenes: [
      { id: 'scene-3', title: 'Scene 3', content: 'This is scene 3 content.' },
      { id: 'scene-4', title: 'Scene 4', content: 'This is scene 4 content.' },
      { id: 'scene-5', title: 'Scene 5', content: 'This is scene 5 content.' },
    ],
  },
])

const selected = ref({ type: 'chapter' })

const currentForm = computed(() => {
  if (!selected.value) return null
  if (selected.value.type === 'chapter') return AdvChapterForm
  if (selected.value.type === 'scene') return AdvSceneForm
  return null
})

function handleSelect(item) {
  selected.value = item
}

function handleAddChapter() {
  selected.value = { type: 'chapter', isNew: true }
}

function handleAddScene(chapterId) {
  selected.value = { type: 'scene', chapterId, isNew: true }
}

function handleCancel() {
  selected.value = null
}

function handleSubmit(item) {
  // Call service to create/update chapter or scene
  // Update chapters state accordingly
  selected.value = null
}
</script>

<style scoped>
.builder-layout {
  display: flex;
  height: 100vh;
}
.left-panel {
  width: 300px;
  border-right: 1px solid #eee;
  padding: 1rem;
}
.right-panel {
  flex: 1;
  padding: 2rem;
}
</style>
