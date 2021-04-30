const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path')
const fs = require('fs');
const jks = require('jks-js');
const X509Cert = require('jks-js/lib/certs/X509Cert');

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
    // const keystore = jks.toPem(
    //     fs.readFileSync('keystore/server.keystore'),
    //     'changeit1'
    // );

    // const { cert, key } = keystore['test'];
    //
    // console.log(cert);
    // console.log(key);

    const keystoreData = jks.parseJks( fs.readFileSync('keystore/server.keystore'),
        'changeit1');

    keystoreData.forEach( entry => {
        console.log(entry.alias);
        console.log(jks.decrypt(entry.protectedPrivateKey, 'changeit2'));
        console.log(new X509Cert().generate(entry.chain[0].value));
    })

    // const { cert, key } = keystore['test'];
    // console.log(cert);
    // console.log(jks.decrypt(key, 'changeit2'));
    // const decryptedKey = jks.decrypt(key, 'changeit2');
    // console.log(decryptedKey)
    // console.log("Clicked on URL")
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