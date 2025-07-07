<template>
  <div>
    <div class="flex" v-if="!userStore.isSignedIn">
      <UButton label="Sign in" color="neutral" variant="ghost" trailing-icon="i-ph-sign-in" to="/sign-in" />
      <UButton label="Sign up" color="secondary" trailing-icon="i-ph-user-plus-duotone" class="hidden lg:flex"
        to="/sign-in" />
    </div>
    <UDropdownMenu v-if="userStore.isSignedIn" :items="dynamicItems">
      <UButton color="primary" variant="solid" icon="i-ph-person" :label="screenName"
        trailing-icon="i-ph-caret-double-down-duotone" />
    </UDropdownMenu>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const profileUrl = ref('/member/profile')

onMounted(async () => {
  if (!userStore.isSignedIn) {
    // see if we have an active session that we don't know about
    await useWonAuth().getCurrentUser()
  }
})

const screenName = computed(() => {
  if (userStore.isSignedIn) {
    return userStore.user?.alias || 'You There'
  } else {
    return 'Mystery User'
  }
})

const profile = {
  label: 'Profile',
  icon: 'i-ph-identification-card-duotone',
  to: profileUrl.value,
}
const admin = {
  label: 'Admin',
  icon: 'i-ph-key-duotone',
  to: '/admin',
}
const builder = {
  label: 'God Mode',
  icon: 'i-ph-person-simple-hike-duotone',
  to: '/nu-adventure/builder',
}
const signOut = {
  label: 'Sign Out',
  icon: 'i-ph-sign-out',
  color: 'warning',
  onSelect: async () => {
    await useWonAuth().signOut()
    navigateTo('/won-guide')
  },
}

const dynamicItems = computed(() => {
  const nested: any[] = [profile]
  if (userStore.isSignedIn && userStore.user?.roles.includes('admin')) {
    nested.push(admin)
    nested.push(builder)
  }
  nested.push(signOut)
  return [nested]
})
</script>

<style scoped>
.big-icon {
  font-size: 24px;
  margin-left: 2px;
}
</style>
