<template>
  <UUser
    :name="alias || 'Anonymous'"
    :description="handle || ''"
    :avatar="{ src: avatarUrl, icon: 'i-ph-person-duotone' }"
    size="3xl"
  />
</template>

<script setup lang="ts">
interface Props {
  alias?: string
  handle?: string
  avatarSrc?: string
}
const props = defineProps<Props>()
const { defaultAvatarUrl, wonServiceUrl } = useRuntimeConfig().public

const avatarUrl = computed(() => {
  return props.avatarSrc ? wonServiceUrl + props.avatarSrc : defaultAvatarUrl
})
</script>
