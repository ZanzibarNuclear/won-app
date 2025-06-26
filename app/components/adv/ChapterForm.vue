<template>
  <h3>{{ chapter.isNew ? 'Add Chapter' : 'Edit Chapter' }}</h3>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField name="title" label="Title" hint="Helps the player navigate the storyline.">
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
import type { Chapter } from '~/types/adventure-types'

const props = defineProps<{ chapter: Chapter }>()
const emit = defineEmits(['submit', 'cancel'])

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: props.chapter?.title || '',
})

onMounted(() => {
  if (props.chapter) {
    state.title = props.chapter.title || ''
  }
})

watch(
  () => props.chapter,
  (newChapter) => {
    if (newChapter) {
      state.title = newChapter.title || ''
    }
  },
  { immediate: true },
)

const onCancel = () => {
  emit('cancel')
}
const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
  emit('submit', { ...props.chapter, ...event.data })
}
</script>
