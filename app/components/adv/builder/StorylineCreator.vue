<template>
  <div class="border-2 border-gray-300 mb-8 p-4 rounded-lg">
    <h3>Create New Storyline</h3>
    <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-4">
      <UFormField name="title" label="Storyline Title" hint="Make it compelling.">
        <UInput v-model="state.title" class="w-full" required />
      </UFormField>
      <UFormField name="description" label="Description" hint="Give players a reason to jump in.">
        <UInput v-model="state.description" class="w-full" required />
      </UFormField>
      <UFormField name="coverArt" label="Cover Art" hint="People do judge a book by its cover.">
        <UInput v-model="state.coverArt" class="w-full" required />
      </UFormField>
      <div class="flex gap-2 mt-4">
        <UButton type="submit">Create Storyline</UButton>
        <UButton @click="onCancel" color="warning">Cancel</UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const emit = defineEmits(['submit', 'cancel'])

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  coverArt: z.string(),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: '',
  description: '',
  coverArt: '',
})

const onCancel = () => {
  emit('cancel')
}

const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
  emit('submit', event.data)
}
</script>