<template>
  <div>
    <h1 class="text-center">Sign In</h1>
    <div class="flex items-center gap-4">
      <div>
        <NuxtImg src="/images/Zanzibar-2024-07.jpg" width="70px" fit="contain" />
      </div>
      <div>Use one of these methods to establish your identity.</div>
    </div>
    <!-- <AuthModalOAuthPanel /> -->
    <AuthOAuthCard class="my-6" />
    <AuthMagicLinkCard class="my-6" />
    <div class="my-12">
      <h3>Why do I need to sign in?</h3>
      <div class="text-md my-4">
        When you sign in, we put a cookie on your browser. Then as you click around, we keep track
        of your experience. Plus, you gain access to members-only areas, where the really good stuff
        is. You can create a user profile, participate in Flux, and earn karma awards for your
        achievements.
      </div>
      <div class="text-md my-4">
        When you sign out, we remove the cookie. That's handy if you are using a shared computer.
        Sign back in at any time, and continue where you left off.
      </div>
      <h3>Legal Stuff</h3>
      <div class="text-md my-4">
        Here are our
        <NuxtLink to="https://nuclearambitions.com/legal/terms-of-use" target="_blank"
          >terms of use</NuxtLink
        >. Signing up means you agree with these terms. Also, you can read our
        <NuxtLink to="https://nuclearambitions.com/legal/privacy-policy" target="_blank"
          >privacy policy</NuxtLink
        >, in case you are worried about that.
        <div class="text-md my-4">
          By the way, we use cookies, like every other website. Again, it's how we know that it's
          you while you click around the website. We are not selling your cookie data or telling
          other companies about your favorite reactor designs.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'World of Nuclear - Sign In or Sign Up',
  ogTitle: 'World of Nuclear - Sign In or Sign Up',
  description:
    "Join Zanzibar's World of Nuclear, a safe place to explore the beneficial uses of nuclear energy. Consume our bite-sized lessons, join in interactive discussions, and operate nuclear simulations. Find out about unlimited power.",
  ogDescription:
    "Join Zanzibar's World of Nuclear, a safe place to explore the beneficial uses of nuclear energy. Consume our bite-sized lessons, join in interactive discussions, and operate nuclear simulations. Find out about unlimited power.",
})
</script>

<style scoped></style>
