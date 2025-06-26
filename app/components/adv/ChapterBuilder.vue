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
          @submit="handleChapterUpdate"
          @cancel="isEdit = false"
        />
      </div>
      <div v-else class="mb-4">
        <div v-if="activeChapter">
          <h4 class="text-lg font-semibold">{{ activeChapter.title }}</h4>
          <div class="flex space-x-1">
            <div class="mt-4">
              <UButton @click="isEdit = true" icon="i-ph-pencil-duotone"> Edit Storyline </UButton>
            </div>
          </div>
          <UButton class="mb-4" @click="switchToSceneBuilder">Work on Scenes</UButton>
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
const emit = defineEmits(['add-chapter', 'update-chapter'])

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

function handleChapterUpdate(updatedChapter: Chapter) {
  emit('update-chapter', updatedChapter)
  isEdit.value = false
}

function switchToSceneBuilder() {
  // TODO: Implement logic to switch to scene builder
  console.log('Implement me')
}
</script>

<style scoped></style>
