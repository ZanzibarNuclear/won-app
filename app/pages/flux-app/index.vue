<script setup lang="ts">
const links = ref([
  {
    label: 'Join',
    to: '/flux-app/join',
    icon: 'i-ph-user-plus-duotone',
  },
  {
    label: 'See Prototype',
    to: '/flux-app/prototype',
    icon: 'i-ph-test-tube-duotone',
  },
])
</script>

<template>
  <UPage>
    <UPageHero
      title="Flux"
      description="Join the conversation with other nuclear enthusiasts. Open-minded skeptics are welcome."
      :links="links"
    >
      <UPageCard variant="subtle">
        <div
          class="relative overflow-hidden rounded-(--ui-radius) border border-dashed border-(--ui-border-accented) opacity-75 px-4 flex items-center justify-center aspect-video"
        >
          <NuxtImg src="/images/flux-theme-v1.jpg" alt="Flux logo" class="mx-auto" width="700px" />
        </div>
      </UPageCard>
    </UPageHero>
  </UPage>
</template>

<style scoped>
a {
  color: var(--color-blue-400);
  text-decoration: underline;
}
a:hover {
  color: navy;
  background-color: lightyellow;
  text-decoration: underline;
}
</style>
