<script setup lang="ts">
import type { NuxtError } from '#app'

const feedback = useWonFeedback()
const errorReported = ref(false)
const toast = useToast()

const props = defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true,
  },
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})

// Set SEO meta based on error type
const errorCode = computed(() => props.error.statusCode || 500)
const errorMessage = computed(() => {
  if (errorCode.value === 404) {
    return 'Page not found'
  }
  return props.error.message || 'An unexpected error occurred'
})

useSeoMeta({
  title: () => `${errorCode.value} - ${errorMessage.value}`,
  description: () => {
    if (errorCode.value === 404) {
      return 'We are sorry but this page could not be found.'
    }
    return 'We apologize for the inconvenience. Please try again later.'
  },
})

// Suggested navigation links for users
const suggestedLinks = [
  {
    label: 'Adventure',
    icon: 'i-ph-person-simple-hike-duotone',
    to: '/nu-adventure',
  },
  {
    label: 'Flux',
    icon: 'i-ph-lightning-duotone',
    to: '/flux-app',
  },
  {
    label: 'Lessons',
    icon: 'i-ph-student-duotone',
    to: '/get-smarter',
  },
  {
    label: 'Essays',
    icon: 'i-ph-newspaper-clipping-duotone',
    to: '/news-and-views',
  },
  {
    label: 'Art Gallery',
    icon: 'i-ph-image-duotone',
    to: '/art-gallery',
  },
  {
    label: "Who's Who",
    icon: 'i-ph-user-rectangle-duotone',
    to: '/profiles-in-nuclear',
  },
]

// Handle error reporting
const handleReport = () => {
  // You can implement error reporting logic here
  // For example, sending the error to a monitoring service
  feedback.submitUserFeedback({ error: props.error }, 'Someone experienced an error using WoN')

  toast.add({
    title: 'Thank you.',
    description: 'The fine folks who run the World of Nuclear have been notified.',
  })
  errorReported.value = true
}
</script>

<template>
  <div>
    <StandardHeader />

    <UMain>
      <UContainer class="py-16">
        <UCard class="max-w-2xl mx-auto">
          <template #header>
            <div class="flex items-center justify-center mb-4">
              <UIcon
                name="i-ph-triangle-duotone"
                class="text-5xl text-orange-500 dark:text-orange-400"
              />
            </div>
            <h1 class="text-3xl font-bold text-center">{{ errorCode }} Error</h1>
            <p class="text-center text-gray-500 dark:text-gray-400 mt-2">{{ errorMessage }}</p>
          </template>

          <div class="space-y-4">
            <p v-if="errorCode === 404">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p v-else>We've encountered an unexpected error. Our team has been notified.</p>

            <div class="flex flex-col space-y-2">
              <UButton
                to="/"
                color="primary"
                block
                icon="i-ph-globe-duotone"
                label="Return to Home"
              />
              <UButton
                v-if="errorCode !== 404"
                color="gray"
                variant="ghost"
                block
                icon="i-ph-flag-duotone"
                label="Report this issue"
                :disabled="errorReported"
                @click="handleReport"
              />
            </div>
          </div>

          <template #footer>
            <div class="space-y-4">
              <p class="font-medium">You might want to check out:</p>
              <div class="grid grid-cols-2 gap-2">
                <UButton
                  v-for="link in suggestedLinks"
                  :key="link.to"
                  :to="link.to"
                  :icon="link.icon"
                  :label="link.label"
                  color="gray"
                  variant="soft"
                  block
                />
              </div>
            </div>
          </template>
        </UCard>
      </UContainer>
    </UMain>

    <StandardFooter />

    <UToaster />
  </div>
</template>
