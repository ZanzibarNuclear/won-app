<template>
  <div>
    <div class="flex" v-if="!userStore.isSignedIn">
      <UButton
        label="Sign in"
        color="neutral"
        variant="ghost"
        trailing-icon="i-ph-sign-in"
        to="/sign-in"
      />
      <UButton
        label="Sign up"
        color="secondary"
        trailing-icon="i-ph-user-plus-duotone"
        class="hidden lg:flex"
        to="/sign-in"
      />
    </div>
    <UDropdownMenu
      v-if="userStore.isSignedIn"
      :items="items"
      :popper="{ placement: 'bottom-start' }"
      class="text-primary"
    >
      <UButton
        color="primary"
        variant="solid"
        icon="i-ph-person"
        :label="screenName"
        trailing-icon="i-ph-caret-double-down-duotone"
      />
    </UDropdownMenu>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const userStore = useUserStore()
const profileUrl = ref('/member/profile')

onMounted(() => {
  if (!userStore.isSignedIn) {
    // see if we have an active session that we don't know about
    useWonAuth().getCurrentUser()
  }
})

// watch(
//   () => fluxStore.hasProfile,
//   (newProfile) => {
//     if (newProfile) {
//       profileUrl.value = `/profile/${fluxStore.profile?.handle}`
//     }
//   },
// )

const screenName = computed(() => {
  if (userStore.isSignedIn) {
    return userStore.user?.alias || 'You There'
  } else {
    return 'Mystery User'
  }
})

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Profile',
      icon: 'i-ph-identification-card',
      to: profileUrl.value,
    },
    {
      label: 'Sign Out',
      icon: 'i-ph-sign-out',
      color: 'warning',
      onSelect: async () => {
        await useWonAuth().signOut()
        navigateTo('/won-guide')
      },
    },
  ],
])
</script>

<style scoped>
.big-icon {
  font-size: 24px;
  margin-left: 2px;
}
</style>
