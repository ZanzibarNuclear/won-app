<template>
  <UForm @submit.prevent="submit">
    <UFormField label="Label">
      <UInput v-model="state.label" />
    </UFormField>
    <UFormField label="Image URL">
      <UInput v-model="state.imageSrc" />
    </UFormField>
    <UFormField label="Position">
      <USelect
        v-model="state.position"
        :options="[
          { label: 'Float Left', value: 'float-left' },
          { label: 'Float Right', value: 'float-right' },
          { label: 'Center', value: 'center' },
          { label: 'Inline', value: 'inline' },
        ]"
        placeholder="Select position"
      />
    </UFormField>
    <UFormField label="Caption">
      <UInput v-model="state.caption" />
    </UFormField>
    <div class="flex gap-2 mt-4">
      <UButton type="submit">Save</UButton>
      <UButton @click="onCancel" color="warning">Cancel</UButton>
    </div>
  </UForm>
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
  label: undefined,
  imageSrc: undefined,
  width: undefined,
  caption: undefined,
})

const localBlock = ref({ ...props.block })

watch(
  () => props.block,
  (newBlock) => {
    localBlock.value = { ...newBlock }
  },
)

const onCancel = () => {
  emit('cancel')
}
const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
  emit('submit', { ...props.block, ...event.data })
}
</script>
