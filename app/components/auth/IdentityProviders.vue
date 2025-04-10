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
          external
          target="_blank"
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
    label: 'Discord',
    icon: 'i-ph-discord-logo-duotone',
    onClick: () => signInWithOAuth('discord'),
  },
  {
    label: 'GitHub',
    icon: 'i-ph-github-logo-duotone',
    onClick: () => signInWithOAuth('github'),
  },
  {
    label: 'Facebook',
    icon: 'i-ph-facebook-logo-duotone',
    onClick: () => notImplemented('Facebook'),
  },
  {
    label: 'X',
    icon: 'i-ph-x-logo-duotone',
    onClick: () => notImplemented('X'),
  },
]

const signInWithOAuth = async (provider: SupportedOAuthProviders) => {
  useWonAuth().findIdentity(provider)
}

const notImplemented = (provider: string) => {
  alert('We are still setting up sign in with ' + provider + '. Please try another option.')
}
</script>

<style lang="scss" scoped></style>
