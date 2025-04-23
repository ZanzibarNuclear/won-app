<template>
  <NuxtImg :src="imageUrl" />
</template>

<script setup lang="ts">
interface Props {
  src?: string
}
const props = defineProps<Props>()
const { defaultProfilePicUrl, wonServiceUrl } = useRuntimeConfig().public

const imageUrl = computed(() => {
  return props.src ? wonServiceUrl + props.src : defaultProfilePicUrl
})
</script>
