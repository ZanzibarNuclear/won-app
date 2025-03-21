<script setup lang="ts"></script>

<template>
  <UPage>
    <UPageHero
      title="Profiles in Nuclear"
      description="Nuclear energy is about people. And science. And technology. And engineering."
    />

    <UCard variant="outline" class="w-3/4 mx-auto">
      <template #header> Let's give credit where it's due.</template>

      <div>
        And while you're at it, include yourself among the thought leaders.
      </div>

      <template #footer>
        <UButton
          to="/profiles-in-nuclear"
          variant="ghost"
          alt="View all profiles"
        >
          View all profiles
          <UIcon name="i-ph-arrow-right" />
        </UButton>
      </template>
    </UCard>
  </UPage>
</template>

<style scoped></style>
