<template>
  <UPage>
    <UPageHeader
      class="m-6"
      :title="profile.alias || 'Genius'"
      :description="
        profile.whyNuclear ||
        profile.whyJoined ||
        'Exploring nuclear energy and its many productive uses.'
      "
    >
    </UPageHeader>
    <UPageBody class="m-6 w-4/5">
      <div v-if="profile">
        <div class="my-8">
          <MemberProfilePicture :src="profile.glamShot ?? undefined" class="w-[400px]" />
          <MemberNameTag
            class="my-6"
            :alias="profile.alias ?? undefined"
            :handle="profile.handle ?? undefined"
            :avatar-src="profile.avatar ?? undefined"
          />
        </div>
        <div class="space-y-8">
          <div>
            <div class="facet-label">About {{ profile.alias }}:</div>
            <div>{{ profile.bio }}</div>
          </div>
          <div class="italic">
            {{ profile.alias }} has been a member of the World of Nuclear since
            {{ formatDate(profile.createdAt) }}.
          </div>
          <div class="flex flex-row gap-x-12">
            <div>
              <div class="facet-label">Location:</div>
              <div>{{ profile.location }}</div>
              <div v-if="profile.website">
                Also at <NuxtLink :to="profile.website" target="_blank">this website</NuxtLink>.
              </div>
            </div>
            <div>
              <div class="facet-label">Karma points:</div>
              <div>{{ profile.karmaScore }}</div>
            </div>
          </div>
          <div>
            <div class="facet-label">Motivation for joining the World of Nuclear:</div>
            <div>{{ profile.whyJoined || 'no comment' }}</div>
          </div>
          <div>
            <div class="facet-label">Why support nuclear energy?:</div>
            <div>{{ profile.whyNuclear || 'no comment' }}</div>
          </div>
        </div>
      </div>
      <div v-else>
        <h1>Uh oh!</h1>
        <div>Sorry to say, we cannot find that profile. Did you use the right handle?</div>
      </div>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
import type { PublicUserProfile } from '~/types/won-types'

const { handle } = useRoute().params as { handle: string }
console.log('looking for member with handle: ' + handle)

const { data } = await useAsyncData<any>('profile:' + handle, () =>
  usePublicAccess().findProfile(handle),
)
const profile: PublicUserProfile = data.value
</script>

<style scoped>
a {
  text-decoration: underline;
  color: var(--color-cherenkov);
}
a:hover {
  background-color: var(--color-cherenkov);
  color: navy;
}
.facet-label {
  font-weight: bold;
  color: var(--color-cherenkov);
  margin-bottom: 4px;
}
</style>
