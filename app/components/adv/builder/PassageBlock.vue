<template>
  <h3>{{ isNew ? 'New' : 'Edit' }} Text Passage</h3>
  <div v-if="!state">
    <p class="text-gray-500">Loading...</p>
  </div>
  <div v-else class="mb-4">
    <UForm :schema="schema" :state="state" @submit.prevent="onSubmit" class="space-y-4">
      <UFormField label="Label" hint="For internal use">
        <UInput v-model="state.label" class="w-full" />
      </UFormField>
      <TiptapEditor
        v-if="ready"
        :initialContent="startingContent"
        class="w-full"
        placeholder="The passage goes here..."
        @save-content="handleCommit"
        @cancel-edit="handleCancel"
      />
      <div class="flex gap-2 mt-4">
        <UButton type="submit">Save</UButton>
        <UButton @click="onCancel" color="warning">Cancel</UButton>
      </div>
    </UForm>

    <div v-if="state.html" class="mt-4">
      <h3>Preview</h3>
      <div v-if="showPreview" class="mb-4 border border-cherenkov rounded-lg p-4">
        <div v-html="state.html" class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl"></div>
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
const ready = ref(false)

const startingContent = computed(() => {
  return !!props.block ? props.block.html : undefined
})

const schema = z.object({
  label: z.string(),
  html: z.string(),
})
type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({
  label: '',
  html: '',
})

onMounted(() => {
  state.label = props.block.label || ''
  state.html = props.block.html || ''
  ready.value = true
})

watch(
  () => props.block,
  (val) => {
    state.label = val?.label || ''
    state.html = val?.html || ''
  },
)

const handleCommit = (content: string) => {
  state.html = content
}
const handleCancel = () => {
  state.html = props.block.html || ''
}

const onCancel = () => {
  emit('cancel')
}
const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
  emit('submit', { ...props.block, ...state })
}
</script>
