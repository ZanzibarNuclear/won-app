<template>
  <UContainer>
    <h3>Resolution</h3>
    <div class="text-sm mb-6 text-cooling-tower dark:text-cooling-tower-dark">
      <div>Dev Notes:</div>
      <ul>
        <li>Let's add some handy action buttons. Block, delete, etc.</li>
        <li>We also need a way to notify the author of the flux.</li>
      </ul>
    </div>
    <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
      <UFormField label="Resolution Note" name="message" description="For internal use only.">
        <UTextarea v-model="state.note" class="w-full" />
      </UFormField>
      <UButton v-if="!done" type="submit" label="Save Resolution" />
      <UButton v-if="done" label="Finish" @click="emit('close')" />
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps(['flag'])
const emit = defineEmits(['close'])

const schema = z.object({
  note: z.string().optional(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  note: undefined,
})

const flagSvc = useFlagService()
const done = ref(false)

const toast = useToast()
const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
  console.log('Resolving flag: %o', event.data)
  // const result = await flagSvc.(props.fluxId, event.data.reasons, event.data.message)
  const result = null
  if (result) {
    toast.add({
      title: 'Got it!',
      description: 'Thank you for your feeback.',
    })
    done.value = true
  } else {
    console.log('noop')
  }
}
</script>

<style scoped>
ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}
</style>
