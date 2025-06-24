<template>
  <form @submit.prevent="submit">
    <h3>{{ item.isNew ? 'Add Scene' : 'Edit Scene' }}</h3>
    <label>
      Title:
      <input v-model="title" required />
    </label>
    <button type="submit">Save</button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{ item: any }>()
const emit = defineEmits(['submit'])

const title = ref(props.item?.title || '')

watch(
  () => props.item,
  (val) => {
    title.value = val?.title || ''
  },
)

function submit() {
  emit('submit', { ...props.item, title: title.value })
}
</script>
