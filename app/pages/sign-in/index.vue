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
    icon: 'i-simple-icons-github',
    onClick: () => signInWithOAuth('github'),
  },
]

const fields = [
  {
    name: 'email',
    type: 'text' as const,
    label: 'Email',
    placeholder: 'Enter your email',
  },
  {
    name: 'token',
    type: 'text' as const,
    label: 'Humans only',
    placeholder: 'Turnstile goes here',
  },
]

const schema = z.object({
  email: z.string().email('Invalid email'),
  token: z.string(),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('You say your email address is ' + payload.data.email + '. We shall see...')
  const response: any = await useWonAuth().loginWithMagicLink(
    payload.data.email,
    'Nuclear Fan',
    payload.data.token, // FIXME: use Turnstile somehow
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

<template>
  <UAuthForm
    :fields="fields"
    :schema="schema"
    :providers="providers"
    icon="i-ph-person"
    title="Who Goes There?"
    separator="Or Get a Magic Link"
    :submit="{ label: 'Send magic link' }"
    @submit="onSubmit"
  >
    <template #description> Identify yourself with your favorite service. </template>

    <template #footer>
      By signing in, you agree to these
      <ULink
        to="https://nuclearambitions.com/legal/terms-of-use.html"
        class="text-primary-500 font-medium"
        >Terms of Service</ULink
      >.
    </template>
  </UAuthForm>
</template>
