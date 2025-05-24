<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import type { Flux } from '~/types/won-types'
import './FluxContentStyles.css'

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
  applyStylesToFluxContent()
})

// Watch for changes in the post content and reapply styles
watch(
  () => props.post.content,
  () => {
    nextTick(() => {
      applyStylesToFluxContent()
    })
  },
)

// Function to apply styles to the content
const applyStylesToFluxContent = () => {
  if (!fluxContentRef.value) return

  // Apply styles to paragraphs
  const paragraphs = fluxContentRef.value.querySelectorAll('p')
  paragraphs.forEach((p) => {
    p.style.marginBottom = '1rem'
    p.style.lineHeight = '1.5'
  })

  // Apply styles to links
  const links = fluxContentRef.value.querySelectorAll('a')
  links.forEach((a) => {
    a.style.color = 'var(--color-cherenkov)'
    a.style.textDecoration = 'underline'
  })

  // Apply styles to headings
  const headings = fluxContentRef.value.querySelectorAll('h1, h2, h3')
  headings.forEach((h) => {
    h.style.marginTop = '0.5rem'
    h.style.marginBottom = '0.5rem'
    h.style.fontWeight = 'bold'
  })

  // Apply styles to lists
  const lists = fluxContentRef.value.querySelectorAll('ul, ol')
  lists.forEach((list) => {
    list.style.paddingLeft = '1.5rem'
    list.style.marginBottom = '1rem'
  })

  // Apply styles to images
  const images = fluxContentRef.value.querySelectorAll('img')
  images.forEach((img) => {
    img.style.maxWidth = '100%'
    img.style.height = 'auto'
    img.style.borderRadius = '0.25rem'
  })

  // Apply styles to blockquotes
  const blockquotes = fluxContentRef.value.querySelectorAll('blockquote')
  blockquotes.forEach((quote) => {
    quote.style.borderLeft = '3px solid #ccc'
    quote.style.paddingLeft = '1rem'
    quote.style.fontStyle = 'italic'
    quote.style.margin = '1rem 0'
  })
}
</script>

<template>
  <div v-if="props.post" class="m-2">
    <UCard
      variant="subtle"
      class="w-full my-6 mx-auto bg-uranium dark:bg-graphite"
      :ui="{ header: 'py-2', footer: 'py-2' }"
    >
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
  line-height: 1.5;
}

.flux-content :deep(a) {
  color: var(--color-cherenkov);
  text-decoration: underline;
}

.flux-content :deep(h1),
.flux-content :deep(h2),
.flux-content :deep(h3) {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
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
  border-left: 3px solid #ccc;
  padding-left: 1rem;
  font-style: italic;
  margin: 1rem 0;
}
</style>
