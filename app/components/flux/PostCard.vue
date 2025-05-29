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
const emit = defineEmits(['viewFlux', 'reactToFlux', 'boostFlux', 'viewAuthorProfile', 'raiseFlag'])
const cardStyle = {
  root: 'p-0',
  header: 'p-1',
  body: 'p-0 sm:px-2 sm:py-4',
  footer: 'p-1',
}

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

// Reference to the flux content element
const fluxContentRef = ref<HTMLElement | null>(null)

// Apply styles to the dynamically rendered HTML content
onMounted(() => {
  // applyStylesToFluxContent()
})
</script>

<template>
  <div v-if="props.post" class="m-2">
    <UCard variant="subtle" class="w-full my-6 mx-auto bg-uranium dark:bg-graphite" :ui="cardStyle">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <UAvatar @click="handleViewProfile" :src="avatarUrl" class="clickable" />
            <div class="text-sm">
              <span @click="handleViewProfile" class="clickable"
                ><strong>{{ props.post.author.alias }}</strong> @{{
                  props.post.author.handle
                }}</span
              >
              <UIcon name="i-ph-dot-outline-duotone" />
              {{ timeSincePosted }}
            </div>
          </div>
          <UTooltip text="React to this flux">
            <UButton
              @click="handleReaction"
              icon="i-ph-sparkle-duotone"
              variant="ghost"
              size="lg"
              class="clickable"
            />
          </UTooltip>
        </div>
      </template>

      <!-- can use DOMPurify to sanitize HTML content; might use it after edits instead of every render -->
      <div
        ref="fluxContentRef"
        v-html="props.post.content"
        @click="handleView"
        class="clickable flux-content"
      />

      <template #footer>
        <div class="flex items-center justify-between text-sm">
          <div>
            <div class="flex items-center space-x-2">
              <UIcon name="i-ph-eye-duotone" />
              <div>{{ props.post.views }} views</div>
            </div>
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <UButton
                @click="handleBoost"
                icon="i-ph-lightning-duotone"
                :variant="isBoostedByUser ? 'solid' : 'ghost'"
                :disabled="!isFluxUser"
                class="clickable"
              >
                {{ post.boosts }} boosts
              </UButton>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <UIcon name="i-ph-chat-circle-text-duotone" @click="handleReaction" class="clickable" />
            <div>{{ props.post.reactions }} reactions</div>
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

/* Styles for content inside v-html */
.flux-content {
  padding: 0.5rem;
}

/* Use :deep to target elements inside v-html content */
.flux-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.25;
}

.flux-content :deep(a) {
  color: var(--color-cherenkov);
  text-decoration: underline;
}

.flux-content :deep(h1),
.flux-content :deep(h2),
.flux-content :deep(h3) {
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.flux-content :deep(h1) {
  color: orange;
}
.flux-content :deep(h2) {
  color: darkorange;
}
.flux-content :deep(h3) {
  color: darkgoldenrod;
}
.dark .flux-content :deep(h1) {
  color: yellow;
}
.dark .flux-content :deep(h2) {
  color: goldenrod;
}
.dark .flux-content :deep(h3) {
  color: peachpuff;
}

.flux-content :deep(ul),
.flux-content :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.flux-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.25rem;
}

.flux-content :deep(blockquote) {
  border-left: 3px solid goldenrod;
  padding-left: 1rem;
  font-style: italic;
  margin: 1rem 0;
}
</style>
