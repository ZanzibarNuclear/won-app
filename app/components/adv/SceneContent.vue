<template>
  <div>
    <h2>Scene Content</h2>
    <div class="space-y-2 space-x-1">
      New:
      <UTooltip text="Add a passage">
        <UButton @click="$emit('add-block', 'passage')" :icon="typeIcon('passage')" size="sm" />
      </UTooltip>
      <UTooltip text="Add an image">
        <UButton @click="$emit('add-block', 'image')" :icon="typeIcon('image')" size="sm" />
      </UTooltip>
      <UTooltip text="Add a video">
        <UButton @click="$emit('add-block', 'video')" :icon="typeIcon('video')" size="sm" />
      </UTooltip>
      <UTooltip text="Re-order">
        <UButton @click="$emit('reorg')" icon="i-ph-arrows-down-up-duotone" size="sm" />
      </UTooltip>
    </div>
    <ul class="mt-4">
      <li v-for="block in blocks" :key="block.id" class="my-1">
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
defineEmits<{
  (e: 'add-block', type: string): void
  (e: 'select', block: any): void
  (e: 'reorg'): void
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
