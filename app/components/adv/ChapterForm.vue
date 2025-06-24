<template>
  <h3>{{ item.isNew ? 'Add Chapter' : 'Edit Chapter' }}</h3>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField name="title" label="Title">
      <UInput v-model="state.title" required />
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

const props = defineProps<{ item: any }>()
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
  emit('submit', event.data)
}
</script>
