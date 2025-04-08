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
    <UDropdown
      v-if="userStore.isSignedIn"
      :items="items"
      :popper="{ placement: 'bottom-start' }"
      class="text-primary"
    >
      <UButton
        color="primary"
        variant="solid"
        :icon="iconImage"
        :label="screenName"
        trailing-icon="i-ph-caret-double-down"
      />
    </UDropdown>
  </div>
</template>

<script setup lang="ts">
const fluxStore = useFluxStore()
const userStore = useUserStore()

const profileUrl = ref('/join')

const iconImage = computed(() => {
  return 'i-ph-person'
})

onMounted(() => {
  if (fluxStore.hasProfile) {
    profileUrl.value = `/profile/${fluxStore.profile?.handle}`
  }
})

watch(
  () => fluxStore.hasProfile,
  (newProfile) => {
    if (newProfile) {
      profileUrl.value = `/profile/${fluxStore.profile?.handle}`
    }
  },
)

const screenName = computed(() => {
  if (userStore.isSignedIn) {
    return userStore.user?.alias || 'Unknown Alias'
  } else {
    return 'anonymouns'
  }
})

const items = [
  [
    {
      label: 'Profile',
      icon: 'i-ph-identification-card',
      to: profileUrl.value,
    },
    {
      label: 'Sign Out',
      icon: 'i-ph-sign-out',
      click: async () => {
        // userStore.clearCurrentUser()
        navigateTo('/')
      },
    },
  ],
]
</script>

<style scoped>
.big-icon {
  font-size: 24px;
  margin-left: 2px;
}
</style>
