<template>
  <div class="h-screen flex items-center justify-center overlay">
    <div>
      <NuxtImg src="/images/logo-full-cherenkov-clear.png" class="absolute top-4 left-1/4" />
      <UButton
        icon="i-ph-arrow-bend-up-left-duotone"
        to="/won-guide"
        size="xl"
        color="neutral"
        variant="subtle"
        class="absolute left-6 top-22 rounded-full"
      />
    </div>
    <UPageCard variant="subtle" class="max-w-sm w-full">
      <slot />
    </UPageCard>
  </div>
</template>
