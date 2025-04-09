<template>
  <div class="space-y-4">
    <h2>Now Check Your Email</h2>
    <div>
      This is exciting! Your magic link is on its way. Normally it only takes a few seconds. Please
      check your email, and click that link.
    </div>
    <div>
      If everything works, you will come back all signed in. That helps you get the best World of
      Nuclear experience.
    </div>
    <div>
      If it does not work, you might want to
      <ULink to="/sign-in?magic=1" class="text-cherenkov hover:bg-graphite hover:text-cherenkov"
        >try again</ULink
      >. Be sure your email address is spelled correctly.
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})
</script>
