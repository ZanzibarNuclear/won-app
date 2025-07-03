<template>
  <UCard :ui="cardStyle">
    <template #header>
      {{ chapter.title }}
    </template>
    <div>
      <p>{{ chapter.description }}</p>
      <small>Sequence #: {{ chapter.order }}</small>
    </div>
    <template #footer>
      <UButton
        @click="$emit('edit')"
        icon="i-ph-pencil-duotone"
        size="sm"
        block
        variant="subtle"
        label="Edit Chapter"
      />
    </template>
  </UCard>
</template>

<script setup lang="ts">
defineProps({
  chapter: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      description: '',
      order: 0,
    }),
  },
})
defineEmits(['edit'])

const cardStyle = {
  header: 'p-2 sm:px-2',
  body: 'p-2 sm:p-2',
  footer: 'p-2 sm:px-2',
}
</script>
