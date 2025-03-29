<template>
  <div>
    <UAuthForm
      :fields="fields"
      :schema="schema"
      :providers="providers"
      icon="i-ph-person-duotone"
      title="Who goes there?"
      separator="Or Get a Magic Link"
      :disabled="verifyHuman"
      :submit="{ label: 'Send magic link' }"
      @submit="onSubmit"
    >
      <template #description> Identify yourself with your favorite service. </template>

      <template #footer>
        <div v-if="verifyHuman" title="Humans only, please" class="mt-6">
          <form class="flex flex-col items-center justify-center">
            <NuxtTurnstile v-model="token" />
            <UButton label="Ready. Work some magic." @click="requestMagicLink" :disabled="!token" />
          </form>
        </div>
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
    </UAuthForm>
  </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { SupportedOAuthProviders } from '~/types/won-types'

definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  title: 'World of Nuclear - Sign in',
  description: 'Identify yourself using OAuth, or get a Magic Link.',
})

const toast = useToast()

const providers = [
  {
    label: 'Google',
    icon: 'i-ph-google-logo-duotone',
    onClick: () => useWonAuth().loginWithOAuth('google'),
  },
  {
    label: 'X',
    icon: 'i-ph-x-logo-duotone',
    onClick: () => signInWithOAuth('x'),
    disabled: true,
  },
  {
    label: 'Discord',
    icon: 'i-ph-discord-logo-duotone',
    onClick: () => signInWithOAuth('discord'),
  },
  {
    label: 'Meta',
    icon: 'i-ph-meta-logo-duotone',
    onClick: () => signInWithOAuth('meta'),
    disabled: true,
  },
  {
    label: 'GitHub',
    icon: 'i-ph-github-logo-duotone',
    onClick: () => signInWithOAuth('github'),
  },
]

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
})

type Schema = z.output<typeof schema>

const email = ref()
const token = ref()
const verifyHuman = ref(false)

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Need to check for bots')
  console.log('You say your email address is ' + payload.data.email + '. We shall see...')
  email.value = payload.data.email
  verifyHuman.value = true
}

async function requestMagicLink() {
  const response: any = await useWonAuth().loginWithMagicLink(
    email.value,
    'Nuclear Fan',
    token.value,
  )
  toast.add({
    title: response.status === 'success' ? 'Magic Link Sent' : 'Error Sending Magic Link',
    description: response.message,
  })
}

async function signInWithOAuth(provider: SupportedOAuthProviders) {
  useWonAuth().loginWithOAuth(provider)
}
</script>
