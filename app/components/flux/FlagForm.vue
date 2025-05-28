<template>
  <h3>Is Something Wrong?</h3>
  <p>
    If you believe this flux is not right for our community, please flag it for review. We will take
    a look and find a resolution.
  </p>
  <USelect v-model="reasons" :items="reasonCodes" multiple class="w-48" />
  <UTextarea v-model="message" />
  <UButton @click="handleSubmit" label="Flag It" />
</template>

<script setup lang="ts">
const props = defineProps(['fluxId'])
const flagSvc = useFlagService()
const toast = useToast()

const reasonCodes: Ref<any> = ref([])
const reasons: Ref<string[]> = ref([])
const message: Ref<string> = ref('')

reasonCodes.value = await flagSvc.fetchReasonCodes()

const handleSubmit = () => {
  flagSvc.flagFlux(props.fluxId, reasons.value, message.value)
  toast.add({
    title: 'Got it!',
    description: 'Thank you for your feeback.',
  })
}
</script>

<style scoped></style>
