<template>
  <USeparator :avatar="{ src: '/images/radiation-symbol.svg' }" class="h-auto mt-32" />
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
      <!-- Column sections -->
      <div v-for="column in columns" :key="column.label" class="text-center">
        <h3 class="font-semibold text-lg mb-4">{{ column.label }}</h3>
        <ul class="space-y-3">
          <li v-for="item in column.children" :key="item.label">
            <NuxtLink
              :to="item.to"
              class="text-sm text-(--ui-text-muted) hover:text-(--ui-text) transition-colors"
              :external="item.to.startsWith('http')"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="text-center my-16 text-graphite dark:text-cooling-tower-dark">
    <p class="">
      Zanzibar's World of Nuclear Energy is a digital property of Nuclear Ambitions LLC.
    </p>
    <p class="text-sm">
      Copyright © {{ new Date().getFullYear() }} Nuclear Ambitions LLC. All rights reserved.
    </p>
  </div>
</template>

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
        label: 'Contact Us',
        to: '/contact-us',
      },
      {
        label: 'Privacy Policy',
        to: 'https://nuclearambitions.com/legal/privacy-policy.html',
      },
      {
        label: 'Terms of Use',
        to: 'https://nuclearambitions.com/legal/terms-of-use.html',
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
