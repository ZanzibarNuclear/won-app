<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  sender: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
  message: z.string(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  sender: undefined,
  email: undefined,
  message: undefined,
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <div class="my-6">
    <UForm :schema="schema" :state="state" class="w-full space-y-4" @submit="onSubmit">
      <UFormField label="Your name" name="sender" size="lg" help="We will not share.">
        <UInput v-model="state.sender" class="w-full" />
      </UFormField>

      <UFormField label="Email" name="email" size="lg" help="Only if you want a response.">
        <UInput v-model="state.email" class="w-full" />
      </UFormField>

      <UFormField label="Message" name="message" size="lg">
        <UTextarea
          v-model="state.message"
          placeholder="What would you like to tell us?"
          class="w-full"
        />
      </UFormField>

      <UButton type="submit" icon="i-ph-envelope-duotone"> Send </UButton>
    </UForm>
  </div>
</template>
