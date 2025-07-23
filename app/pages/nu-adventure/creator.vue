<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Storyline Selection View -->
    <div v-if="!selectedStoryline" class="p-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Adventure Creator</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">Select a storyline to edit or create a new one</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <AdventureStorylineCard v-for="storyline in availableStorylines" :key="storyline._id" :storyline="storyline"
          @select="selectStoryline" />

        <div
          class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          @click="createNewStoryline">
          <div class="flex flex-col items-center gap-4">
            <div class="text-4xl text-blue-500 font-bold">+</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Create New Storyline</h3>
            <p class="text-gray-600 dark:text-gray-400">Start building a new adventure</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Storyline Editor View -->
    <div v-else class="h-screen flex flex-col">
      <div
        class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <UButton @click="backToSelection" icon="i-ph-arrow-left" variant="ghost" label="Back to Storylines" />
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ selectedStoryline.title || 'Untitled' }}
        </h2>
        <div class="flex gap-2">
          <UButton @click="saveStoryline" icon="i-ph-floppy-disk" variant="solid" color="success" label="Save" />
          <UButton @click="previewStoryline" icon="i-ph-eye" variant="solid" color="primary" label="Preview" />
        </div>
      </div>

      <AdventureStorylineEditor :storyline="selectedStoryline" @update="updateStoryline" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Storyline, StorylineSummary } from '~/types/adventure-types'

// API
const { fetchStorylines, fetchStoryline, addStoryline, updateStoryline: updateStorylineApi } = useAdventureApi()

// State
const selectedStoryline = ref<Storyline | null>(null)
const availableStorylines = ref<StorylineSummary[]>([])
const loading = ref(false)

// Methods
const selectStoryline = async (storyline: StorylineSummary) => {
  // Fetch the full storyline with chapters
  const fullStoryline = await fetchStoryline(storyline._id)
  if (fullStoryline) {
    selectedStoryline.value = fullStoryline
  }
}

const createNewStoryline = async () => {
  const newStoryline = await addStoryline({
    title: 'New Storyline',
    description: 'A new adventure storyline'
  })

  if (newStoryline) {
    selectedStoryline.value = newStoryline
  }
}

const backToSelection = () => {
  selectedStoryline.value = null
}

const updateStoryline = (updatedStoryline: Storyline) => {
  if (selectedStoryline.value) {
    selectedStoryline.value = updatedStoryline
  }
}

const saveStoryline = async () => {
  if (!selectedStoryline.value) return

  loading.value = true
  try {
    const saved = await updateStorylineApi(selectedStoryline.value)
    if (saved) {
      selectedStoryline.value = saved
      // Could add a toast notification here
    }
  } catch (error) {
    console.error('Failed to save storyline:', error)
  } finally {
    loading.value = false
  }
}

const previewStoryline = () => {
  // TODO: Implement preview functionality
  console.log('Previewing storyline:', selectedStoryline.value)
}

// Load available storylines on mount
onMounted(async () => {
  loading.value = true
  try {
    const storylines = await fetchStorylines()
    availableStorylines.value = storylines
  } catch (error) {
    console.error('Failed to load storylines:', error)
  } finally {
    loading.value = false
  }
})
</script>