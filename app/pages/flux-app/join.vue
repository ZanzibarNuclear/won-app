<template>
  <UContainer>
    <h1>Join the Conversation</h1>
    <div v-if="step === 0">
      <FluxJoinIntro v-on:ready-to-continue="takeStep" />
    </div>
    <div v-if="step === 1">
      <FluxJoinForm class="my-10" @ready="takeStep" />
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
</script>

<style scoped></style>
