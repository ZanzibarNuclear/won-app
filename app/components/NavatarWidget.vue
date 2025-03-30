<template>
  <div>
    <div v-if="!userStore.isSignedIn">
      <div>
        <UButton
          label="Join"
          variant="solid"
          color="amber"
          icon="i-ph-arrow-bend-down-right-duotone"
          class="mr-2 mb-1"
          @click="openJoin"
        />
      </div>
      <div>
        <UButton
          label="Sign In"
          variant="solid"
          color="primary"
          icon="i-ph-sign-in"
          @click="openJoin"
        />
      </div>
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
    return userStore.alias || 'Mystery Guest'
  } else {
    return 'anonymouns'
  }
})

const openJoin = () => {
  navigateTo('/join')
}

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
