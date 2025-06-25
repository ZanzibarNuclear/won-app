<template>
  <div>
    <h2>Scene Content</h2>
    <div class="space-y-2">
      <UButton @click="$emit('add-block', 'prose')" block>+ Add Prose</UButton>
      <UButton @click="$emit('add-block', 'image')" block>+ Add Image</UButton>
      <UButton @click="$emit('add-block', 'video')" block>+ Add Video</UButton>
    </div>
    <ul class="mt-4">
      <li v-for="block in blocks" :key="block.id">
        <div :class="{ selected: selected?.id === block.id }" @click="$emit('select', block)">
          {{ block.label || block.type }}
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
