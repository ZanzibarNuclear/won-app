<template>
  <div>Waiting for login...</div>
</template>

<script setup lang="ts">
onMounted(async () => {
  await useWonAuth().getCurrentUser()

  const redirectPath = useWonContext().grabReturnRoute()
  return navigateTo(redirectPath)
})
</script>
