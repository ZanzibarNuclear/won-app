<template>
  <NuxtLink :to="{ name: 'art-gallery' }">
    <InspirationalOpener />
  </NuxtLink>
</template>

<script setup>
import { addDays } from 'date-fns'

definePageMeta({
  layout: 'entryway',
})

const toast = useToast()

onMounted(() => {
  const cookieOptions = {
    expires: addDays(new Date(), 365),
  }
  const cookie = useCookie('cookie-consent', cookieOptions)
  if (cookie.value === 'accepted' || cookie.value === 'denied') {
    return
  }

  toast.add({
    title: 'We use first-party cookies to enhance your experience on our website.',
    duration: 0,
    close: false,
    actions: [
      {
        label: 'Accept',
        color: 'neutral',
        variant: 'outline',
        onClick: () => {
          cookie.value = 'accepted'
        },
      },
      {
        label: 'Opt out',
        color: 'neutral',
        variant: 'ghost',
        onClick: () => {
          cookie.value = 'denied'
        },
      },
    ],
  })
})
</script>

<style lang="scss" scoped></style>
