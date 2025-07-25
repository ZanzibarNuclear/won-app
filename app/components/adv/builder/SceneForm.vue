<template>
  <h3>{{ isNew ? 'Add Scene' : 'Edit Scene' }}</h3>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField name="title" label="Title" hint="For reference. Not revealed to players.">
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
import type { Scene } from '~/types/adventure-types'

const props = defineProps<{ item: Scene; isNew: boolean }>()
const emit = defineEmits(['submit', 'cancel'])

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: props.item?.title || '',
})

onMounted(() => {
  if (props.item) {
    state.title = props.item.title || ''
  }
})

const onCancel = () => {
  emit('cancel')
}
const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
  emit('submit', { ...props.item, ...event.data })
}
</script>
