<template>
  <UModal title="Reason Codes">
    <UButton label="Reason Codes" class="mx-auto" />
    <template #content>
      <div class="grid grid-cols-[1fr_3fr] gap-2 my-4 w-3/4 mx-auto">
        <div class="font-bold">Code</div>
        <div class="font-bold">Description</div>
        <template v-for="reason in reasons">
          <div>{{ reason.code }}</div>
          <div>{{ reason.description }}</div>
        </template>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { ReasonCodeType } from '~/types/won-types'

const flagSvc = useFlagService()

const reasons = ref<ReasonCodeType[]>([])
onMounted(async () => {
  reasons.value = await flagSvc.fetchReasonCodes()
})
</script>

<style scoped></style>
