<template>
  <div>Waiting for login...</div>
</template>

<script setup lang="ts">
import { jwtDecode } from 'jwt-decode'

// Get redirect path from cookies
// TODO: match beginning and end of sign-in
//  1) store desired-page in cookie,
//  2) sign-in,
//  3) sign-in finishes here, which uses cookie if found / not expired, or redirects to default.
const route = useRoute()
const userStore = useUserStore()

onMounted(() => {
  // decode JWT and put in user store
  // TODO: implement
  const token = route.query.token
  if (token) {
    const decoded = jwtDecode(token)
    console.log(decoded)
    const { userId, alias, roles } = decoded
    userStore.setActiveUser({
      userId,
      alias,
      roles,
    })
  }

  // redirect based on cookie or default
  const redirectPath = useCookie('won-redirect-path').value || '/lobby'
  console.log('redirect to: ' + redirectPath)
  return navigateTo(redirectPath)
})
</script>
