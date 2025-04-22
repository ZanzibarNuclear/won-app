<template>
  <UPageCard class="w-3/4 min-w-80 mx-auto">
    <div v-if="profile" class="min-w-80">
      <div>
        <div class="space-y-4">
          <h2>Images</h2>
          <UFormField
            label="Profile Picture"
            name="profilePic"
            help="A full-sized picture for your profile."
          >
            <NuxtImg :src="glamShotSrc" class="mb-2 w-11/12 pr-2" />
          </UFormField>
          <UModal v-model:open="openGlamShotEdit" title="Change Profile Picture">
            <UButton label="Change" variant="subtle" icon="i-ph-pencil-duotone" />
            <template #body>
              <MemberImageUploader
                kind="profile"
                :initial-src="glamShotSrc"
                @finished="handleFinishGlamShotEdit"
              />
            </template>
          </UModal>
          <USeparator color="neutral" class="mt-4 w-11/12" />
          <UFormField label="Avatar" name="avatar" help="A thumbnail image that represents you">
            <UAvatar
              :src="avatarSrc"
              icon="i-ph-person-duotone"
              size="3xl"
              class="mr-4"
              :key="avatarSrc"
            />
          </UFormField>
          <UModal v-model:open="openAvatarEdit" title="Change Avatar">
            <UButton label="Change" variant="subtle" icon="i-ph-pencil-duotone" />
            <template #body>
              <MemberImageUploader
                kind="avatar"
                :initial-src="avatarSrc"
                @finished="handleFinishAvatarEdit"
              />
            </template>
          </UModal>
        </div>
      </div>
      <USeparator color="neutral" class="mt-4 w-11/12" />
      <div class="space-y-3">
        <UButton icon="i-ph-pencil" label="Change" @click="editProfile" class="float-right mr-4" />
        <h2>Identity</h2>
        <UUser
          class="mt-6"
          :name="profile.alias ?? undefined"
          :description="profile.handle ?? undefined"
          :avatar="{ src: avatarSrc, icon: 'i-ph-person-duotone' }"
        />
        <USeparator color="neutral" class="mt-4 w-11/12" />
        <MemberProfileField
          name="Screen name"
          explanation="The name you want to show others. Might be an alias."
          :value="profile.alias ?? undefined"
        />
        <MemberProfileField
          name="Handle"
          explanation="A system-friendly name used to identify you."
          :value="profile.handle ?? undefined"
        />
        <MemberProfileField
          name="Your name"
          explanation="Your real name, or whatever you want us to call you."
          :value="profile.fullName ?? undefined"
        />
        <UPopover mode="hover">
          <UButton label="User ID" color="neutral" variant="subtle" block class="w-11/12" />
          <template #content>
            <div>{{ profile.id }}</div>
          </template>
        </UPopover>
      </div>
      <USeparator color="neutral" class="mt-4" />
      <div class="my-6 space-y-3">
        <h2>About You</h2>
        <MemberProfileField
          name="Biography"
          explanation="A brief version of your story."
          :value="profile.bio ?? undefined"
        />
        <MemberProfileField
          name="Location"
          explanation="Where you live or where you are, in a general way."
          :value="profile.location ?? undefined"
        />
        <MemberProfileField
          name="Website"
          explanation="Your personal or business website, maybe your blog."
          :value="profile.website ?? undefined"
        />
        <MemberProfileField
          name="Why you joined"
          explanation="What you hope to get out of being a member of the World of Nuclear."
          :value="profile.whyJoined ?? undefined"
        />
        <MemberProfileField
          name="Why nuclear energy"
          explanation="What draws you to nuclear energy?"
          :value="profile.whyNuclear ?? undefined"
        />
      </div>
      <div class="my-6 space-y-3">
        <h2>Stats</h2>
        <MemberProfileField name="Joined" :value="formatDate(profile.createdAt)" />
        <MemberProfileField name="Last Update" :value="formatExactDateTime(profile.updatedAt)" />
        <MemberProfileField
          name="Karma Points"
          :value="profile.karmaScore.toString()"
          explanation="You earn karma points by contributing. You lose points for bad bahavior."
        />
      </div>
    </div>
    <div v-else>Your profile is not loaded. Did you sign in?</div>
  </UPageCard>
</template>

<script setup lang="ts">
const { profile } = useUserStore()
const emit = defineEmits(['openForEdit'])
const defaultAvatar = 'https://cdn.worldofnuclear.com/static/images/shared/radiation-symbol.svg'
const defaultProfilePic =
  'https://cdn.worldofnuclear.com/static/images/shared/Cherenkov-radiation.jpg'

const editProfile = () => {
  emit('openForEdit')
}

const modalStyle = {
  header: 'mr-0',
}
const openAvatarEdit = ref(false)
const openGlamShotEdit = ref(false)

const handleFinishAvatarEdit = () => {
  openAvatarEdit.value = false
  reloadNuxtApp()
}
const handleFinishGlamShotEdit = () => {
  openAvatarEdit.value = false
  reloadNuxtApp()
}

const avatarSrc = computed(() => {
  return profile?.avatar ? useRuntimeConfig().public.wonServiceUrl + profile.avatar : defaultAvatar // use default, TODO: need to set one up
})
const glamShotSrc = computed(() => {
  return profile?.glamShot
    ? useRuntimeConfig().public.wonServiceUrl + profile.glamShot
    : defaultProfilePic // use default, TODO: need to set one up
})
</script>

<style scoped></style>
