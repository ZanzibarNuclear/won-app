<script setup lang="ts">
const tracking = useWonTracking()

const features = [
  {
    title: 'Player',
    description: 'Enjoy one of our adventure games.',
    icon: 'i-ph-game-controller-duotone',
    to: '/nu-adventure/player',
  },
  {
    title: 'Builder',
    description: 'Create your own adventure game.',
    icon: 'i-ph-pencil-duotone',
    to: '/nu-adventure/builder',
  },
  {
    title: 'Feedback',
    description: 'Tell us about your experience, what you would like to see next.',
    icon: 'i-ph-chat-circle-duotone',
    to: '/nu-adventure/feedback',
  },
]
</script>

<template>
  <UPage>
    <UPageSection title="Save the World"
      description="Ready for adventure? Play one of our games. Or build your own (some day)." :features="features">
      <NuxtImg :src="cdnImage('adventure/flowing-river-home.jpg')" class="mx-auto" width="600px" />
    </UPageSection>
  </UPage>
</template>

<style scoped></style>
