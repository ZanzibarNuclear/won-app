<template>
  <div class="flex-1 flex overflow-hidden">
    <div class="flex w-full h-full">
      <!-- Left Panel: Structure Tree -->
      <div class="w-1/2 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
        <div
          class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Storyline Structure</h3>
          <UButton @click="addChapter" icon="i-ph-plus" variant="solid" color="primary" size="sm" label="Add Chapter" />
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <!-- Storyline Node -->
          <div class="mb-4">
            <div
              class="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="toggleNode('storyline')">
              <UIcon :name="isExpanded.storyline ? 'i-ph-caret-down' : 'i-ph-caret-right'"
                class="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
              <span class="font-medium text-gray-900 dark:text-white">Storyline</span>
            </div>

            <div v-if="isExpanded.storyline"
              class="mt-2 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title:</label>
                  <UInput v-model="localStoryline.title" @input="updateStoryline" placeholder="Enter storyline title" />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author:</label>
                  <UInput v-model="localStoryline.author" @input="updateStoryline" placeholder="Enter author name" />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description:</label>
                  <UTextarea v-model="localStoryline.description" @input="updateStoryline"
                    placeholder="Enter storyline description" :rows="3" />
                </div>
              </div>
            </div>
          </div>

          <!-- Chapters -->
          <div class="mb-4">
            <div class="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-2">
              <span class="font-medium text-gray-900 dark:text-white">Chapters ({{ localStoryline.chapters?.length || 0
              }})</span>
            </div>

            <div v-if="localStoryline.chapters?.length" class="space-y-2">
              <div v-for="(chapter, index) in localStoryline.chapters" :key="chapter._id || index"
                class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div
                  class="flex items-center p-3 bg-gray-50 dark:bg-gray-800 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                  @click="toggleChapter(index)">
                  <UIcon :name="isExpanded.chapters[index] ? 'i-ph-caret-down' : 'i-ph-caret-right'"
                    class="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                  <span class="font-medium text-gray-900 dark:text-white flex-1">{{ chapter.title || `Chapter ${index +
                    1}` }}</span>
                  <div class="flex gap-1">
                    <UButton @click.stop="moveChapter(index, -1)" :disabled="index === 0" icon="i-ph-arrow-up"
                      variant="ghost" size="xs" />
                    <UButton @click.stop="moveChapter(index, 1)"
                      :disabled="index === localStoryline.chapters.length - 1" icon="i-ph-arrow-down" variant="ghost"
                      size="xs" />
                    <UButton @click.stop="removeChapter(index)" icon="i-ph-trash" variant="ghost" color="error"
                      size="xs" />
                  </div>
                </div>

                <div v-if="isExpanded.chapters[index]"
                  class="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title:</label>
                      <UInput v-model="chapter.title" @input="updateStoryline" placeholder="Chapter title" />
                    </div>

                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description:</label>
                      <UTextarea v-model="chapter.description" @input="updateStoryline"
                        placeholder="Chapter description" :rows="2" />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Order:</label>
                      <UInput v-model.number="chapter.order" @input="updateStoryline" type="number" min="1" />
                    </div>

                    <!-- Scenes -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Scenes ({{
                        chapter.scenes?.length || 0 }}):</label>
                      <div class="space-y-2">
                        <div v-for="(scene, sceneIndex) in chapter.scenes || []" :key="scene._id || sceneIndex"
                          class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <div
                            class="flex items-center p-2 bg-gray-50 dark:bg-gray-800 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                            @click="toggleScene(index, sceneIndex)">
                            <UIcon
                              :name="isExpanded.scenes[`${index}-${sceneIndex}`] ? 'i-ph-caret-down' : 'i-ph-caret-right'"
                              class="w-3 h-3 mr-2 text-gray-600 dark:text-gray-400" />
                            <span class="text-sm font-medium text-gray-900 dark:text-white flex-1">{{ scene.title ||
                              `Scene ${sceneIndex + 1}` }}</span>
                            <div class="flex gap-1">
                              <UButton @click.stop="moveScene(index, sceneIndex, -1)" :disabled="sceneIndex === 0"
                                icon="i-ph-arrow-up" variant="ghost" size="xs" />
                              <UButton @click.stop="moveScene(index, sceneIndex, 1)"
                                :disabled="sceneIndex === (chapter.scenes?.length || 0) - 1" icon="i-ph-arrow-down"
                                variant="ghost" size="xs" />
                              <UButton @click.stop="removeScene(index, sceneIndex)" icon="i-ph-trash" variant="ghost"
                                color="error" size="xs" />
                            </div>
                          </div>

                          <div v-if="isExpanded.scenes[`${index}-${sceneIndex}`]"
                            class="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                            <div class="space-y-3">
                              <div>
                                <label
                                  class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Title:</label>
                                <UInput v-model="scene.title" @input="updateStoryline" placeholder="Scene title"
                                  size="sm" />
                              </div>

                              <!-- Content Blocks -->
                              <div>
                                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Content
                                  Blocks ({{ scene.content?.length || 0 }}):</label>
                                <div class="space-y-2">
                                  <div v-for="(block, blockIndex) in scene.content || []" :key="block._id || blockIndex"
                                    class="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                                    <span
                                      class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded mr-2">{{
                                        block.type }}</span>
                                    <span class="text-sm text-gray-900 dark:text-white flex-1">{{ block.label }}</span>
                                    <div class="flex gap-1">
                                      <UButton @click="moveContentBlock(index, sceneIndex, blockIndex, -1)"
                                        :disabled="blockIndex === 0" icon="i-ph-arrow-up" variant="ghost" size="xs" />
                                      <UButton @click="moveContentBlock(index, sceneIndex, blockIndex, 1)"
                                        :disabled="blockIndex === (scene.content?.length || 0) - 1"
                                        icon="i-ph-arrow-down" variant="ghost" size="xs" />
                                      <UButton @click="removeContentBlock(index, sceneIndex, blockIndex)"
                                        icon="i-ph-trash" variant="ghost" color="error" size="xs" />
                                    </div>
                                  </div>

                                  <div class="flex gap-2 flex-wrap">
                                    <UButton @click="addContentBlock(index, sceneIndex, 'passage')" icon="i-ph-plus"
                                      variant="ghost" size="xs" label="Add Passage" />
                                    <UButton @click="addContentBlock(index, sceneIndex, 'image')" icon="i-ph-plus"
                                      variant="ghost" size="xs" label="Add Image" />
                                    <UButton @click="addContentBlock(index, sceneIndex, 'video')" icon="i-ph-plus"
                                      variant="ghost" size="xs" label="Add Video" />
                                  </div>
                                </div>
                              </div>

                              <!-- Transitions -->
                              <div>
                                <label
                                  class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Transitions
                                  ({{ scene.transitions?.length || 0 }}):</label>
                                <div class="space-y-2">
                                  <div v-for="(transition, transitionIndex) in scene.transitions || []"
                                    :key="transition._id || transitionIndex"
                                    class="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                                    <span class="text-sm text-gray-900 dark:text-white flex-1">{{ transition.label
                                    }}</span>
                                    <div class="flex gap-1">
                                      <UButton @click="moveTransition(index, sceneIndex, transitionIndex, -1)"
                                        :disabled="transitionIndex === 0" icon="i-ph-arrow-up" variant="ghost"
                                        size="xs" />
                                      <UButton @click="moveTransition(index, sceneIndex, transitionIndex, 1)"
                                        :disabled="transitionIndex === (scene.transitions?.length || 0) - 1"
                                        icon="i-ph-arrow-down" variant="ghost" size="xs" />
                                      <UButton @click="removeTransition(index, sceneIndex, transitionIndex)"
                                        icon="i-ph-trash" variant="ghost" color="error" size="xs" />
                                    </div>
                                  </div>

                                  <UButton @click="addTransition(index, sceneIndex)" icon="i-ph-plus" variant="ghost"
                                    size="xs" label="Add Transition" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <UButton @click="addScene(index)" icon="i-ph-plus" variant="ghost" size="sm"
                          label="Add Scene" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400 italic">
              <p>No chapters yet. Click "Add Chapter" to get started.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel: JSON Preview -->
      <div class="w-1/2 flex flex-col overflow-hidden">
        <div
          class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">JSON Preview</h3>
          <UButton @click="copyJson" icon="i-ph-copy" variant="solid" color="primary" size="sm" label="Copy JSON" />
        </div>

        <div class="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-gray-900">
          <pre class="text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ formattedJson }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import type { Storyline, Chapter, Scene, ContentBlock, Transition } from '~/types/adventure-types'

interface Props {
  storyline: Storyline
}

const props = defineProps<Props>()

const emit = defineEmits<{
  update: [storyline: Storyline]
}>()

// Local state
const localStoryline = ref<Storyline>(JSON.parse(JSON.stringify(props.storyline)))
const isExpanded = reactive({
  storyline: true,
  chapters: {} as Record<number, boolean>,
  scenes: {} as Record<string, boolean>
})

// Computed
const formattedJson = computed(() => {
  return JSON.stringify(localStoryline.value, null, 2)
})

// Methods
const updateStoryline = () => {
  emit('update', localStoryline.value)
}

const toggleNode = (nodeType: string) => {
  if (nodeType === 'storyline') {
    isExpanded.storyline = !isExpanded.storyline
  }
}

const toggleChapter = (index: number) => {
  isExpanded.chapters[index] = !isExpanded.chapters[index]
}

const toggleScene = (chapterIndex: number, sceneIndex: number) => {
  const key = `${chapterIndex}-${sceneIndex}`
  isExpanded.scenes[key] = !isExpanded.scenes[key]
}

const addChapter = () => {
  if (!localStoryline.value.chapters) {
    localStoryline.value.chapters = []
  }

  const newChapter: Chapter = {
    _id: `chapter-${Date.now()}`,
    title: '',
    description: '',
    order: localStoryline.value.chapters.length + 1,
    scenes: []
  }

  localStoryline.value.chapters.push(newChapter)
  isExpanded.chapters[localStoryline.value.chapters.length - 1] = true
  updateStoryline()
}

const removeChapter = (index: number) => {
  const chapters = localStoryline.value.chapters
  if (!chapters) return

  chapters.splice(index, 1)
  // Update order numbers
  chapters.forEach((chapter, i) => {
    if (chapter) {
      chapter.order = i + 1
    }
  })
  updateStoryline()
}

const moveChapter = (index: number, direction: number) => {
  const chapters = localStoryline.value.chapters
  if (!chapters) return

  const newIndex = index + direction

  if (newIndex >= 0 && newIndex < chapters.length) {
    const temp = chapters[index]
    if (temp) {
      chapters[index] = chapters[newIndex]
      chapters[newIndex] = temp
      // Update order numbers
      chapters.forEach((chapter, i) => {
        if (chapter) {
          chapter.order = i + 1
        }
      })
      updateStoryline()
    }
  }
}

const addScene = (chapterIndex: number) => {
  const chapters = localStoryline.value.chapters
  if (!chapters) return

  const chapter = chapters[chapterIndex]
  if (!chapter) return

  if (!chapter.scenes) {
    chapter.scenes = []
  }

  const newScene: Scene = {
    _id: `scene-${Date.now()}`,
    chapterId: chapter._id,
    title: '',
    content: [],
    transitions: []
  }

  chapter.scenes.push(newScene)
  updateStoryline()
}

const removeScene = (chapterIndex: number, sceneIndex: number) => {
  const chapters = localStoryline.value.chapters
  if (!chapters) return

  const chapter = chapters[chapterIndex]
  if (!chapter || !chapter.scenes) return

  chapter.scenes.splice(sceneIndex, 1)
  updateStoryline()
}

const moveScene = (chapterIndex: number, sceneIndex: number, direction: number) => {
  const chapters = localStoryline.value.chapters
  if (!chapters) return

  const chapter = chapters[chapterIndex]
  if (!chapter || !chapter.scenes) return

  const scenes = chapter.scenes
  const newIndex = sceneIndex + direction

  if (newIndex >= 0 && newIndex < scenes.length) {
    const temp = scenes[sceneIndex]
    if (temp) {
      scenes[sceneIndex] = scenes[newIndex]
      scenes[newIndex] = temp
      updateStoryline()
    }
  }
}

const addContentBlock = (chapterIndex: number, sceneIndex: number, type: 'passage' | 'image' | 'video') => {
  const chapters = localStoryline.value.chapters
  if (!chapters) return

  const chapter = chapters[chapterIndex]
  if (!chapter || !chapter.scenes) return

  const scene = chapter.scenes[sceneIndex]
  if (!scene) return

  if (!scene.content) {
    scene.content = []
  }

  let newBlock: ContentBlock

  switch (type) {
    case 'passage':
      newBlock = {
        _id: `block-${Date.now()}`,
        type: 'passage',
        label: 'New Passage',
        html: ''
      }
      break
    case 'image':
      newBlock = {
        _id: `block-${Date.now()}`,
        type: 'image',
        label: 'New Image',
        imageSrc: ''
      }
      break
    case 'video':
      newBlock = {
        _id: `block-${Date.now()}`,
        type: 'video',
        label: 'New Video',
        url: ''
      }
      break
  }

  scene.content.push(newBlock)
  updateStoryline()
}

const removeContentBlock = (chapterIndex: number, sceneIndex: number, blockIndex: number) => {
  const chapters = localStoryline.value.chapters
  if (!chapters) return

  const chapter = chapters[chapterIndex]
  if (!chapter || !chapter.scenes) return

  const scene = chapter.scenes[sceneIndex]
  if (!scene || !scene.content) return

  scene.content.splice(blockIndex, 1)
  updateStoryline()
}

const moveContentBlock = (chapterIndex: number, sceneIndex: number, blockIndex: number, direction: number) => {
  const chapters = localStoryline.value.chapters
  if (!chapters) return

  const chapter = chapters[chapterIndex]
  if (!chapter || !chapter.scenes) return

  const scene = chapter.scenes[sceneIndex]
  if (!scene || !scene.content) return

  const content = scene.content
  const newIndex = blockIndex + direction

  if (newIndex >= 0 && newIndex < content.length) {
    const temp = content[blockIndex]
    if (temp) {
      content[blockIndex] = content[newIndex]
      content[newIndex] = temp
      updateStoryline()
    }
  }
}

const addTransition = (chapterIndex: number, sceneIndex: number) => {
  const chapters = localStoryline.value.chapters
  if (!chapters) return

  const chapter = chapters[chapterIndex]
  if (!chapter || !chapter.scenes) return

  const scene = chapter.scenes[sceneIndex]
  if (!scene) return

  if (!scene.transitions) {
    scene.transitions = []
  }

  const newTransition: Transition = {
    _id: `transition-${Date.now()}`,
    toSceneId: '',
    label: 'New Transition',
    prompt: ''
  }

  scene.transitions.push(newTransition)
  updateStoryline()
}

const removeTransition = (chapterIndex: number, sceneIndex: number, transitionIndex: number) => {
  const chapters = localStoryline.value.chapters
  if (!chapters) return

  const chapter = chapters[chapterIndex]
  if (!chapter || !chapter.scenes) return

  const scene = chapter.scenes[sceneIndex]
  if (!scene || !scene.transitions) return

  scene.transitions.splice(transitionIndex, 1)
  updateStoryline()
}

const moveTransition = (chapterIndex: number, sceneIndex: number, transitionIndex: number, direction: number) => {
  const chapters = localStoryline.value.chapters
  if (!chapters) return

  const chapter = chapters[chapterIndex]
  if (!chapter || !chapter.scenes) return

  const scene = chapter.scenes[sceneIndex]
  if (!scene || !scene.transitions) return

  const transitions = scene.transitions
  const newIndex = transitionIndex + direction

  if (newIndex >= 0 && newIndex < transitions.length) {
    const temp = transitions[transitionIndex]
    if (temp) {
      transitions[transitionIndex] = transitions[newIndex]
      transitions[newIndex] = temp
      updateStoryline()
    }
  }
}

const copyJson = async () => {
  try {
    await navigator.clipboard.writeText(formattedJson.value)
    // Could add a toast notification here
  } catch (err) {
    console.error('Failed to copy JSON:', err)
  }
}

// Watch for prop changes
watch(() => props.storyline, (newStoryline) => {
  localStoryline.value = JSON.parse(JSON.stringify(newStoryline))
}, { deep: true })
</script>