<script setup lang="ts">
import { formatDate } from '~/utils'
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('posts').where('published', '=', true).path(route.path).first(),
)
if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found',
    fatal: true,
  })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('posts', route.path, {
    fields: ['description'],
  }).where('published', '=', true)
})

const { title, description, lastUpdate } = post.value

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})

if (post.value.image?.src) {
  defineOgImage({
    url: post.value.image.src,
  })
} else {
  defineOgImageComponent('Saas', {
    headline: 'Blog',
  })
}

const modifyCdnImageSrc = (image: any) => {
  if (image.src.indexOf('http') === 0) {
    return image
  } else {
    const modified = Object.assign({}, image, {
      src: `${useRuntimeConfig().public.cdnEndpoint}/images/${image.src}`,
    })
    return modified
  }
}
</script>

<template>
  <UContainer v-if="post">
    <UPageHeader :title="title" :description="description">
      <template #headline>
        <UBadge v-bind="post.badge" variant="subtle" />
        <span class="text-(--ui-text-muted)">&middot;</span>
        <span>{{ formatDate(post.postedAt) }}</span>
      </template>
      <div class="flex flex-wrap items-center gap-3 mt-4">
        <UButton
          v-for="(author, index) in post.authors"
          :key="index"
          :to="author.to"
          color="neutral"
          variant="subtle"
          target="_blank"
          size="sm"
        >
          <UAvatar v-bind="author.avatar" :alt="author.name" size="2xs" />

          {{ author.name }}
        </UButton>
      </div>
      <div v-if="post.image">
        <NuxtImg :src="modifyCdnImageSrc(post.image).src" class="mt-6 max-h-[300px]" />
      </div>
    </UPageHeader>

    <UPage>
      <UPageBody>
        <ContentRenderer v-if="post" :value="post" />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template v-if="post?.body?.toc?.links?.length" #right>
        <UContentToc :links="post.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>
