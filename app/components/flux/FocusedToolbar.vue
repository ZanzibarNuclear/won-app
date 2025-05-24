<template>
  <div class="flex justify-around">
    <Tooltip title="Violates terms"
      ><UIcon v-if="isFlagged" name="i-ph-seal-warning-duotone"
    /></Tooltip>
    <UButton
      v-if="isOwnFlux"
      icon="i-ph-pencil-duotone"
      variant="subtle"
      label="Edit"
      size="sm"
      @click="editFlux"
    />
    <UButton name="i-ph-biohazard-duotone" color="warning" label="Report" @click="openReportForm" />
  </div>
</template>

<script setup lang="ts">
const isFlagged = ref(true)
const isOwnFlux = ref(true)

const editFlux = () => {
  console.log(
    'Open flux composer with this flux loaded. On save should do an update of the content and updatedAt.',
  )
}

const openReportForm = () => {
  alert('This will be a form to submit a report about this flux')
}
</script>

<style scoped></style>
