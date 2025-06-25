<template>
  <h3>{{ isNew ? 'New' : 'Edit' }} Video Details</h3>
  <div v-if="!state">
    <p class="text-gray-500">Loading...</p>
  </div>
  <div v-else class="mb-4">
    <UForm :schema="schema" :state="state" @submit.prevent="onSubmit" class="space-y-4">
      <UFormField label="Label" hint="For internal use">
        <UInput v-model="state.label" class="w-full" />
      </UFormField>
      <UFormField label="Image URL">
        <UInput v-model="state.url" class="w-full" />
      </UFormField>
      <div class="flex gap-2 mt-4">
        <UButton type="submit">Save</UButton>
        <UButton @click="onCancel" color="warning">Cancel</UButton>
      </div>
    </UForm>

    <div v-if="state.url && state.url.trim().length > 0" class="mt-4">
      <h3>Preview</h3>
      <UButton @click="showPreview = !showPreview" class="mb-2">
        {{ showPreview ? 'Hide Preview' : 'Show Preview' }}
      </UButton>
      <div v-if="showPreview" class="mb-4">
        <p class="text-gray-500">Preview of the video:</p>
        <video controls class="w-full max-w-2xl">
          <source :src="state.url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps<{ block: any; isNew: boolean }>()
const emit = defineEmits(['submit', 'cancel'])

const showPreview = ref(false)

const schema = z.object({
  label: z.string(),
  url: z.string(),
})
type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({
  label: '',
  url: '',
})

onMounted(() => {
  state.label = props.block.label || ''
  state.url = props.block.url || ''
})

watch(
  () => props.block,
  (val) => {
    state.label = val?.label || ''
    state.url = val?.url || ''
  },
)

const onCancel = () => {
  emit('cancel')
}
const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
  emit('submit', { ...props.block, ...state })
}
</script>
