<template>
  <div class="max-w-lg mx-auto mt-16 p-6 bg-white rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Feedback</h1>
    <form @submit.prevent="handleSubmit">
      <label for="feedback" class="block mb-2 font-medium">Your feedback</label>
      <UTextarea id="feedback" v-model="feedback" placeholder="Let us know your thoughts, suggestions, or issues..."
        class="mb-4" :rows="5" required />
      <UButton type="submit" color="primary" :disabled="!feedback.trim() || submitted" block>
        {{ submitted ? 'Thank you!' : 'Submit' }}
      </UButton>
    </form>
    <div v-if="submitted" class="mt-4 text-green-600 font-semibold text-center">
      Thank you for your feedback!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const feedback = ref('')
const submitted = ref(false)

function handleSubmit() {
  submitted.value = true
  // In the future, send feedback to the service here
}
</script>
