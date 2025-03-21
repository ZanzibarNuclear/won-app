<script setup lang="ts">
const columns = [
  {
    label: "Features",
    children: [
      {
        label: "Adventure",
      },
      {
        label: "Flux (Social)",
      },
      {
        label: "Lessons",
      },
      {
        label: "Essays",
      },
      {
        label: "Profiles",
      },
    ],
  },
  {
    label: "Connections",
    children: [
      {
        label: "Zanzibar on X",
      },
      {
        label: "WoN on Discord",
      },
      {
        label: "Zanzibar's Nuclear Stack",
      },
      {
        label: "Opinions and Observations",
      },
    ],
  },
  {
    label: "Company",
    children: [
      {
        label: "About",
      },
      {
        label: "Terms of Use",
      },
      {
        label: "Privacy",
      },
      {
        label: "Contact Us",
      },
    ],
  },
];

const toast = useToast();

const email = ref("");
const loading = ref(false);

function onSubmit() {
  loading.value = true;

  toast.add({
    title: "Subscribed!",
    description: "You've been subscribed to our newsletter.",
  });
}
</script>

<template>
  <USeparator :avatar="{ src: '/images/radiation-symbol.svg' }" class="h-px" />
  <UFooter :ui="{ top: 'border-b border-[var(--ui-border)]' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #right>
            <form @submit.prevent="onSubmit">
              <UFormField
                name="email"
                label="Subscribe to our newsletter"
                size="lg"
              >
                <UInput
                  v-model="email"
                  type="email"
                  class="w-full"
                  placeholder="Enter your email"
                >
                  <template #trailing>
                    <UButton
                      type="submit"
                      size="xs"
                      color="neutral"
                      label="Subscribe"
                    />
                  </template>
                </UInput>
              </UFormField>
            </form>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-(--ui-text-muted) text-sm">
        Copyright © {{ new Date().getFullYear() }} Nuclear Ambitions LLC. All
        rights reserved.
      </p>
    </template>

    <template #right>
      <UColorModeButton />

      <UButton
        to="https://github.com/ZanzibarNuclear"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
