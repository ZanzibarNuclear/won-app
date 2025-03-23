<script setup lang="ts">
const props = defineProps({
  post: { type: Object, default: null },
});

onMounted(() => {
  if (!props.post) {
    console.log("Must be a new post. Have fun.");
  }
});

const savePost = (content: string) => {
  console.log(content);
};

const cancelPost = () => {
  console.log();
};
</script>

<template>
  <div>
    <TiptapEditor
      :initial-content="props.post?.postContent"
      placeholder="What's nu(clear)?"
      save-button-label="Flux it"
      save-button-icon="ph:lightning"
      @save-content="savePost"
      @cancel-edit="cancelPost"
    />
  </div>
</template>

<style scoped></style>
