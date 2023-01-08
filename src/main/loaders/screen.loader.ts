import { app, BrowserWindow, screen, BrowserWindowConstructorOptions, ipcMain, IpcMainEvent } from 'electron'
import LoaderHandlerInterface from './@shared/loader-handler.interface'

interface ScreenDimensions {
  x: number
  y: number
}

export default class ScreenLoader implements LoaderHandlerInterface {
  private _window!: BrowserWindow
  private _screenMaxDimensions: ScreenDimensions = { x: 1920, y: 1080 }

  handle (): Promise<void> {
    return new Promise((resolve, reject) => {
      app.whenReady().then(() => {
        this.createWindow()
        resolve()
      }).catch((err) => reject(err))
    })
  }

  private createWindow () {
    const screenOpts: BrowserWindowConstructorOptions = {}
    const screenDimensions = this.getScreenXY()
    const windowW = screenDimensions.x
    const windowH = screenDimensions.y

    if (windowW > this._screenMaxDimensions.x || windowH > this._screenMaxDimensions.y) {
      screenOpts.width = this._screenMaxDimensions.x,
      screenOpts.height = this._screenMaxDimensions.y,
      screenOpts.resizable = false
    } else {
      screenOpts.width = screenDimensions.x,
      screenOpts.height = screenDimensions.y,
      screenOpts.resizable = true
    }

    screenOpts.webPreferences = {
      contextIsolation: false,
      nodeIntegration: true
    }

    this._window = new BrowserWindow(screenOpts)
    this._window.setMenuBarVisibility(false)

    if (process.env.environment === 'homol') {
      this._window.webContents.loadURL(process.env.development_url || '')
      this._window.webContents.openDevTools()
    }

    ipcMain.on('ping', (event: IpcMainEvent, args: any[]) => {
      event.sender.send('pong')
    })
  }

  private getScreenXY (): ScreenDimensions {
    const display = screen.getPrimaryDisplay()
    
    return {
      x: display.size.width,
      y: display.size.height
    }
  }
}