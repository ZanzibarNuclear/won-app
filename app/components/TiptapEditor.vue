<template>
  <ClientOnly>
    <TiptapToolbarHappyMedium class="m-4 text-center" :editor="editor" />
    <TiptapEditorContent
      :editor="editor"
      class="border border-uranium p-4 m-2"
    />
  </ClientOnly>
  <UButton
    :label="saveButtonLabel"
    :icon="saveButtonIcon"
    size="sm"
    :disabled="!isSaveable"
    @click="onSave"
  />
</template>

<script setup>
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";

const props = defineProps({
  initialContent: { type: String, default: "" },
  placeholder: { type: String, default: "What's going on?" },
  saveButtonLabel: { type: String, default: "Save" },
  saveButtonIcon: { type: String, default: "ph:cloud-arrow-up" },
});
const emit = defineEmits(["saveContent", "cancelEdit"]);

const editor = useEditor({
  autofocus: "start",
  content: props.initialContent,
  editorProps: {
    attributes: {
      class:
        "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
    },
  },
  extensions: [
    TiptapStarterKit,
    TiptapPlaceholder.configure({
      emptyEditorClass: "is-editor-empty",
      placeholder: props.placeholder,
    }),
    BulletList.configure({
      HTMLAttributes: {
        class: "list-disc pl-6", // Tailwind classes for bullets and padding
      },
    }),
    OrderedList.configure({
      HTMLAttributes: {
        class: "list-decimal pl-6",
      },
    }),
    ListItem.configure({
      HTMLAttributes: {
        class: "", // Indentation for list items
      },
    }),
  ],
});

// onMounted(() => {
//   if (props.content && !!unref(editor)) {
//     unref(editor).commands.setContent(props.initialContent);
//   }
// });

onBeforeUnmount(() => {
  unref(editor).destroy();
});

const isSaveable = computed(() => {
  return true;
});

const onSave = () => {
  const doc = editor.value?.getHTML();
  alert(doc);
  emit("saveContent", doc);
};
</script>

<style lang="scss">
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
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1.1rem;
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
    font-family: "JetBrainsMono", monospace;
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
