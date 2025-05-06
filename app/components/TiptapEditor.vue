<template>
  <ClientOnly>
    <div class="space-y-2">
      <!-- <TiptapBubbleMenu :editor="editor" /> -->
      <TiptapEditorContent
        :editor="editor"
        class="editor-container border dark:border-uranium border-graphite rounded-lg p-4"
      />
      <TiptapToolbarTight
        :editor="editor"
        :save-label="saveLabel"
        :save-icon="saveIcon"
        :cancel-label="cancelLabel"
        :cancel-icon="cancelIcon"
        :disabled="!canSave"
        @save="onSave"
        @cancel="confirmCancel = true"
      />
    </div>
    <UModal
      v-model:open="confirmCancel"
      title="Confirm Cancel"
      description="Are you sure you want to cancel?"
    >
      <template #body>
        <div class="flex justify-center space-x-6">
          <UButton @click="onCancel" color="primary" label="Yes" />
          <UButton @click="confirmCancel = false" color="warning" label="No" />
        </div>
      </template>
    </UModal>
  </ClientOnly>
</template>

<script setup>
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'

const props = defineProps({
  initialContent: { type: String, default: '' },
  placeholder: { type: String, default: "What's going on?" },
  saveLabel: { type: String, default: 'Save' },
  saveIcon: { type: String, default: 'ph:cloud-arrow-up' },
  cancelLabel: { type: String, default: 'Cancel' },
  cancelIcon: { type: String, default: 'ph:x-circle' },
})
const emit = defineEmits(['saveContent', 'cancelEdit'])

const editor = useEditor({
  autofocus: 'start',
  content: props.initialContent,
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
  },
  extensions: [
    TiptapStarterKit,
    TiptapPlaceholder.configure({
      emptyEditorClass: 'is-editor-empty',
      placeholder: "What's on your mind?",
    }),
    BulletList.configure({
      HTMLAttributes: {
        class: 'list-disc pl-6', // Tailwind classes for bullets and padding
      },
    }),
    OrderedList.configure({
      HTMLAttributes: {
        class: 'list-decimal pl-6',
      },
    }),
    ListItem.configure({
      HTMLAttributes: {
        class: '', // Indentation for list items
      },
    }),
  ],
})

const confirmCancel = ref(false)

const canSave = computed(() => {
  return true
})

const onSave = () => {
  if (editor.value.isEmpty) {
    // signal that save was clicked but no content
    emit('saveContent', '')
  }
  const doc = editor.value?.getHTML()
  emit('saveContent', doc)
}

const onCancel = () => {
  emit('cancelEdit')
  editor.value?.commands.setContent(props.initialContent)
  confirmCancel.value = false
}

onBeforeUnmount(() => {
  unref(editor).destroy()
})
</script>

<style lang="scss">
.editor-container {
  max-width: 800px;
  margin: 0 auto;
  max-height: 50vh;
  overflow-y: auto;
}

.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    text-wrap: pretty;
    font-weight: bold;
    font-family: var(--font-heading);
  }

  h1 {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  h2 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: var(--color-blue-400);
  }

  h3 {
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1.1rem;
    text-transform: uppercase;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--color-cherenkov);
    margin: 1.5rem 0;
    padding-left: 1rem;

    p {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }
}
</style>
