<template>
  <UContainer class="flex flex-col items-center">
    <h1>Member Profile</h1>
    <div v-if="!userStore.isSignedIn">You need to sign in to see your profile.</div>
    <div v-if="!userStore.isProfileLoaded">We cannot seem to find your profile.</div>
    <div v-else class="mb-24">
      <div v-if="editMode">
        <UButton @click="editMode = false" label="Cancel" icon="i-ph-x-circle" />
        <MemberProfileEdit :initial-profile="userStore.profile" @save-updates="onSubmit" />
      </div>
      <div v-else>
        <MemberProfileView @open-for-edit="onEdit" />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { UserProfile, UserProfileDeltas } from '~/types/won-types'

const memberService = useMemberService()
const userStore = useUserStore()
const toast = useToast()

const editMode = ref(false)
const onEdit = () => {
  editMode.value = true
}
const onCancelEdit = () => {
  editMode.value = false
}

async function onSubmit(deltas: UserProfileDeltas) {
  console.log('saving profile updates', deltas)

  // Assuming you send the deltas to an API or handle them further
  try {
    const result = await memberService.updateUserProfile(deltas)
    toast.add({
      title: 'Success',
      description: 'Your profile has been updated.',
      color: 'success',
    })
    userStore.setProfile(result.data as UserProfile)
    editMode.value = false
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to update your profile. Please try again.',
      color: 'error',
    })
  }
}
</script>

<style scoped></style>
