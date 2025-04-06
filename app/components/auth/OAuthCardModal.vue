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
        @click="signIn('google')"
      />
      <UButton
        icon="i-ph-discord-logo-duotone"
        size="lg"
        variant="outline"
        label="Discord"
        @click="signIn('discord')"
      />
      <UButton
        icon="i-ph-meta-logo-duotone"
        size="lg"
        variant="outline"
        label="Meta"
        @click="signIn('meta')"
      />
      <UButton
        icon="i-ph-github-logo-duotone"
        size="lg"
        variant="outline"
        label="GitHub"
        @click="signIn('github')"
      />
      <UButton
        icon="i-ph-x-logo-duotone"
        size="lg"
        variant="outline"
        label="X"
        @click="signIn('x')"
      />
      <UButton
        icon="i-ph-apple-logo-duotone"
        size="lg"
        variant="outline"
        label="Apple"
        @click="signIn('apple')"
      />
    </div>
  </UCard>

  <!-- OAuth Modal -->
  <UModal v-model="isModalOpen" :prevent-close="isAuthInProgress">
    <UCard>
      <template #header>
        <div class="text-lg font-bold">Sign in with {{ currentProvider }}</div>
      </template>
      <div class="h-96 w-full">
        <iframe v-if="authUrl" :src="authUrl" class="w-full h-full border-0"></iframe>
        <div v-else class="flex items-center justify-center h-full">
          <UIcon name="i-ph-spinner-gap-duotone" class="animate-spin text-4xl" />
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
const emit = defineEmits(['finish'])

const isModalOpen = ref(false)
const isAuthInProgress = ref(false)
const currentProvider = ref('')
const authUrl = ref('')

// Listen for messages from the iframe
onMounted(() => {
  window.addEventListener('message', handleOAuthCallback)
})

onUnmounted(() => {
  window.removeEventListener('message', handleOAuthCallback)
})

function handleOAuthCallback(event: MessageEvent) {
  // Verify the origin of the message
  if (event.origin !== 'https://api.worldofnuclear.com') return

  // Handle the auth result
  if (event.data.success) {
    // Auth was successful
    isAuthInProgress.value = false
    isModalOpen.value = false
    emit('finish')
  } else {
    // Auth failed
    isAuthInProgress.value = false
    // Optionally show an error message
  }
}

async function signIn(provider: string) {
  if (provider === 'x') {
    alert('X is not supported yet. Please try another identity provider.')
    return
  } else if (provider === 'apple') {
    alert('Apple is not supported yet. Please try another identity provider.')
    return
  }

  currentProvider.value = provider.charAt(0).toUpperCase() + provider.slice(1)
  isModalOpen.value = true
  isAuthInProgress.value = true

  try {
    // Get the auth URL from your API
    const { data } = await useFetch(
      `${useRuntimeConfig().public.wonServiceUrl}/login/${provider}`,
      {
        method: 'POST',
        body: {
          redirectMode: 'iframe',
          origin: window.location.origin,
        },
      },
    )

    if ((data.value as { authUrl?: string }).authUrl) {
      authUrl.value = (data.value as { authUrl: string }).authUrl
    } else {
      throw new Error('Failed to get auth URL')
    }
  } catch (error) {
    console.error('Failed to initialize OAuth flow:', error)
    isModalOpen.value = false
    isAuthInProgress.value = false
  }
}
</script>

<style lang="scss" scoped></style>
