<template>
  <UContainer>
    <h2 class="mx-auto text-center border-b border-white">Scene: {{ sceneDisplayName }}</h2>
    <div>
      <AdvBuilderSceneForm v-if="editScene" :item="scene" :is-new="!scene._id" @submit="handleSceneUpdate"
        @cancel="editScene = false" />
      <UButton v-else @click="editScene = true" icon="i-ph-pencil-simple-bold" variant="subtle" label="Edit Scene"
        class="mb-4" />
    </div>
    <div v-if="!isNewScene" class="builder-layout">
      <div class="left-panel overflow-y-auto">
        <AdvBuilderSceneContent :blocks="scene.content" :selected="selectedBlock" @add-block="handleAddBlock"
          @select="handleSelectBlock" @reorg="openReorgModal" @delete="handleConfirmDeleteBlock" />
      </div>
      <div class="right-panel overflow-y-auto">
        <component v-if="selectedBlock" :is="editorComponent" :is-new="isNewBlock" :block="selectedBlock"
          @submit="handleBlockSave" @cancel="clearSelectedBlock" />
        <div v-else>Select or add a block to edit.</div>
      </div>
    </div>
  </UContainer>
  <UModal v-model:open="isDeleteModalOpen">
    <template #title>Delete Content Block</template>
    <template #description>Are you sure you want to delete this content block?</template>
    <template #footer>
      <UButton @click="handleDeleteBlock" label="Delete" color="warning" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import PassageBlockBuilder from './PassageBlock.vue'
import ImageBlockBuilder from './ImageBlock.vue'
import VideoBlockBuilder from './VideoBlock.vue'

import type { Scene, ContentBlock } from '~/types/adventure-types'

definePageMeta({
  layout: 'adventure-builder',
})

const props = defineProps<{
  scene: Scene
  isNewScene: boolean
}>()
const emit = defineEmits(['save-scene'])

const isDeleteModalOpen = ref(false)
const blockToDelete = ref<any>(null)

const api = useAdventureApi()

const sceneDisplayName = computed(() => {
  return props.scene.title || 'New Scene?'
})

const editScene = ref(false)

const selectedBlock = ref<any>(null)
const isNewBlock = ref(false)

function handleSceneUpdate(updatedScene: Scene) {
  emit('save-scene', updatedScene)
  editScene.value = false
}

function handleAddBlock(type: string) {
  let newBlock: any = { type }
  if (type === 'passage') newBlock = { ...newBlock, label: '', html: '' }
  if (type === 'image')
    newBlock = { ...newBlock, label: '', imageSrc: '', position: '', caption: '' }
  if (type === 'video') newBlock = { ...newBlock, label: '', url: '' }
  selectedBlock.value = newBlock
  isNewBlock.value = true
}

function handleSelectBlock(block: any) {
  selectedBlock.value = block
  isNewBlock.value = false
}

function clearSelectedBlock() {
  selectedBlock.value = null
  isNewBlock.value = false
}

function openReorgModal() {
  // Placeholder for reorganization logic
  alert('Someday, show a modal to adjust scene order.')
}

async function handleBlockSave(updatedBlock: any) {
  let saved: ContentBlock | null
  if (isNewBlock.value) {
    saved = await api.addSceneContent(props.scene._id!, updatedBlock)
  } else {
    saved = await api.updateSceneContent(props.scene._id!, updatedBlock)
  }
  if (!saved) {
    alert('Failed to save content block')
    return
  }

  if (isNewBlock.value) {
    props.scene.content.push(saved)
  } else {
    const idx = props.scene.content.findIndex((b: any) => b._id === updatedBlock._id)
    if (idx !== -1) {
      props.scene.content[idx] = saved
    }
  }
  clearSelectedBlock()
}

async function handleConfirmDeleteBlock(block: any) {
  console.log('handleConfirmDeleteBlock', block)
  isDeleteModalOpen.value = true
  blockToDelete.value = block
}

async function handleDeleteBlock() {
  await api.deleteSceneContent(props.scene._id!, blockToDelete.value._id!)
  props.scene.content = props.scene.content.filter((b: any) => b._id !== blockToDelete.value._id)
  isDeleteModalOpen.value = false
  blockToDelete.value = null
}

const editorComponent = computed(() => {
  if (!selectedBlock.value) return null
  switch (selectedBlock.value.type) {
    case 'passage':
      return PassageBlockBuilder
    case 'image':
      return ImageBlockBuilder
    case 'video':
      return VideoBlockBuilder
    default:
      return null
  }
})
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
