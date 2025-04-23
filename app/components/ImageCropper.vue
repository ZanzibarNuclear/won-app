<template>
  <div>
    <h2>Image Cropper</h2>
  </div>
  <cropper
    class="cropper"
    :stencil-component="$options.components.CircleStencil"
    :src="src"
    @change="change"
  />
</template>

<script>
import { CircleStencil, Cropper } from 'vue-advanced-cropper'

export default {
  components: {
    Cropper,
    CircleStencil,
  },
  props: ['src'],
  data() {
    return {
      img: 'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=991&q=80',
    }
  },
  methods: {
    change({ coordinates, canvas }) {
      console.log(coordinates, canvas)
    },
  },
}
</script>

<style scoped>
.cropper {
  height: 400px;
  width: 400px;
  background: #444;
}
</style>
