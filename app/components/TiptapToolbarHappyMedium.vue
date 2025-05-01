<template>
  <div class="w-full">
    <div v-if="editor" class="space-x-1 pt-2">
      <UButton
        :class="{ 'is-active': editor.isActive('bold') }"
        icon="ph:text-b-bold"
        size="sm"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        @click="editor.chain().focus().toggleBold().run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('italic') }"
        icon="ph:text-italic-bold"
        size="sm"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        @click="editor.chain().focus().toggleItalic().run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('strike') }"
        icon="ph:text-strikethrough-bold"
        size="sm"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        @click="editor.chain().focus().toggleStrike().run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('paragraph') }"
        icon="ph:paragraph-bold"
        size="sm"
        @click="editor.chain().focus().setParagraph().run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('bulletList') }"
        icon="ph:list-bullets"
        size="sm"
        @click="editor.chain().focus().toggleBulletList().run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('orderedList') }"
        icon="ph:list-numbers"
        size="sm"
        @click="editor.chain().focus().toggleOrderedList().run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('blockquote') }"
        icon="ph:quotes"
        size="sm"
        @click="editor.chain().focus().toggleBlockquote().run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        icon="ph:text-h-one-bold"
        size="sm"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        icon="ph:text-h-two-bold"
        size="sm"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        icon="ph:text-h-three-bold"
        size="sm"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      />
      <UButton
        icon="ph:text-t-slash"
        size="sm"
        @click="editor.chain().focus().unsetAllMarks().run()"
      />
      <UButton
        icon="ph:arrow-arc-left"
        size="sm"
        :disabled="!editor.can().chain().focus().undo().run()"
        @click="editor.chain().focus().undo().run()"
      />
      <UButton
        icon="ph:arrow-arc-right"
        size="sm"
        :disabled="!editor.can().chain().focus().redo().run()"
        @click="editor.chain().focus().redo().run()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  editor: { type: Object, required: true },
})
</script>

<style scoped></style>
