<template>
  <UCard>
    <template #header>
      <div class="text-xl text-pretty text-center font-semibold text-(--ui-text-highlighted)">
        Request a magic link
      </div>
      <div class="mt-1 text-base text-pretty text-(--ui-text-muted)">
        We can send a magic link to your inbox.
      </div>
    </template>

    <UForm :schema="schema" :state="state" class="space-y-2" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" class="w-full" />
      </UFormField>

      <UButton v-if="!readyToVerifyHuman" type="submit" label="Verify your humanity" />

      <div v-else class="flex flex-col items-center justify-center">
        <NuxtTurnstile v-model="state.token" />
        <div class="flex space-x-2">
          <UButton
            label="Request a magic link"
            icon="i-ph-check-duotone"
            @click="requestMagicLink"
            :disabled="!state.token"
          />
          <UButton
            label="Cancel"
            icon="i-ph-x-circle-duotone"
            color="warning"
            @click="
              () => {
                readyToVerifyHuman = false
              }
            "
            :disabled="!state.token"
          />
        </div>
      </div>
    </UForm>

    <template #footer>
      <div class="mt-6">
        Do you have
        <ULink to="/sign-in/faq" class="text-primary-500 font-medium"
          >questions about signing in</ULink
        >?
      </div>
      <div class="mt-6">
        By signing in, you agree to these
        <ULink
          to="https://nuclearambitions.com/legal/terms-of-use.html"
          class="text-primary-500 font-medium"
          >Terms of Service</ULink
        >.
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const fields = [
  {
    name: 'email',
    type: 'text' as const,
    label: 'Email',
    placeholder: 'Your email address',
  },
]

const schema = z.object({
  email: z.string().email('Invalid email'),
  token: z.string().optional(),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  token: undefined,
})

// const email = ref()
// const token = ref()
const readyToVerifyHuman = ref(false)

const toast = useToast()

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Need to check for bots')
  console.log('You say your email address is ' + payload.data.email + '. We shall see...')
  readyToVerifyHuman.value = true
}

async function requestMagicLink() {
  const response: any = await useWonAuth().loginWithMagicLink(
    state.email as string,
    state.token as string,
  )
  toast.add({
    title: response.status === 'success' ? 'Magic Link Sent' : 'Error Sending Magic Link',
    description: response.message,
  })
}

// const enableResend = () => {
//   magicForm.active = true
//   emailFeedback.done = false
// }
</script>
