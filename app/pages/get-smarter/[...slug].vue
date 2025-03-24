<script setup lang="ts">
const route = useRoute()

const { data: lesson } = await useAsyncData(route.path, () =>
  queryCollection('lessons').where('published', '=', true).path(route.path).first(),
)
if (!lesson.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found',
    fatal: true,
  })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('lessons', route.path, {
    fields: ['description'],
  }).where('published', '=', true)
})

const { title, description, lastUpdate } = lesson.value

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})

if (lesson.value.image?.src) {
  defineOgImage({
    url: lesson.value.image.src,
  })
} else {
  defineOgImageComponent('Saas', {
    headline: 'Blog',
  })
}
</script>

<template>
  <UContainer v-if="lesson">
    <UPageHeader :title="title" :description="description">
      <template #headline>
        <UBadge v-bind="lesson.badge" variant="subtle" />
        <span class="text-(--ui-text-muted)">&middot;</span>
        <time class="text-(--ui-text-muted)">{{
          new Date(lastUpdate || '2025-01-01').toLocaleDateString('en', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        }}</time>
      </template>
    </UPageHeader>

    <UPage>
      <UPageBody>
        <ContentRenderer v-if="lesson" :value="lesson" />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template v-if="lesson?.body?.toc?.links?.length" #right>
        <UContentToc :links="lesson.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>
