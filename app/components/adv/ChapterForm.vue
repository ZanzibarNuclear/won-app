<template>
  <h3>{{ isNew ? 'Add Chapter' : 'Edit Chapter' }}</h3>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField name="title" label="Title" hint="Helps the player navigate the storyline.">
      <UInput v-model="state.title" class="w-full" required />
    </UFormField>
    <UFormField name="description" label="Description" hint="For the author, not the player.">
      <UInput v-model="state.description" class="w-full" required />
    </UFormField>
    <UFormField name="order" label="Sequence" hint="For sorting.">
      <UInput v-model="state.order" type="number" class="w-full" required />
    </UFormField>
    <UFormField name="openingScene" label="Opening Scene" hint="Where the chapter starts">
      <USelect :items="sceneItems" v-model="state.openingSceneId" />
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

const props = defineProps<{
  chapter: Chapter
  isNew: boolean
}>()
const emit = defineEmits(['submit', 'cancel'])

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  order: z.number().optional(),
  openingSceneId: z.string().optional(),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: props.chapter?.title || '',
  description: props.chapter?.description || '',
  order: props.chapter?.order || 0,
  openingSceneId: props.chapter?.openingSceneId || '.',
})

const sceneItems = computed(() => {
  const options =
    props.chapter?.scenes.map((scene) => ({
      value: scene._id!,
      label: scene.title,
    })) || []
  const items = [{ value: '.', label: '--Choose a scene--' }, ...options]
  return items
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
  if (state.openingSceneId === '.') {
    delete event.data.openingSceneId
  }
  emit('submit', { ...props.chapter, ...event.data })
}
</script>
