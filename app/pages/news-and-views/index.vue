<template>
  <UContainer>
    <UPage title="News and Views">
      <UPageHero
        title="News and Views"
        description="Find out what's going on with nuclear energy. Consider perspectives on the amazing future that nuclear unlocks."
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
    label: 'Headlines',
    to: '/news-and-views/blog-headlines',
    icon: 'i-ph-test-tube-duotone',
  },
  {
    label: 'Jump right in',
    to: '/news-and-views/trust-issues',
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
