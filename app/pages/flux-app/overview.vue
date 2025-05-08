<script setup lang="ts">
const links = ref([
  {
    label: 'Join',
    to: '/flux-app/join',
    icon: 'i-ph-user-plus-duotone',
  },
])
</script>

<template>
  <UPage>
    <UPageHero
      title="Flux"
      description="Join the conversation with other nuclear enthusiasts."
      :links="links"
    >
      <UPageCard variant="subtle">
        <div
          class="relative overflow-hidden rounded-(--ui-radius) border border-dashed border-(--ui-border-accented) opacity-75 px-4 flex items-center justify-center aspect-video"
        >
          <NuxtImg
            :src="cdnImage('blog/flux-earth.jpg')"
            alt="Everyone connected by Flux"
            class="my-auto"
          />
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
