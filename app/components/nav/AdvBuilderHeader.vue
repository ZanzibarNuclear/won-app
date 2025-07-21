<script setup lang="ts">
const route = useRoute()

const saveActive = () => {
  // Implement save logic here
  alert('Save everything that has changed! (not implemented yet)')
}
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <NuxtImg src="/images/logo-icon-cherenkov-clear.png" width="60" sizes="60px" />
      </NuxtLink>
      <div class="text-4xl font-bold">Adventure Builder</div>
    </template>

    <template #right>
      <UColorModeButton />
      <NavAccountWidget />
    </template>

    <template #body> </template>
  </UHeader>
</template>
