<template>
  <h3>Is Something Wrong?</h3>
  <p>
    If you believe this flux is not right for our community, please flag it for review. We will take
    a look and find a resolution.
  </p>
  <UCheckboxGroup v-model="reasons" value-key="code" :items="reasonCodes" multiple class="w-full" />

  <UTextarea v-model="message" />
  <UButton @click="handleSubmit" label="Flag It" />
</template>

<script setup lang="ts">
import { UCheckboxGroup } from '#components'
import type { CheckboxGroupValue } from '@nuxt/ui'
import type { ReasonCodeType } from '~/types/won-types'

const props = defineProps(['fluxId'])
const flagSvc = useFlagService()
const toast = useToast()

const reasonCodes = ref<ReasonCodeType[]>([])
const reasons = ref<CheckboxGroupValue[]>([])
const message: Ref<string> = ref('')

reasonCodes.value = await flagSvc.fetchReasonCodes()

const handleSubmit = async () => {
  const result = await flagSvc.flagFlux(props.fluxId, reasons.value as string[], message.value)
  if (result) {
    toast.add({
      title: 'Got it!',
      description: 'Thank you for your feeback.',
    })
  }
}
</script>

<style scoped></style>
