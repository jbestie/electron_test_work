const {app, BrowserWindow} = require('electron');
const path = require('path')

let mainWindow = null;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true
        }
    });

    mainWindow.webContents.loadFile('app/index.html');

    // // Open the DevTools.
    // mainWindow.webContents.openDevTools()
});