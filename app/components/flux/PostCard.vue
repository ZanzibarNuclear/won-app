<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import type { Flux } from '~/types/won-types'

const props = defineProps({
  post: {
    type: Object as PropType<Flux>,
    required: true,
  },
})
const emit = defineEmits(['viewFlux', 'replyToFlux'])

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
  await useFluxService().viewFlux(props.post.id)
  useFluxStore().setActiveFlux(props.post as Flux)
  emit('viewFlux', props.post)
}

const handleReply = async () => {
  await useFluxService().viewFlux(props.post.id)
  useFluxStore().setActiveFlux(props.post as Flux, true)
  emit('replyToFlux', props.post)
}

const handleBoost = async () => {
  console.log('boosting flux: ' + props.post.id)
  await useFluxService().boostFlux(props.post.id)
}

const handleViewProfile = () => {
  const handle = props.post.author?.handle
  if (!handle) {
    console.error('no handle to view profile')
    return
  }
  navigateTo(`/profile/${handle}`)
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
          <UAvatar :src="avatarUrl" />
          <div class="text-sm">
            {{ props.post.author.display }} @{{ props.post.author.handle }}
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
</style>
