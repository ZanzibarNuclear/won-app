<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('blog', () => queryCollection('catalog').first())
const { data: lessons } = await useAsyncData(route.path, () =>
  queryCollection('lessons').where('published', '=', true).all(),
)

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
})

defineOgImageComponent('Saas')
</script>

<template>
  <UContainer>
    <UPageHeader v-bind="page" class="py-[50px]" />

    <UPageBody>
      <UBlogPosts>
        <UBlogPost
          v-for="(lesson, index) in lessons"
          :key="index"
          :to="lesson.path"
          :title="lesson.title"
          :description="lesson.description"
          :image="lesson.image"
          :date="
            new Date(lesson.lastUpdate).toLocaleDateString('en', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          "
          :badge="lesson.badge"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          variant="naked"
          :ui="{
            description: 'line-clamp-2',
          }"
        />
      </UBlogPosts>
    </UPageBody>
  </UContainer>
</template>
