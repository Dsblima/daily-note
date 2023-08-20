import { Document } from '@shared/types/ipc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'phosphor-react'

export function CreatePage() {
  const queryClient = useQueryClient()

  const { isLoading: isCreatingNewDocument, mutateAsync: CreatDocument } =
    useMutation(
      async () => {
        const response = await window.api.createDocument()

        return response.data
      },
      {
        onSuccess: (data) => {
          queryClient.setQueriesData<Document[]>(['documents'], (douments) => {
            if (douments && douments.length >= 0) {
              return [...douments, data]
            } else {
              return [data]
            }
          })
        },
      },
    )

  return (
    <button
      onClick={() => CreatDocument()}
      disabled={isCreatingNewDocument}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
    >
      <Plus className="h-4 w-4" />
      Create new document
    </button>
  )
}
