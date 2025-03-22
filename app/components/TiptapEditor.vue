<template>
  <div>
    <div v-if="editor">
      <UButton
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        bold
      </UButton>
      <UButton
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        italic
      </UButton>
      <UButton
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        strike
      </UButton>
      <UButton
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
        @click="editor.chain().focus().toggleCode().run()"
      >
        code
      </UButton>
      <UButton @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </UButton>
      <UButton @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </UButton>
      <UButton
        :class="{ 'is-active': editor.isActive('paragraph') }"
        @click="editor.chain().focus().setParagraph().run()"
      >
        paragraph
      </UButton>
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        h1
      </UButton>
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        h2
      </UButton>
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        h3
      </UButton>
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      >
        h4
      </UButton>
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      >
        h5
      </UButton>
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      >
        h6
      </UButton>
      <UButton
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        bullet list
      </UButton>
      <UButton
        :class="{ 'is-active': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        ordered list
      </UButton>
      <UButton
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        code block
      </UButton>
      <UButton
        :class="{ 'is-active': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        blockquote
      </UButton>
      <UButton @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </UButton>
      <UButton @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </UButton>
      <UButton
        :disabled="!editor.can().chain().focus().undo().run()"
        @click="editor.chain().focus().undo().run()"
      >
        undo
      </UButton>
      <UButton
        :disabled="!editor.can().chain().focus().redo().run()"
        @click="editor.chain().focus().redo().run()"
      >
        redo
      </UButton>
    </div>
    <TiptapEditorContent :editor="editor" />
  </div>
</template>

<script setup>
const editor = useEditor({
  content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  extensions: [TiptapStarterKit],
});

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>
