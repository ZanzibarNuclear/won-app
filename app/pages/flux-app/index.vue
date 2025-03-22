<script setup lang="ts">
const links = ref([
  {
    label: "See Prototype",
    to: "/flux-app/prototype",
    icon: "i-ph-test-tube-duotone",
  },
]);
</script>

<template>
  <UPage>
    <UPageHero
      title="Flux"
      description="Join the conversation with other nuclear enthusiasts, curious, and skeptic."
      :links="links"
    >
      <NuxtImg src="/images/flux-theme-v1.jpg" alt="Flux logo" />
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
