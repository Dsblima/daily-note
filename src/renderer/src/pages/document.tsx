import { Document as IPCDocument } from '@shared/types/ipc'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Editor, OnContentUpdatedParams } from '../components/Editor'
import { ToC } from '../components/ToC'

export function Document() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery(['document', id], async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const response = await window.api.fetchDocument({ id: id! })

    return response.data
  })

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
    }

    return ''
  }, [data])

  const { mutateAsync: saveDocument } = useMutation(
    async ({ title, content }: OnContentUpdatedParams) => {
      await window.api.saveDocument({
        id: id!,
        title,
        content,
      })
    },
    {
      onSuccess: (_, { title }) => {
        queryClient.setQueryData<IPCDocument[]>(['documents'], (documents) => {
          return documents?.map((document) => {
            if (document.id === id) {
              return { ...document, title }
            }

            return document
          })
        })
      },
    },
  )

  function handleEditorContentUpdated({
    title,
    content,
  }: OnContentUpdatedParams) {
    saveDocument({ title, content })
  }

  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-8">
        <span className="text-rotion-300 font-semibold text-xs">
          Table of Contents
        </span>

        <ToC.Root>
          <ToC.Link>Back-end</ToC.Link>
          <ToC.Section>
            <ToC.Link>Banco de Dados</ToC.Link>
            <ToC.Link>Autenticação</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && data && (
          <Editor
            content={initialContent}
            OnContentUpdate={handleEditorContentUpdated}
          />
        )}
      </section>
    </main>
  )
}
