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

const toast = useToast()

const providers = [
  {
    label: 'Google',
    icon: 'i-ph-google-logo-duotone',
    onClick: () => signInWithOAuth('google'),
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
  // {
  //   label: 'Spotify',
  //   icon: 'i-ph-spotify-logo-duotone',
  //   onClick: () => signInWithOAuth('spotify'),
  // },
  // {
  //   label: 'X',
  //   icon: 'i-ph-x-logo-duotone',
  //   onClick: () => notImplemented('X'),
  // },
  // {
  //   label: 'Apple',
  //   icon: 'i-ph-x-logo-duotone',
  //   onClick: () => notImplemented('Apple'),
  // },
]

const signInWithOAuth = async (provider: SupportedOAuthProviders) => {
  useWonAuth().findIdentity(provider)
}

const notImplemented = (provider: string) => {
  toast.add({
    title: 'Unavailable',
    description: `Sorry, we are still working on sign in using ${provider}.`,
  })
}
</script>

<style lang="scss" scoped></style>
