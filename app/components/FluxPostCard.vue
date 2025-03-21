<script setup lang="ts">
import { formatDistanceToNow } from "date-fns";

const props = defineProps({
  postKey: { type: String, required: true },
  postedAt: { type: String, required: true },
  author: { type: Object, required: true },
  stats: { type: Object, required: true },
  postContent: { type: String, required: true },
});

const timeSincePosted = computed(() => {
  return props.postedAt !== null
    ? formatDistanceToNow(new Date(props.postedAt), {
        addSuffix: true,
      })
    : "";
});
</script>

<template>
  <div v-if="props.postKey">
    <UCard
      variant="subtle"
      class="w-7/8 my-6 mx-auto bg-uranium dark:bg-graphite"
      :ui="{ header: 'py-2', footer: 'py-2' }"
    >
      <template #header>
        <div class="flex items-center space-x-2">
          <UAvatar :src="props.author.avatar" />
          <div class="text-sm">
            {{ props.author.display }} @{{ props.author.handle }}
            <UIcon name="i-ph-dot-outline-duotone" />
            {{ timeSincePosted }}
          </div>
        </div>
      </template>

      <!-- can use DOMPurify to sanitize HTML content; might use it after edits instead of every render -->
      <div v-html="props.postContent" />

      <template #footer>
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center space-x-2">
            <UIcon name="i-ph-chat-circle-text-duotone" />
            <div>{{ props.stats.reactions }} reactions</div>
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <UIcon name="i-ph-lightning-duotone" />
              <div class="boosted">{{ props.stats.boosts }} boosts</div>
            </div>
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <UIcon name="i-ph-eye-duotone" />
              <div>{{ props.stats.views }} views</div>
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
