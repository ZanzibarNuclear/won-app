<template>
  <UContainer>
    <h1>Join the Conversation</h1>
    <div v-if="step === 0">
      <FluxJoinIntro v-on:ready-to-continue="takeStep" />
    </div>
    <div v-if="step === 1">
      <div v-if="userStore.isSignedIn">
        <h2>Sign up for Flux</h2>
        <FluxJoinForm class="my-10" @ready="takeStep" />
      </div>
      <div v-else>
        <h2>Sign in</h2>
        First you need to sign in. If needed, you can join as you sign in. We will set up your free
        account.
        <UButton @click="goToSignIn" label="Sign in to the World of Nuclear" block />
      </div>
    </div>
    <div v-if="step === 2">
      <h2>All set!</h2>
      <div>Just a few tips to enjoy your experience.</div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const step = ref(0)

const takeStep = () => {
  if (canStep) {
    step.value++
  }
}
const canStep = computed(() => {
  return step.value < 2
})

const goToSignIn = () => {
  useWonContext().setReturnRoute('/flux-app/join')
  navigateTo('/sign-in')
}
</script>

<style scoped>
a {
  text-decoration: underline;
}
</style>
