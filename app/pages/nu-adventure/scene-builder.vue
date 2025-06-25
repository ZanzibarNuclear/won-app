<template>
  <UContainer>
    <h2 class="mx-auto text-center border-b border-white">Scene: {{ sceneDisplayName }}</h2>
    <div class="builder-layout">
      <div class="left-panel overflow-y-auto">
        <AdvSceneContent
          :blocks="scene.contentBlocks"
          :selected="selectedBlock"
          @add-block="handleAddBlock"
          @select="handleSelectBlock"
        />
      </div>
      <div class="right-panel overflow-y-auto">
        <component
          v-if="selectedBlock"
          :is="editorComponent"
          :is-new="isNewBlock"
          :block="selectedBlock"
          @submit="handleBlockUpdate"
          @cancel="clearSelectedBlock"
        />
        <div v-else>Select or add a block to edit.</div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import PassageBlockBuilder from '~/components/adv/builder/PassageBlock.vue'
import ImageBlockBuilder from '~/components/adv/builder/ImageBlock.vue'
import VideoBlockBuilder from '~/components/adv/builder/VideoBlock.vue'

definePageMeta({
  layout: 'adventure-builder',
})

const sceneId = useRoute().query['scene-id'] as string

const sceneDisplayName = computed(() => {
  return scene.value.title || sceneId || 'New Scene?'
})

const scene = ref({
  id: 'scene-1',
  title: 'Where Zanzi discovers the utility closet',
  contentBlocks: [
    {
      id: 'block-1',
      type: 'passage',
      label: 'Passage Block 1',
      html: '<p>This is the first passage block.</p>',
    },
    {
      id: 'block-2',
      type: 'image',
      label: 'Image Block 2',
      imageSrc: '/path/to/image.jpg',
      position: 'float-right',
      caption: 'An example image',
    },
    {
      id: 'block-3',
      type: 'video',
      label: 'Video Block 3',
      url: '/path/to/vid.mpeg',
    },
  ],
})

const selectedBlock = ref<any>(null)
const isNewBlock = ref(false)

function handleAddBlock(type: string) {
  const id = `block-${Date.now()}`
  let newBlock: any = { id, type }
  if (type === 'passage') newBlock = { ...newBlock, label: '', html: '' }
  if (type === 'image')
    newBlock = { ...newBlock, label: '', imageSrc: '', position: '', caption: '' }
  if (type === 'video') newBlock = { ...newBlock, label: '', url: '' }
  scene.value.contentBlocks.push(newBlock)
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

function handleBlockUpdate(updatedBlock: any) {
  const idx = scene.value.contentBlocks.findIndex((b) => b.id === updatedBlock.id)
  if (idx !== -1) {
    scene.value.contentBlocks[idx] = { ...updatedBlock }
    clearSelectedBlock()
  }
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
