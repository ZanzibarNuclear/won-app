<script setup lang="ts">
const props = defineProps({
  post: { type: Object, default: null },
});
if (!props.post) {
  console.log("Must be a new post. Have fun.");
}
</script>

<template>
  <div>
    <TiptapEditor />
  </div>
</template>

<style scoped></style>
