<template>
  <div>
    <AuthIdentityProviders v-if="isOAuth" />
    <AuthMagicLinkNoBots v-if="isMagicLink" />

    <div class="text-center my-6 text-(--ui-text-muted)">
      <USeparator color="primary" class="my-6" />
      <div v-if="isOAuth">
        Don't want to use one of these identity providers? We can also send you a magic link.
      </div>
      <div v-else>You can also use an existing account with a popular service.</div>
      <UButton
        @click="toggle"
        :label="isOAuth ? 'Yes, use a Magic Link' : 'Use An Identity Provider'"
        class="my-4"
        color="neutral"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  title: 'Sign in to your World of Nuclear account',
  description: 'Prove your identity using another service or a magic link.',
})

type modeType = 'oauth' | 'magiclink'

const mode: Ref<modeType> = ref('oauth')

const isOAuth = computed(() => mode.value == 'oauth')
const isMagicLink = computed(() => mode.value == 'magiclink')

const toggle = () => {
  if (isOAuth.value) {
    mode.value = 'magiclink'
  } else {
    mode.value = 'oauth'
  }
}
</script>
