<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-3xl font-bold text-red-500">Oops! Something went wrong</h1>
    <p class="text-lg">
      It seems like you were trying to sign in with a magic link. Sadly, the
      magic is gone.
    </p>
    <p class="text-md">
      Please note that links are one-time use. Maybe you already used it. Also,
      links expire, so perhaps that link has gone stale.
    </p>
    <p class="text-md">
      No worries. We still like you. Why not try again with a fresh magic link?
    </p>
    <NuxtLink to="/sign-in" class="text-nuclear-400 mt-4 inline-block">Go back to Sign In</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
onMounted(() => {
  console.log("source of trouble:", useRoute().query.source);
});
</script>
