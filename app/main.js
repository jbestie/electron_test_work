const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path')

let mainWindow = null;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
        }
    });

    mainWindow.webContents.loadFile('app/index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // // Open the DevTools.
    // mainWindow.webContents.openDevTools()
});

ipcMain.handle("onUrlClicked", () => {
    console.log("Clicked on URL")
});

ipcMain.handle("onInputTyping", (e, args) => {
    console.log(`Typed ${args}`)
});

ipcMain.handle("goToSecondPage", () => {
    mainWindow.webContents.loadFile('app/second.html');
});

ipcMain.handle("goToFirstPage", () => {
    mainWindow.webContents.loadFile('app/index.html');
});