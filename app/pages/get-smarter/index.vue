<template>
  <UContainer>
    <UPage title="Lessons">
      <UPageHero
        title="Get Smarter"
        description="Try these micro-lessons about nuclear energy. Each one should only take 5 to 10 minutes to read though. The more you study, the better you will understand nuclear energy. So, what are you waiting for?"
        :links="links"
      >
        <ImagePlaceholder />
      </UPageHero>
    </UPage>
  </UContainer>
</template>

<script setup lang="ts">
const links = ref([
  {
    label: 'Browse catalog',
    to: '/get-smarter/lesson-catalog',
    icon: 'i-ph-test-tube-duotone',
  },
  {
    label: 'Jump right in',
    to: '/get-smarter/',
    icon: 'i-ph-note-pencil-duotone',
  },
])
</script>

<style lang="scss" scoped>
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
