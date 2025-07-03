<template>
  <h3>{{ !transition ? 'Add Transition' : 'Edit Transition' }}</h3>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField name="fromSceneId" label="To scene" hint="Points to a possible next scene">
      <USelect v-model="state.toSceneId" :items="sceneItems" class="w-full" required />
    </UFormField>
    <UFormField name="label" label="Label" hint="For your reference">
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
  fromSceneId: string
  sceneItems: Array<{ value: string; label: string }>
  transition: Transition | null
}>()
const emit = defineEmits(['submit', 'cancel'])

const schema = z.object({
  toSceneId: z.string(),
  label: z.string(),
  prompt: z.string(),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  toSceneId: props.transition?.toSceneId || '',
  label: props.transition?.label || '',
  prompt: props.transition?.prompt || '',
})

const isNew = computed(() => {
  return !props.transition
})

onMounted(() => {
  if (props.transition) {
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
