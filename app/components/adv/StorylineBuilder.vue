<template>
  <div class="builder-layout">
    <div class="left-panel">
      <AdvStorylineNav
        :chapters="storyline.chapters"
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

const props = defineProps<{
  storyline: any
}>()

const chapters = ref(props.storyline.chapters || [])

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
  if (selected.value.type === 'chapter') {
    // Update or create chapter
    const index = chapters.value.findIndex((ch) => ch.id === item.id)
    const nextId = chapters.value.length + 100
    if (index !== -1) {
      chapters.value[index] = { ...chapters.value[index], ...item }
    } else {
      chapters.value.push({ ...item, id: `chapter-${nextId}` })
    }
  } else if (selected.value.type === 'scene') {
    // Update or create scene
    const chapter = chapters.value.find((ch) => ch.id === item.chapterId)
    if (chapter) {
      const index = chapter.scenes.findIndex((sc) => sc.id === item.id)
      const nextSceneId = chapter.scenes.length + 100
      if (index !== -1) {
        chapter.scenes[index] = { ...chapter.scenes[index], ...item }
      } else {
        chapter.scenes.push({ ...item, id: `scene-${nextSceneId}` })
      }
    }
  }
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
