<template>
  <div>
    <TiptapEditorContent :editor="editor" class="editor-frame shadow-cherenkov" />
    <div v-if="editor" class="mt-2 flex justify-between">
      <div class="flex space-x-1">
        <UButton
          @click="editor.chain().focus().toggleBold().run()"
          color="gray"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          icon="ph:text-bolder-bold"
        />
        <UButton
          @click="editor.chain().focus().toggleItalic().run()"
          color="gray"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          icon="ph:text-italic"
        />
        <UButton
          @click="editor.chain().focus().toggleBulletList().run()"
          color="gray"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          icon="ph:list-bullets"
        />
        <UButton
          @click="editor.chain().focus().toggleOrderedList().run()"
          color="gray"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          icon="ph:list-numbers"
        />
        <UButton
          @click="editor.chain().focus().toggleBlockquote().run()"
          color="gray"
          :class="{ 'is-active': editor.isActive('blockquote') }"
          icon="ph:quotes"
        />
        <UButton
          @click="editor.chain().focus().setParagraph().run()"
          color="gray"
          :class="{ 'is-active': editor.isActive('paragraph') }"
          icon="ph:paragraph"
        />
      </div>
      <div class="ml-auto flex space-x-2">
        <UButton @click="() => (confirmCancel = true)" color="orange" icon="ph:x-circle" />
        <UButton
          @click="handlePostFlux"
          color="blue"
          :label="saveButtonLabel"
          icon="ph:lightning-duotone"
        />
      </div>
    </div>
    <UModal v-model="confirmCancel">
      <UCard>
        <template #header>
          <div class="text-center">Are you sure you want to cancel?</div>
        </template>
        <div class="flex justify-center space-x-6">
          <UButton @click="handleCancelFlux" color="orange" label="Yes" />
          <UButton @click="confirmCancel = false" color="gray" label="No" />
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const props = defineProps({
  initialContent: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: "What's nu(-clear)?",
  },
  saveButtonLabel: {
    type: String,
    default: 'Flux It',
  },
})
const emit = defineEmits(['postFluxMessage', 'cancelFlux'])

const editor = useEditor({
  autofocus: 'start',
  content: props.initialContent,
  extensions: [
    TiptapStarterKit,
    TiptapPlaceholder.configure({
      emptyEditorClass: 'is-editor-empty',
      placeholder: props.placeholder,
    }),
  ],
  editorProps: {
    attributes: {
      class:
        'border-2 bg-white text-slate-700 max-w-none prose prose-stone prose-sm m-0 prose-p:p-1 prose-li:m-0 prose-li:p-0 focus:outline-none',
    },
  },
})

const confirmCancel = ref(false)
const handlePostFlux = () => {
  emit('postFluxMessage', editor.value?.getHTML())
  editor.value?.commands.setContent('')
}

const handleCancelFlux = () => {
  emit('cancelFlux')
  editor.value?.commands.setContent('')
  confirmCancel.value = false
}

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<style>
.editor-frame {
  overflow-y: scroll;
  max-height: 50vh;
}

.tiptap {
  font-size: small;
}

.tiptap p {
  margin: 1em 0;
  font-size: medium;
}

.tiptap ol,
.tiptap ul {
  margin: 1rem 0;
}

.tiptap li p {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
</style>
