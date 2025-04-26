<template>
  <div>
    <h1>Join the Conversation</h1>
    <h2>Flux Guidelines</h2>
    <div>
      Flux is where we can talk about nuclear energy and all related things. To be a productive
      fluxer, keep a few guidelines in mind.
    </div>
    <dl class="rules-list">
      <dt>Be kind.</dt>
      <dd>
        You don't have to walk on eggshells or be artificially sweet. Avoid tearing people's heads
        off or making personal attacks.
      </dd>
      <dt>Keep it clean.</dt>
      <dd>
        Imagine that curious children are reading and seeing what you post. You might limit the
        amount of cursing, and avoid salacious topics and imagery.
      </dd>
      <dt>Stay legal.</dt>
      <dd>
        You don't need to check with your lawyer to use Flux. At the same time, only post
        information that is openly available or to which you have the rights. Avoid information that
        could lead to serious mischief.
      </dd>
    </dl>
    <div>
      In addition to these guidelines, just a friendly reminder that all World of Nuclear members
      have agreed to our
      <NuxtLink
        class="hover:bg-gray-200 hover:dark:bg-gray-500"
        external
        to="https://nuclearambitions.com/legal/terms-of-use"
        >Terms of Use</NuxtLink
      >. Follow the link to review these. What you find will amaze you (or put you to sleep).
    </div>
    <h2>Ready to start fluxing?</h2>
    <div v-if="userStore.isSignedIn">
      Claim your handle, and confirm that you understand the rules. Then you'll be ready to flux.
    </div>
    <div v-else>
      First you need to sign in. If needed, you can join as you sign in. We will set up your free
      account.
      <UButton @click="goToSignIn" label="Sign in to the World of Nuclear" block />
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()

const goToSignIn = () => {
  useWonContext().setReturnRoute('/flux-app/join')
  navigateTo('/sign-in')
}
</script>

<style scoped>
a {
  text-decoration: underline;
}
.rules-list {
  margin: 1rem 2rem;
  padding: 0;
}

.rules-list dt {
  font-weight: bold;
  margin-top: 1rem;
}

.rules-list dd {
  margin-left: 1rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}
</style>
