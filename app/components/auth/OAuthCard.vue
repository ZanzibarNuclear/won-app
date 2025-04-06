<template>
  <UCard>
    <template #header>
      <div class="text-lg font-bold pb-4">Use an existing account</div>
      <div class="text-sm">
        You may be asked to authorize
        <span class="font-bold italic">Zanzibar's World of Nuclear Energy</span>. Say "yes" to join.
      </div>
    </template>
    <div class="space-x-2 space-y-2 text-center">
      <UButton
        icon="i-ph-google-logo-duotone"
        size="lg"
        variant="outline"
        label="Google"
        class="hover:bg-nuclear-100"
        @click="signIn('google')"
      />
      <UButton
        icon="i-ph-discord-logo-duotone"
        size="lg"
        variant="outline"
        label="Discord"
        class="hover:bg-nuclear-100"
        @click="signIn('discord')"
      />
      <UButton
        icon="i-ph-meta-logo-duotone"
        size="lg"
        variant="outline"
        label="Meta"
        class="hover:bg-nuclear-100"
        @click="signIn('meta')"
      />
      <UButton
        icon="i-ph-github-logo-duotone"
        size="lg"
        variant="outline"
        label="GitHub"
        class="hover:bg-nuclear-100"
        @click="signIn('github')"
      />
      <UButton
        icon="i-ph-x-logo-duotone"
        size="lg"
        variant="outline"
        label="X"
        class="hover:bg-nuclear-100"
        @click="signIn('x')"
      />
      <UButton
        icon="i-ph-apple-logo-duotone"
        size="lg"
        variant="outline"
        label="Apple"
        class="hover:bg-nuclear-100"
        @click="signIn('apple')"
      />
    </div>
  </UCard>
</template>

<script setup lang="ts">
const emit = defineEmits(['finish'])

async function signIn(provider: string) {
  if (provider === 'x') {
    alert('X is not supported yet. Please try another identity provider.')
    return
  } else if (provider === 'apple') {
    alert('Apple is not supported yet. Please try another identity provider.')
    return
  }
  useWonAuth().loginWithOAuth(provider)
  emit('finish')
}
</script>

<style lang="scss" scoped></style>
