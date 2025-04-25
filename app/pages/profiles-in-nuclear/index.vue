<template>
  <UPage>
    <UPageHero
      title="Profiles in Nuclear"
      description="Nuclear energy is about people. And science. And technology. And engineering."
    />
    <UContainer class="w-3/4 mx-auto">
      <UPageGrid>
        <MemberNameTag
          v-for="tag in nameTags"
          :alias="tag.alias"
          :handle="tag.handle"
          :avatar-src="tag.avatar"
          @click="() => visitProfile(tag.handle)"
        />
      </UPageGrid>
    </UContainer>
  </UPage>
</template>

<script setup lang="ts">
const { data: nameTags, error } = await useAsyncData('memberNameTags', () =>
  usePublicAccess().getMemberNameTags(),
)

const visitProfile = (handle: string) => {
  navigateTo(`/profiles-in-nuclear/${handle}`)
}
</script>

<style scoped></style>
