<template>
  <UContainer class="flex flex-col items-center w-4/5">
    <UPage>
      <UPageHeader
        v-if="profile && !notFound"
        class="m-6"
        headline="Member Profile"
        :title="profile.alias || 'Genius'"
        :description="
          profile.whyNuclear ||
          profile.whyJoined ||
          'Exploring nuclear energy and its many productive uses.'
        "
      />
      <UPageBody>
        <div v-if="notFound">
          <h1>Loading...</h1>
          <div>Sorry, we did not find the profile you are looking for.</div>
        </div>
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
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const handle = route.params.handle as string
const profile: any = ref(null)
const notFound = ref(false)

async function fetchProfile() {
  try {
    const { data } = await useAsyncData('memberProfile-' + handle, () =>
      usePublicAccess().findProfile(handle),
    )
    profile.value = data.value
  } catch (error) {
    console.error('Error fetching profile:', error)
    notFound.value = true
  }
}

fetchProfile()
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
