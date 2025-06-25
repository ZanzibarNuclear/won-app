<template>
  <div>
    <h2>Scene Content</h2>
    <div class="space-y-2">
      <UButton @click="$emit('add-block', 'prose')" icon="i-ph-plus-square-duotone" block
        >Add Passage</UButton
      >
      <UButton @click="$emit('add-block', 'image')" icon="i-ph-plus-square-duotone" block
        >Add Image</UButton
      >
      <UButton @click="$emit('add-block', 'video')" icon="i-ph-plus-square-duotone" block
        >Add Video</UButton
      >
    </div>
    <ul class="mt-4">
      <li v-for="block in blocks" :key="block.id">
        <div :class="{ selected: selected?.id === block.id }" @click="$emit('select', block)">
          <UIcon :name="typeIcon(block.type)" class="mr-2" />
          <span class="text-sm">{{ block.label || block.type }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  blocks: Array<any>
  selected: any
}>()

const typeIcon = (type) => {
  switch (type) {
    case 'passage':
      return 'i-ph-text-align-left-duotone'
    case 'image':
      return 'i-ph-image-duotone'
    case 'video':
      return 'i-ph-film-reel-duotone'
    default:
      return 'i-ph-question-mark-duotone'
  }
  return
}
</script>

<style scoped>
.selected {
  font-weight: bold;
  color: #1976d2;
}
ul {
  list-style: none;
  padding-left: 1em;
}
</style>
