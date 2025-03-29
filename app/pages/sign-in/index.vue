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
]

const email = ref()
const openBotChecker = ref()
const token = ref()

const schema = z.object({
  email: z.string().email('Invalid email'),
  token: z.string(),
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('You say your email address is ' + payload.data.email + '. We shall see...')
  email.value = payload.data.email
  openBotChecker.value = true
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
  <UModal v-model:open="openBotChecker" title="Humans only, please">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #content>
      <form>
        <NuxtTurnstile v-model="token" />
        <UButton label="Ready. Work some magic." @click="requestMagicLink" />
      </form>
      <Placeholder class="h-48 m-4" />
    </template>
  </UModal>
</template>
