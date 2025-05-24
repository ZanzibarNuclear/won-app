<script setup lang="ts">
const columns = [
  {
    label: 'Features',
    children: [
      {
        label: 'Adventure',
        to: '/nu-adventure',
      },
      {
        label: 'Flux (Social)',
        to: '/flux-app',
      },
      {
        label: 'Lessons',
        to: '/get-smarter',
      },
      {
        label: 'Blog',
        to: '/news-and-views',
      },
      {
        label: 'Profiles',
        to: '/profiles-in-nuclear',
      },
    ],
  },
  {
    label: 'Connections',
    children: [
      {
        label: 'Zanzibar on X',
        to: 'https://x.com/ZanzibarNuclear',
      },
      {
        label: 'WoN on Discord',
        to: 'https://discord.gg/veeXbgMY',
      },
      {
        label: "Zanzibar's Nuclear Stack",
        to: 'https://zanzisnuclearstack.substack.com/',
      },
      {
        label: 'Opinions and Observations',
        to: 'https://davemount.substack.com/',
      },
    ],
  },
  {
    label: 'Company',
    children: [
      {
        label: 'About',
        to: 'https://nuclearambitions.com',
      },
      {
        label: 'Terms of Use',
        to: 'https://nuclearambitions.com/legal/terms-of-use.html',
      },
      {
        label: 'Privacy',
        to: 'https://nuclearambitions.com/legal/privacy-policy.html',
      },
      {
        label: 'Contact Us',
        to: '/contact-us',
      },
    ],
  },
]

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  toast.add({
    title: 'Subscribed!',
    description: "You've been subscribed to our newsletter.",
  })
}
</script>

<template>
  <USeparator :avatar="{ src: '/images/radiation-symbol.svg' }" class="h-px" />
  <UFooter :ui="{ top: 'border-b border-[var(--ui-border)]' }">
    <UFooterColumns :columns="columns">
      <template #right>
        <div class="mb-4">
          <UButton :to="{ name: 'sign-in' }" color="primary" label="Join" />
          <UColorModeButton />
          <UButton
            to="https://github.com/ZanzibarNuclear"
            target="_blank"
            icon="i-ph-github-logo-duotone"
            aria-label="GitHub"
            color="neutral"
            variant="ghost"
          />
        </div>
      </template>
    </UFooterColumns>
    <template #left>
      <p class="text-(--ui-text-muted) text-sm mr-4">
        Copyright © {{ new Date().getFullYear() }} Nuclear Ambitions LLC. All rights reserved.
      </p>
    </template>
    <template #bottom> </template>

    <template #right> </template>
  </UFooter>
</template>
