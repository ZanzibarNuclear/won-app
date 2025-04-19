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

          <USeparator color="neutral" class="mt-4" />
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

          <UPopover mode="hover" class="mb-10">
            <UButton label="User ID" color="neutral" variant="subtle" block />
            <template #content>
              <div>{{ profile.id }}</div>
            </template>
          </UPopover>
          <div>Profile picture:</div>
          <NuxtImg src="/images/Zanzibar.jpg" class="w-1/3 mb-2 mx-auto" />
          <div>URL: {{ profile.glamShot }}</div>
          <USeparator color="neutral" class="mt-4" />
        </div>
      </div>
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
