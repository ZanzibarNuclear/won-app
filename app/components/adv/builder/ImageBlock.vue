<template>
  <h3>Image Details</h3>
  <div v-if="!state">
    <p class="text-gray-500">Loading...</p>
  </div>
  <div v-else class="mb-4">
    <UForm @submit.prevent="onSubmit" class="space-y-4">
      <UFormField label="Label" hint="For internal use">
        <UInput v-model="state.label" class="w-full" />
      </UFormField>
      <UFormField label="Image URL">
        <UInput v-model="state.imageSrc" class="w-full" />
      </UFormField>
      <UFormField label="Position">
        <USelect
          v-model="state.position"
          :options="positionOptions"
          placeholder="Select position"
        />
      </UFormField>
      <UFormField label="Caption">
        <UInput v-model="state.caption" class="w-full" />
      </UFormField>
      <div class="flex gap-2 mt-4">
        <UButton type="submit">Save</UButton>
        <UButton @click="onCancel" color="warning">Cancel</UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps<{ block: any }>()
const emit = defineEmits(['submit', 'cancel'])

const schema = z.object({
  label: z.string(),
  imageSrc: z.string(),
  position: z.string(),
  caption: z.string(),
})
type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({
  label: '',
  imageSrc: '',
  position: '',
  caption: '',
})

const positionOptions = [
  { value: 'float-left', label: 'Float Left' },
  { value: 'float-right', label: 'Float Right' },
  { value: 'center', label: 'Center' },
  { value: 'full-width', label: 'Full Width' },
  { value: 'inline', label: 'Inline' },
]

onMounted(() => {
  state.label = props.block.label || ''
  state.imageSrc = props.block.imageSrc || ''
  state.position = props.block.position || 'float-left'
  state.caption = props.block.caption || ''
})

const onCancel = () => {
  emit('cancel')
}
const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
  emit('submit', { ...props.block, ...event.data })
}
</script>
