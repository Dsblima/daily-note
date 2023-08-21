import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export interface OnContentUpdatedParams {
  title: string
  content: string
}

interface EditorProps {
  content: string
  OnContentUpdate: (params: OnContentUpdatedParams) => void
}

export function Editor({ content, OnContentUpdate }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        document: false,
      }),
      Document.extend({
        content: 'heading block*',
      }),
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: 'Untitled',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none',
      }),
    ],
    onUpdate: ({ editor }) => {
      const Regex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/
      const parsedContent = editor.getHTML().match(Regex)?.groups
      const title = parsedContent?.title ?? 'Untitled'
      const content = parsedContent?.content ?? ''

      OnContentUpdate({
        title,
        content,
      })
    },
    content,
    autofocus: 'end',
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-invert prose-headings:mt-0',
      },
    },
  })

  return <EditorContent className="w-[65ch]" editor={editor}></EditorContent>
}
