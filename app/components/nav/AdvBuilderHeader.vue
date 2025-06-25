<script setup lang="ts">
const route = useRoute()

const items = computed(() => [
  {
    label: 'Storyline',
    to: '/nu-adventure/builder',
  },
])

const saveActive = () => {
  // Implement save logic here
  alert('Save everything that has changed! (not implemented yet)')
}
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <NuxtImg src="/images/logo-icon-cherenkov-clear.png" sizes="60px" />
      </NuxtLink>
      <div class="text-4xl font-bold">Adventure Builder</div>
    </template>

    <template #right>
      <UNavigationMenu :items="items" variant="link" />
      <UButton label="Save" @click="saveActive" />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />

      <USeparator class="my-6" />

      <UButton label="Save" @click="saveActive" />
    </template>
  </UHeader>
</template>
