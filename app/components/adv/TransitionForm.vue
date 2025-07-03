<template>
  <h3>{{ !transition ? 'Add Transition' : 'Edit Transition' }}</h3>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField name="toSceneId" label="Title" hint="Helps the player navigate the storyline.">
      <USelect v-model="state.toSceneId" :items="sceneItems" class="w-full" required />
    </UFormField>
    <UFormField name="label" label="Label" hint="For reference.">
      <UInput v-model="state.label" class="w-full" required />
    </UFormField>
    <UFormField
      name="prompt"
      label="Prompt"
      hint="What the player sees when deciding on the next step."
    >
      <UInput v-model="state.prompt" class="w-full" required />
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
import type { Chapter, Scene, Transition } from '~/types/adventure-types'

const props = defineProps<{
  chapter: Chapter
  fromScene: Scene
  transition: Transition
}>()
const emit = defineEmits(['submit', 'cancel'])

const schema = z.object({
  toSceneId: z.string().min(1, 'Title is required'),
  label: z.string(),
  prompt: z.string(),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  toSceneId: props.transition?.toSceneId || '',
  label: props.transition?.label || '',
  prompt: props.transition?.prompt || '',
})

const sceneItems = computed(() => {
  if (!props.chapter?.scenes) return []
  return props.chapter.scenes
    .filter((scene) => scene._id !== props.fromScene._id)
    .map((scene) => ({
      label: scene.title,
      value: scene._id,
    }))
})

onMounted(() => {
  if (props.chapter) {
    state.toSceneId = props.transition.toSceneId || ''
    state.label = props.transition.label || ''
    state.prompt = props.transition.prompt || ''
  }
})

watch(
  () => props.transition,
  (newTransition) => {
    if (newTransition) {
      state.toSceneId = newTransition.toSceneId || ''
      state.label = newTransition.label || ''
      state.prompt = newTransition.prompt || ''
    }
  },
  { immediate: true },
)

const onCancel = () => {
  emit('cancel')
}
const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
  let update: Transition
  if (props.transition) {
    update = { ...props.transition, ...event.data }
  } else {
    update = event.data as Transition
  }
  emit('submit', update)
}
</script>
