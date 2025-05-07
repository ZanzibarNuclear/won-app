<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('blog', () => queryCollection('headlines').first())
const { data: posts } = await useAsyncData(route.path, () =>
  queryCollection('posts').where('published', '=', true).order('postedAt', 'DESC').all(),
)

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
})

const { cdnEndpoint } = useRuntimeConfig().public

const modifyCdnImageSrc = (image: any) => {
  if (image.src.indexOf('http') === 0) {
    return image
  } else {
    const modified = Object.assign({}, image, { src: `${cdnEndpoint}/images/${image.src}` })
    return modified
  }
}

defineOgImageComponent('Saas')
</script>

<template>
  <UContainer>
    <UPageHeader v-bind="page" class="py-[50px]" />

    <UPageBody>
      <UBlogPosts>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          :to="post.path"
          :title="post.title"
          :description="post.description"
          :image="modifyCdnImageSrc(post.image)"
          :date="
            new Date(post.lastUpdate || '2025-01-01').toLocaleDateString('en', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          "
          :badge="post.badge"
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
