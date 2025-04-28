<template>
  <div>
    <h2>Flux Guidelines</h2>
    <div>
      Flux is where we can talk about nuclear energy and all related things. To be a productive
      fluxer, keep a few guidelines in mind.
    </div>
    <dl class="rules-list">
      <dt>Be kind.</dt>
      <dd>
        Feel free to speak your mind. Try to do it in a way that is respectful to others. Avoid
        personal attacks.
      </dd>
      <dt>Keep it clean.</dt>
      <dd>
        Imagine that curious children are reading what you write and seeing what you post. Limit
        cursing, and avoid salacious topics and imagery.
      </dd>
      <dt>Stay legal.</dt>
      <dd>
        Post information that is openly available or to which you have the rights. You don't need to
        check with your lawyer to use Flux. At the same time, avoid sharing information that could
        lead to serious mischief (i.e., crimes).
      </dd>
    </dl>
    <div class="my-6">
      Note that anything you post is subject to being muted or removed by our moderators.
    </div>
    <div class="my-6">
      Here are the complete
      <NuxtLink
        class="hover:bg-gray-200 hover:dark:bg-gray-500"
        external
        to="https://nuclearambitions.com/legal/terms-of-use"
        >Terms of Use</NuxtLink
      >. Please follow the link to review the terms. What you find will amaze you.
    </div>
    <UFormField
      class="my-6 mx-auto w-4/5"
      label="Terms of Use"
      name="agreeToTerms"
      description="You do not have to agree, but you cannot use Flux unless you do."
    >
      <UCheckbox
        v-model="agreeToTerms"
        class="w-full"
        label="I have read and agree to the terms of use."
      />
    </UFormField>
    <UButton
      :label="continueButtonLabel"
      :disabled="!agreeToTerms"
      block
      class="my-12"
      @click="takeStep"
    />
  </div>
</template>

<script setup lang="ts">
const agreeToTerms = ref(false)
const emit = defineEmits(['ready-to-continue'])

const takeStep = () => {
  emit('ready-to-continue')
}
const continueButtonLabel = computed(() => {
  return agreeToTerms.value ? 'Continue' : 'To continue, agree to the Terms of Use'
})
</script>

<style scoped>
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
a {
  color: var(--color-cherenkov);
}
a:hover {
  background-color: var(--color-graphite);
}
</style>
