<template>
  <UContainer>
    <UPage title="Lessons">
      <UPageHero
        title="Get Smarter"
        description="Try these micro-lessons about nuclear energy. Each one should only take 5 to 10 minutes to read though. The more you study, the better you will understand nuclear energy. So, what are you waiting for?"
      >
        <ImagePlaceholder />
      </UPageHero>

      <template #left>
        <UPageAside>
          <ul>
            <li>Introduction</li>
            <li>Course Catalog</li>
            <li>Lesson Index</li>
            <li>Student Reviews</li>
          </ul>
        </UPageAside>
      </template>

      <UPageBody>
        This is where we tell you something important. Very important. So please
        pay attention.
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
