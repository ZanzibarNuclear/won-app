<template>
  <UAuthForm :providers="providers" icon="i-ph-person-duotone" title="Who goes there?">
    <template #description> Identify yourself with your favorite service. </template>

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
  </UAuthForm>
</template>

<script setup lang="ts">
import type { SupportedOAuthProviders } from '~/types/won-types'

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

async function signInWithOAuth(provider: SupportedOAuthProviders) {
  useWonAuth().loginWithOAuth(provider)
}
</script>

<style lang="scss" scoped></style>
