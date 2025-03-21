<script setup lang="ts">
import { formatDistanceToNow } from "date-fns";

const fluxData = computed(() => {
  return {
    postKey: "kjk34kj2o9",
    postedAt: "2025-03-18T18:32:37Z",
    author: {
      display: "Zanzibar",
      handle: "the_real_zanzi",
      avatar: "/images/Zanzibar.jpg",
    },
    stats: {
      reactions: 3,
      views: 120,
      boosts: 4,
    },
    postContent:
      "<p>Hey, <em>everybody</em>. I think you are <strong>great</strong>!</p>",
  };
});
const timeSincePosted = computed(() => {
  return fluxData.value.postedAt
    ? formatDistanceToNow(new Date(fluxData.value.postedAt), {
        addSuffix: true,
      })
    : "";
});
</script>

<template>
  <div v-if="fluxData">
    <UCard class="w-7/8 my-6 mx-auto bg-uranium dark:bg-graphite">
      <template #header>
        <div class="flex items-center space-x-2">
          <UAvatar :src="fluxData.author.avatar" />
          <div class="text-sm">
            {{ fluxData.author.display }} @{{ fluxData.author.handle }}
            <UIcon name="i-ph-dot-outline-duotone" />
            {{ timeSincePosted }}
          </div>
        </div>
      </template>

      <div v-html="fluxData.postContent" />

      <template #footer>
        <div
          class="flex items-center justify-between border border-blue-300 p-2"
        >
          <div class="flex items-center space-x-2">
            <UIcon name="i-ph-chat-circle-text-duotone" />
            <div>{{ fluxData.stats.reactions }} Reactions</div>
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <UIcon name="i-ph-lightning-duotone" />
              <div class="boosted">{{ fluxData.stats.boosts }} Boosts</div>
            </div>
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <UIcon name="i-ph-eye-duotone" />
              <div>{{ fluxData.stats.views }} Views</div>
            </div>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<style scoped>
.boosted {
  font-weight: bold;
  color: var(--color-cherenkov);
}
</style>
