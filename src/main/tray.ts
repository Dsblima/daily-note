import { BrowserWindow, Menu, Tray } from 'electron'
import * as path from 'node:path'

export function createTray(mainWindow: BrowserWindow) {
  const tray = new Tray(
    path.resolve(__dirname, '../../resources/rotionTemplate.png'),
  )

  const menu = Menu.buildFromTemplate([
    { label: 'Daily-Note', enabled: false },
    { type: 'separator' },
    {
      label: 'Login',
      click: () => {
        console.log('Clicked on login')
      },
    },
    {
      label: 'Logout',
      click: () => {
        console.log('Clicked on Help')
      },
    },
    { type: 'separator' },
    {
      label: 'New Document',
      click: () => {
        mainWindow.webContents.send('new-document')
      },
      accelerator: 'CommandOrControl+1',
    },
    { type: 'separator' },
    { label: 'Recent Docs', enabled: false },
    {
      label: 'Doc 1',
    },
    {
      label: 'Doc 2',
    },
    { type: 'separator' },
    { label: 'Close', role: 'quit' },
  ])

  tray.setContextMenu(menu)
}
