"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class ScreenLoader {
    constructor() {
        this._screenMaxDimensions = { x: 1920, y: 1080 };
    }
    handle() {
        return new Promise((resolve, reject) => {
            electron_1.app.whenReady().then(() => {
                this.createWindow();
                resolve();
            }).catch((err) => reject(err));
        });
    }
    createWindow() {
        const screenOpts = {};
        const screenDimensions = this.getScreenXY();
        const windowW = screenDimensions.x;
        const windowH = screenDimensions.y;
        if (windowW > this._screenMaxDimensions.x || windowH > this._screenMaxDimensions.y) {
            screenOpts.width = this._screenMaxDimensions.x,
                screenOpts.height = this._screenMaxDimensions.y,
                screenOpts.resizable = false;
        }
        else {
            screenOpts.width = screenDimensions.x,
                screenOpts.height = screenDimensions.y,
                screenOpts.resizable = true;
        }
        screenOpts.webPreferences = {
            contextIsolation: false,
            nodeIntegration: true
        };
        this._window = new electron_1.BrowserWindow(screenOpts);
        this._window.setMenuBarVisibility(false);
        if (process.env.environment === 'homol') {
            this._window.webContents.loadURL(process.env.development_url || '');
            this._window.webContents.openDevTools();
        }
        electron_1.ipcMain.on('ping', (event, args) => {
            event.sender.send('pong');
        });
    }
    getScreenXY() {
        const display = electron_1.screen.getPrimaryDisplay();
        return {
            x: display.size.width,
            y: display.size.height
        };
    }
}
exports.default = ScreenLoader;
