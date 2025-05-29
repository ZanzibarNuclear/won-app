<template>
  <UContainer class="w-3/4">
    <h3>Is Something Wrong?</h3>
    <p class="my-4">
      If you believe this flux is not right for our community, please flag it for review. We will
      take a look and find a resolution.
    </p>
    <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
      <UFormField
        label="Flags"
        name="reasons"
        description="Select one or more reasons for flagging this?"
      >
        <UCheckboxGroup
          v-model="state.reasons"
          value-key="code"
          :items="reasonCodes"
          multiple
          class="w-full"
        />
      </UFormField>
      <UFormField label="Comment" name="message" :hint="charCountdown">
        <UTextarea v-model="state.message" class="w-full" />
      </UFormField>
      <UButton type="submit" label="Flag It" />
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { ReasonCodeType } from '~/types/won-types'

const MAX_MSG_LENGTH = 20
const schema = z.object({
  reasons: z.array(z.string()).min(1, 'Choose at least one reason.'),
  message: z.string().length(MAX_MSG_LENGTH).optional(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  reasons: undefined,
  message: undefined,
})

const charCountdown = computed(() => {
  const remaining = MAX_MSG_LENGTH - (state.message ? state.message.length : 0)
  return `${remaining} characters left`
})

const props = defineProps(['fluxId'])
const flagSvc = useFlagService()

const reasonCodes = ref<ReasonCodeType[]>([])
reasonCodes.value = await flagSvc.fetchReasonCodes()
const toast = useToast()
const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
  console.log('you click the button, now what?')
  const result = await flagSvc.flagFlux(props.fluxId, event.data.reasons, event.data.message)
  console.log('we called the dang thing. now what?')
  if (result) {
    toast.add({
      title: 'Got it!',
      description: 'Thank you for your feeback.',
    })
  }
}
</script>

<style scoped></style>
