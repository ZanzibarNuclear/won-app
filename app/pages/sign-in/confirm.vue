<template>
  <div>Waiting for login...</div>
</template>

<script setup lang="ts">
import { jwtDecode } from 'jwt-decode'
import type { UserInfo } from '~/types/won-types'

// Get redirect path from cookies
//  1) store desired-page in cookie,
//  2) sign-in,
//  3) sign-in finishes here, which uses cookie if found / not expired, or redirects to default.
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
