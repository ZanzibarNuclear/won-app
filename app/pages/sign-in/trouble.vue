<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-3xl font-bold text-red-500">Oops! Something went wrong</h1>
    <p>It seems like you were trying to sign in with a magic link. Sadly, the magic is gone.</p>
    <p v-if="isSignedIn">
      But hey, you are already signed in. Why not
      <ULink to="/won-guide" class="text-cherenkov hover:bg-graphite hover:text-cherenkov"
        >find something interesting to do</ULink
      >.
    </p>
    <p>
      Please note that links are one-time use. Maybe you already used it. Also, links expire, so
      perhaps that link had gone stale.
    </p>
    <p v-if="!isSignedIn" class="text-md">
      No worries. We still like you.
      <ULink to="/sign-in" class="text-cherenkov hover:bg-graphite hover:text-cherenkov"
        >Why not try again with a fresh magic link?</ULink
      >
    </p>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})

const isSignedIn = computed(() => {
  return useUserStore().isSignedIn
})

onMounted(() => {
  console.log('source of trouble:', useRoute().query.source)
})
</script>
