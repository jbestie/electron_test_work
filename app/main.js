const {app, BrowserWindow} = require('electron');
const path = require('path')

let mainWindow = null;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            enableRemoteModule: true
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

exports.onUrlClick = () => {
    console.log("Clicked on URL")
};

exports.onInputTyping = (typed) => {
    console.log(`Typed ${typed}`)
}

exports.goToSecondPage = () => {
    mainWindow.webContents.loadFile('app/second.html');
}

exports.goToFirstPage = () => {
    mainWindow.webContents.loadFile('app/index.html');
}