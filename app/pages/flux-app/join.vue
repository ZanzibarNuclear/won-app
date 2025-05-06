<template>
  <UContainer>
    <h1>Join the Conversation</h1>
    <div v-if="step === 0">
      <div v-if="!userStore.isSignedIn">
        <h3>Sign in First</h3>
        <div>
          To use Flux, you must be signed in. If you need an account, we will create one for you as
          you sign in.
        </div>
        <UButton @click="goToSignIn" label="Sign In" class="mt-4" />
      </div>
      <FluxJoinIntro v-else v-on:ready-to-continue="takeStep" />
    </div>
    <div v-if="step === 1">
      <FluxJoinForm class="my-10" @ready="takeStep" />
    </div>
    <div v-if="step === 2">
      <h2>All set!</h2>
      <div class="space-y-6">
        <div>Just a few tips to enjoy your experience.</div>
        <div>Have fun! Life is short. Try to enjoy the time you have.</div>
        <div>
          Your contributions make all the difference. Unlike other social platforms, the World of
          Nuclear is focused. You voice will be heard. The best ideas will surface again and again.
        </div>
        <div>Alright, that's enough talk about Flux. Start fluxing!</div>
        <UButton to="/flux-app" label="Go Flux" block />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { FluxUser } from '~/types/won-types'
const userStore = useUserStore()
const step = ref(0)

// TODO: decide whether to keep this or onMounted
async function fetchProfile() {
  try {
    const { data } = await useAsyncData('fluxUser', () => useMemberService().getFluxUser())
    userStore.setFluxUser(data.value as FluxUser)
  } catch (error) {
    console.error('Error fetching profile:', error)
  }
}
fetchProfile()

onMounted(async () => {
  console.log('Check if already using Flux')
  if (userStore.isSignedIn && !userStore.isFluxUserLoaded) {
    const fluxUser = await useMemberService().getFluxUser()
    if (fluxUser) {
      userStore.setFluxUser(fluxUser)
    }
  }
  console.log('Check if already using Flux')

  if (userStore.isFluxUserLoaded) {
    step.value = 2
  }
})

const goToSignIn = () => {
  useWonContext().setReturnRoute('/flux-app/join')
  navigateTo('/sign-in')
}

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
