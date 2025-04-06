<template>
  <UContainer class="w-5/6">
    <h1 class="text-center">Why You Might Want to Sign In</h1>

    <h3>You might be wondering...</h3>
    <UAccordion :items="faqItems" />
    <UButton to="/sign-in">Let's sign in!</UButton>

    <div class="my-12">
      <h3>Legal stuff...</h3>
      <div class="text-md my-4">
        Here are our
        <NuxtLink
          to="https://nuclearambitions.com/legal/terms-of-use"
          target="_blank"
          class="text-primary-500 font-medium"
          >terms of use</NuxtLink
        >. Signing up means you agree with these terms. Also, you can read our
        <NuxtLink
          to="https://nuclearambitions.com/legal/privacy-policy"
          target="_blank"
          class="text-primary-500 font-medium"
          >privacy policy</NuxtLink
        >, in case you are worried about that.
      </div>
    </div>

    <div>
      <h3>Ready to sign in?</h3>
      <UButton to="/sign-in">Let's sign in!</UButton>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'

useSeoMeta({
  title: 'World of Nuclear - Sign In or Sign Up',
  ogTitle: 'World of Nuclear - Sign In or Sign Up',
  description:
    "Join Zanzibar's World of Nuclear, a safe place to explore the beneficial uses of nuclear energy. Consume our bite-sized lessons, join in interactive discussions, and operate nuclear simulations. Find out about unlimited power.",
  ogDescription:
    "Join Zanzibar's World of Nuclear, a safe place to explore the beneficial uses of nuclear energy. Consume our bite-sized lessons, join in interactive discussions, and operate nuclear simulations. Find out about unlimited power.",
})

const faqItems = ref<AccordionItem[]>([
  {
    label: 'Why do I need to sign in?',
    icon: 'i-ph-sign-in-duotone',
    content:
      'Signing in allows the World of Nuclear to keep track of your actions. That way, you get credit for your accomplishments and any contributions.',
  },
  {
    label: 'What if I do not have an account?',
    icon: 'i-ph-person-duotone',
    content:
      'The first time you sign in, we will create a free account for you. It happens automatically. Then you will have a chance to update your profile and preferences.',
  },
  {
    label: 'Do you use cookies?',
    icon: 'i-ph-cookie-duotone',
    content:
      'Absolutely. Cookies are necessary for making this experience work. We only use cookies that allow you to enjoy the World of Nuclear. By signing in, you agree for us to use cookies.',
  },
  {
    label: 'What about my privacy?',
    icon: 'i-ph-lock-key-duotone',
    content:
      'Anything you put on the platform is open for others to find. Other than that, we do nothing to impact your privacy.',
  },
  {
    label: 'What happens when I sign out?',
    icon: 'i-ph-sign-out-duotone',
    content:
      'Simple. We remove the cookies from your browser, and we block any actions that require knowing who you are.',
  },
])
</script>
