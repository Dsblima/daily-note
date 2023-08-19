import { IPC } from '@shared/constants/ipc'
import { FetchAllDocumentsResponse } from '@shared/types/ipc'
import { ipcMain } from 'electron'

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<FetchAllDocumentsResponse> => {
    return {
      data: [
        { id: '1', title: 'Ignite', content: '' },
        { id: '6', title: 'Web', content: '' },
        { id: '5', title: 'Mobile', content: '' },
        { id: '3', title: 'Mac', content: '' },
      ],
    }
  },
)
