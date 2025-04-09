<template>
  <div>
    <div class="flex flex-col text-center">
      <div class="mb-2">
        <UIcon name="i-ph-person-duotone" class="size-8 shrink-0" />
      </div>
      <div class="text-xl text-pretty text-center font-semibold text-(--ui-text-highlighted)">
        Request a magic link
      </div>
      <div class="mt-1 text-base text-pretty text-(--ui-text-muted)">
        We can send a magic link to your inbox.
      </div>
    </div>

    <UForm :schema="schema" :state="state" class="mt-6 space-y-2" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" class="w-full" />
      </UFormField>

      <UButton v-if="!readyToVerifyHuman" type="submit" label="Verify your humanity" block />

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

    <div class="text-sm text-center text-(--ui-text-muted) mt-2">
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast()

const schema = z.object({
  email: z.string().email('Invalid email'),
  token: z.string().optional(),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  token: undefined,
})

const readyToVerifyHuman = ref(false)

function onSubmit(payload: FormSubmitEvent<Schema>) {
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
