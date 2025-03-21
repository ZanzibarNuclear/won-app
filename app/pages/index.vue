<template>
  <NuxtLink :to="{ name: 'art-gallery' }">
    <InspirationalOpener />
  </NuxtLink>
</template>

<script setup>
definePageMeta({
  layout: "entryway",
});

const toast = useToast();

onMounted(() => {
  const cookie = useCookie("cookie-consent");
  if (cookie.value === "accepted" || cookie.value === "denied") {
    return;
  }

  toast.add({
    title:
      "We use first-party cookies to enhance your experience on our website.",
    duration: 0,
    close: false,
    actions: [
      {
        label: "Accept",
        color: "neutral",
        variant: "outline",
        onClick: () => {
          cookie.value = "accepted";
        },
      },
      {
        label: "Opt out",
        color: "neutral",
        variant: "ghost",
        onClick: () => {
          cookie.value = "denied";
        },
      },
    ],
  });
});
</script>

<style lang="scss" scoped></style>
