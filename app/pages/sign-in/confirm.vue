<template>
  <div>Waiting for login...</div>
</template>

<script setup lang="ts">
const route = useRoute()
const userStore = useUserStore()

onMounted(() => {
  useWonAuth().getCurrentUser()

  // redirect based on cookie or default
  const redirectPath = useCookie('won-redirect-path').value || '/won-guide'
  console.log('redirect to: ' + redirectPath)
  return navigateTo(redirectPath)
})
</script>
