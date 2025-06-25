<template>
  <form @submit.prevent="submit">
    <label>
      Label:
      <input v-model="localBlock.label" />
    </label>
    <label>
      Image URL:
      <input v-model="localBlock.src" />
    </label>
    <button type="submit">Save</button>
    <button type="button" @click="$emit('cancel')">Cancel</button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{ block: any }>()
const emit = defineEmits(['submit', 'cancel'])
const localBlock = ref({ ...props.block })

watch(() => props.block, (newBlock) => {
  localBlock.value = { ...newBlock }
})

function submit() {
  emit('submit', { ...localBlock.value })
}
</script>