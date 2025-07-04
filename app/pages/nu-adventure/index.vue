<script setup lang="ts">
const tracking = useWonTracking()
const showInterest = () => {
  useWonTracking().logInterest('adventure')
  navigateTo('https://hero.worldofnuclear.com', { external: true })
}

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
    <UPageHero title="Save the World"
      description="Can you save humanity? Play this exciting role-playing, simulation game, and see how you do.">
      <NuxtImg :src="cdnImage('adventure/flowing-river-home.jpg')" class="mx-auto" width="600px" />
      <UButton @click="showInterest" color="info" label="Tell Me More" block />
    </UPageHero>
    <UPageSection title="Features" :features="features" />
  </UPage>
</template>

<style scoped></style>
