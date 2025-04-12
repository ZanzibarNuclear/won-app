<template>
  <div class="cdn-asset">
    <NuxtImg :src="cdnEndpoint + path" alt="Image" />
    <p class="caption">{{ caption }}</p>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
  },
  computed: {
    cdnEndpoint() {
      return process.env.cdnEndpoint || ''
    },
  },
}
</script>

<style scoped>
.cdn-asset {
  text-align: center;
}

.caption {
  margin-top: 8px;
  font-size: 14px;
  color: #555;
}
</style>
