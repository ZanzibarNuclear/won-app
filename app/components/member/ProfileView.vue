<template>
  <UPageCard class="w-3/4 mx-auto">
    <div v-if="profile" class="min-w-80">
      <div>
        <UButton icon="i-ph-pencil" label="Edit" @click="editProfile" class="float-right" />
        <h2>Identity</h2>
        <div class="space-y-3">
          <UUser
            class="mt-6"
            :name="profile.alias ?? undefined"
            :description="profile.handle ?? undefined"
            :avatar="{ src: '/images/Zanzibar.jpg', icon: 'i-lucide-image' }"
          />
          <div class="text-xs">Avatar URL: {{ profile.avatar }}</div>

          <USeparator color="primary" class="mt-4" />
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
            explanation="Your real name, or at least what you would like us to call you."
            :value="profile.fullName ?? undefined"
          />

          <UPopover mode="hover" class="mb-10">
            <UButton label="User ID" color="neutral" variant="subtle" block />
            <template #content>
              <div>{{ profile.id }}</div>
            </template>
          </UPopover>
          <div>Profile picture:</div>
          <NuxtImg src="/images/Zanzibar.jpg" class="w-1/3 mb-2 mx-auto" />
          <div>URL: {{ profile.glamShot }}</div>
        </div>
      </div>
      <div class="my-6 space-y-3">
        <h2>About You</h2>
        <div>Bio: {{ profile.bio }}</div>
        <div>Location: {{ profile.location }}</div>
        <div>Website: {{ profile.website }}</div>
        <div>Why you joined: {{ profile.whyJoined }}</div>
        <div>Why you like nuclear: {{ profile.whyNuclear }}</div>
      </div>
      <div class="my-6 space-y-3">
        <h2>Stats</h2>
        <div>Joined: {{ profile.createdAt }}</div>
        <div>Last profile update: {{ profile.updatedAt }}</div>
        <div>Karma Points: {{ profile.karmaScore }}</div>
      </div>
    </div>
    <div v-else>Your profile is not loaded. Did you sign in?</div>
  </UPageCard>
</template>

<script setup lang="ts">
const { profile } = useUserStore()
const emit = defineEmits(['openForEdit'])

const editProfile = () => {
  emit('openForEdit')
}
</script>

<style scoped></style>
