<template>
  <h3>{{ isNew ? 'Add Storyline' : 'Edit Storyline' }}</h3>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField
      name="title"
      label="Storyline Title"
      hint="Give your storyline a clear, descriptive title."
    >
      <UInput v-model="state.title" class="w-full" required />
    </UFormField>
    <div class="flex gap-2 mt-4">
      <UButton type="submit">Save</UButton>
      <UButton @click="onCancel" color="warning">Cancel</UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps<{ storyline: any; isNew: boolean }>()
const emit = defineEmits(['submit', 'cancel'])

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  coverArt: z.string(),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: props.storyline?.title || '',
  description: props.storyline?.description || '',
  coverArt: props.storyline.coverArt || '',
})

onMounted(() => {
  if (props.storyline) {
    state.title = props.storyline.title || ''
    state.description = props.storyline.description || ''
    state.coverArt = props.storyline.coverArt || ''
  }
})

watch(
  () => props.storyline,
  (newStoryline) => {
    if (newStoryline) {
      state.title = newStoryline.title || ''
      state.description = newStoryline.description || ''
      state.coverArt = newStoryline.coverArt || ''
    }
  },
  { immediate: true },
)

const onCancel = () => {
  emit('cancel')
}
const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
  emit('submit', { ...props.storyline, ...event.data })
}
</script>
