<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import type { Flux } from '~/types/won-types'

const props = defineProps({
  post: {
    type: Object as PropType<Flux>,
    required: true,
  },
  isFluxUser: { type: Boolean, default: false },
})
const emit = defineEmits(['viewFlux', 'reactToFlux', 'boostFlux', 'viewAuthorProfile'])

const isBoostedByUser = ref(false)

const timeSincePosted = computed(() => {
  return props.post.postedAt !== null
    ? formatDistanceToNow(new Date(props.post.postedAt), {
        addSuffix: true,
      })
    : ''
})

const avatarUrl = computed(() => {
  const { wonServiceUrl, defaultAvatarUrl } = useRuntimeConfig().public
  return props.post.author.avatar ? wonServiceUrl + props.post.author.avatar : defaultAvatarUrl
})

const handleView = async () => {
  await useFluxService().registerView(props.post.id)
  emit('viewFlux', props.post)
}

const handleReaction = async () => {
  emit('reactToFlux', props.post)
}

const handleBoost = async () => {
  emit('boostFlux', props.post)
}

const handleViewProfile = () => {
  emit('viewAuthorProfile', props.post.author.handle)
}
</script>

<template>
  <div v-if="props.post">
    <UCard
      variant="subtle"
      class="w-full my-6 mx-auto bg-uranium dark:bg-graphite"
      :ui="{ header: 'py-2', footer: 'py-2' }"
    >
      <template #header>
        <div class="flex items-center space-x-2">
          <UAvatar @click="handleViewProfile" :src="avatarUrl" class="clickable" />
          <div class="text-sm">
            <span @click="handleViewProfile" class="clickable"
              >{{ props.post.author.display }} @{{ props.post.author.handle }}</span
            >
            <UIcon name="i-ph-dot-outline-duotone" />
            {{ timeSincePosted }}
          </div>
        </div>
      </template>

      <!-- can use DOMPurify to sanitize HTML content; might use it after edits instead of every render -->
      <div v-html="props.post.content" />

      <template #footer>
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center space-x-2">
            <UIcon name="i-ph-chat-circle-text-duotone" />
            <div>{{ props.post.reactions }} reactions</div>
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <UButton
                @click="handleBoost"
                icon="i-ph-lightning-duotone"
                :variant="isBoostedByUser ? 'solid' : 'ghost'"
                :disabled="!isFluxUser"
              >
                {{ post.boosts }} boosts
              </UButton>
              <!-- <UIcon name="i-ph-lightning-duotone" />
              <div class="boosted">{{ props.post.boosts }} boosts</div> -->
            </div>
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <UIcon name="i-ph-eye-duotone" />
              <div>{{ props.post.views }} views</div>
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
.clickable {
  cursor: pointer;
}
</style>
