<template>
  <div class="builder-layout">
    <div class="left-panel">
      <AdvSceneContent
        :blocks="scene.contentBlocks"
        :selected="selectedBlock"
        @add-block="handleAddBlock"
        @select="handleSelectBlock"
      />
    </div>
    <div class="right-panel">
      <component
        v-if="selectedBlock"
        :is="editorComponent"
        :block="selectedBlock"
        @submit="handleBlockUpdate"
        @cancel="selectedBlock = null"
      />
      <!-- <AdvBuilderImageBlock
        v-if="!!selectedBlock && selectedBlock.type === 'image'"
        :block="selectedBlock"
        @submit="handleBlockUpdate"
        @cancel="selectedBlock = null"
      /> -->
      <div v-else>Select or add a block to edit.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProseBlockBuilder from '~/components/adv/builder/ProseBlock.vue'
import ImageBlockBuilder from '~/components/adv/builder/ImageBlock.vue'
import VideoBlockBuilder from '~/components/adv/builder/VideoBlock.vue'

const scene = ref({
  id: 'scene-1',
  title: 'Scene 1',
  contentBlocks: [
    {
      id: 'block-1',
      type: 'prose',
      label: 'Prose Block 1',
      html: 'This is the first prose block.',
    },
    {
      id: 'block-2',
      type: 'image',
      label: 'Image Block 1',
      imageSrc: '/path/to/image.jpg',
      position: 'float-right',
      caption: 'An example image',
    },
  ],
})

const selectedBlock = ref<any>(null)

function handleAddBlock(type: string) {
  const id = `block-${Date.now()}`
  let newBlock: any = { id, type }
  if (type === 'prose') newBlock = { ...newBlock, label: '', html: '' }
  if (type === 'image')
    newBlock = { ...newBlock, label: '', imageSrc: '', position: '', caption: '' }
  if (type === 'video') newBlock = { ...newBlock, label: '', src: '' }
  scene.value.contentBlocks.push(newBlock)
  selectedBlock.value = newBlock
}

function handleSelectBlock(block: any) {
  selectedBlock.value = block
}

function handleBlockUpdate(updatedBlock: any) {
  const idx = scene.value.contentBlocks.findIndex((b) => b.id === updatedBlock.id)
  if (idx !== -1) {
    scene.value.contentBlocks[idx] = { ...updatedBlock }
    selectedBlock.value = null
  }
}

const editorComponent = computed(() => {
  if (!selectedBlock.value) return null
  switch (selectedBlock.value.type) {
    case 'prose':
      return ProseBlockBuilder
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
