<script setup lang="ts">
const route = useRoute()

const items = computed(() => [
  {
    label: 'Adventure',
    to: '/nu-adventure',
  },
  {
    label: 'Flux',
    to: '/flux-app',
  },
  {
    label: 'Lessons',
    to: '/get-smarter',
    active: route.path.startsWith('/get-smarter'),
  },
  {
    label: 'Blog',
    to: '/news-and-views',
    active: route.path.startsWith('/news-and-views'),
  },
  {
    label: 'Guide',
    to: '/won-guide',
    active: route.path.startsWith('/won-guide'),
  },
])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtImg src="/images/logo-full-cherenkov-clear.png" />
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UColorModeButton />
      <UButton label="Sign in" color="neutral" variant="ghost" to="/sign-in" />
      <UButton
        label="Sign up"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        class="hidden lg:flex"
        to="/sign-in"
      />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />

      <USeparator class="my-6" />

      <UButton label="Sign in" color="neutral" variant="subtle" to="/sign-in" block class="mb-3" />
      <UButton label="Sign up" color="neutral" to="/sign-in" block />
    </template>
  </UHeader>
</template>
