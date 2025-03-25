<template>
  <UPage>
    <UPageSection
      :icon="content.icon"
      :title="content.title"
      :description="content.description"
      :features="features"
    >
      <template #leading>
        <UTooltip text="Zanzibar, Nuclear Hero">
          <NuxtImg src="/images/Zanzibar.jpg" sizes="250px" />
        </UTooltip>
      </template>
    </UPageSection>
  </UPage>
</template>

<script setup>
const content = reactive({
  title: "Zanzibar's World of Nuclear Energy",
  description:
    'Welcome! Our mission is bring the world up to speed on the incredible goodness of nuclear energy. We are glad you found us.',
  icon: 'i-ph-globe-duotone',
})

const features = computed(() => {
  return [
    {
      title: 'Adventure',
      description: 'Try this role-playing game where the fate of the world is in your hands.',
      icon: 'i-ph-star-duotone',
      to: '/nu-adventure',
    },
    {
      title: 'Flux',
      description: 'Join the conversation in our social app for nuclear enthusiasts.',
      icon: 'i-ph-lightning-duotone',
      to: '/flux-app',
    },
    {
      title: 'Lessons',
      description: 'Learn about nuclear energy and other brainy topics.',
      icon: 'i-ph-student-duotone',
      to: '/get-smarter',
    },
    {
      title: 'Essays',
      description:
        'Perspectives and news about anything related to the productive uses of nuclear.',
      icon: 'i-ph-newspaper',
      to: '/news-and-views',
    },
    {
      title: "Who's Who",
      description: 'Profiles of people who appreciate nuclear energy. Set up and share yours.',
      icon: 'i-ph-newspaper',
      to: '/profiles-in-nuclear',
    },
  ]
})
</script>

<style lang="scss" scoped></style>
