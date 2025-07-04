<template>
  <UContainer>
    <div class="max-w-lg mx-auto mt-8 rounded shadow">
      <NavWonBreadcrumbs />

      <h2 class="text-2xl font-bold text-center mb-4">Adventure Feedback</h2>

      <div v-if="!userStore.isSignedIn" class="text-center space-y-4">
        <p class="text-cooling-tower dark:text-cooling-tower-dark">
          Please sign in to submit your feedback. We take your feedback seriously and want to ensure we can follow up if
          needed.
        </p>
        <p class="text-cooling-tower dark:text-cooling-tower-dark">Once you sign in, we will try to bring you right back
          here.</p>
        <UButton @click="handleGoToSignin" color="primary" block>
          Sign In
        </UButton>
      </div>

      <UForm v-else :schema="schema" :state="state" class="space-y-6" @submit="onSubmit" :disabled="submitted">
        <UFormField label="Feedback Type" name="type" description="What kind of feedback are you providing?">
          <URadioGroup v-model="state.type" :items="feedbackTypes" class="w-full" />
        </UFormField>

        <UFormField label="Your feedback" name="message"
          description="Let us know your thoughts, suggestions, or issues..." hint="Max 500 characters">
          <UTextarea v-model="state.message" placeholder="Tell us what you think..." class="w-full" :rows="5" />
        </UFormField>

        <UButton type="submit" color="primary" :disabled="submitted" block>
          {{ submitted ? 'Thank you!' : 'Submit' }}
        </UButton>
      </UForm>

      <div v-if="submitted" class="mt-4 text-green-600 font-semibold text-center">
        Thank you for your feedback!
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  type: z.enum(['suggestion', 'encouragement', 'problem', 'interest'], {
    required_error: 'Please select a feedback type',
  }),
  message: z.string().min(1, 'Please provide your feedback').max(500, 'Feedback is too long'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  type: undefined,
  message: undefined,
})

const userStore = useUserStore()
const submitted = ref(false)
const toast = useToast()
const feedback = useWonFeedback()

const feedbackTypes = [
  { value: 'suggestion', label: 'Suggestion', description: 'I have an idea for improvement' },
  { value: 'interest', label: 'Interest in Building', description: 'I want to help create an adventure' },
  { value: 'encouragement', label: 'Encouragement', description: 'I want to share positive feedback' },
  { value: 'problem', label: 'Problem', description: 'I found an issue or bug' },
]

function handleGoToSignin() {
  useWonContext().setReturnRoute('/nu-adventure/feedback')
  navigateTo('/sign-in')
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const context = {
    source: 'adventure',
    feedbackType: event.data.type,
  }

  const { status, data } = await feedback.submitUserFeedback(context, event.data.message)

  if (status === 201) {
    toast.add({
      title: 'Success',
      description: 'Thank you for your feedback! We appreciate you taking the time to share your thoughts.',
      color: 'success',
    })
    submitted.value = true
  } else {
    toast.add({
      title: 'Error',
      description: 'Something went wrong while submitting your feedback. Please try again.',
      color: 'error',
    })
  }
}
</script>
