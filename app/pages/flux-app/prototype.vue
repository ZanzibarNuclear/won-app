<template>
  <div>
    <FluxPostCard
      v-for="post in fluxData"
      :key="post.postKey"
      :post-key="post.postKey"
      :posted-at="post.postedAt"
      :author="post.author"
      :stats="post.stats"
      :post-content="post.postContent"
    />
  </div>
</template>

<script setup lang="ts">
import type { FluxPost } from "~/types";

const fluxData = computed((): FluxPost[] => {
  return [
    {
      postKey: "kjk34kj2o9",
      postedAt: "2025-03-21T18:32:37Z",
      author: {
        display: "Zanzibar",
        handle: "the_real_zanzi",
        avatar: "/images/Zanzibar.jpg",
      },
      stats: {
        reactions: 3,
        views: 120,
        boosts: 4,
      },
      postContent:
        "<p>Hey, <em>everybody</em>. I think you are <strong>great</strong>!</p>",
    },
    {
      postKey: "kjk34kj2o9",
      postedAt: "2025-03-20T05:32:37Z",
      author: {
        display: "Zanzibar",
        handle: "the_real_zanzi",
        avatar: "/images/Zanzibar.jpg",
      },
      stats: {
        reactions: 3,
        views: 120,
        boosts: 4,
      },
      postContent:
        "<p>Let's work together to make the world a better place. That means you should clap for the most productive American car company in 40+ years. Be nice.</p>",
    },
    {
      postKey: "kjk34kj2o9",
      postedAt: "2025-03-19T13:32:37Z",
      author: {
        display: "Zanzibar",
        handle: "the_real_zanzi",
        avatar: "/images/Zanzibar.jpg",
      },
      stats: {
        reactions: 3,
        views: 120,
        boosts: 4,
      },
      postContent:
        "<p>This</p><p>is</p><p>the</p><p>moment.</p><p class='text-center'>Do something great. Be a winner!</p>",
    },
    {
      postKey: "kjk34kj2o9",
      postedAt: "2025-03-18T18:32:37Z",
      author: {
        display: "Zanzibar",
        handle: "the_real_zanzi",
        avatar: "/images/Zanzibar.jpg",
      },
      stats: {
        reactions: 3,
        views: 120,
        boosts: 4,
      },
      postContent:
        "<p>You are the one who can make it happen.</p><p>Be the change you want to see in the world.</p><p>Get out there and win one for the Gipper.</p><p>What's a Gipper?</p>",
    },
  ];
});
</script>

<style scoped></style>
