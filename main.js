const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('fs')

function createServerProcess(mainWindow) {
    // 开发环境
    const { start } = require('./backend/index');
    start(() => {
        mainWindow.webContents.send('server-ready', 1);
    });
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    // Menu.setApplicationMenu(null)
    const packaged = app.isPackaged
    if (!packaged) {
        mainWindow.webContents.openDevTools();
        mainWindow.webContents.send('go-url', "http://127.0.0.1:8080");
    } else {
        mainWindow.webContents.send('go-url', "http://127.0.0.1:8888/index.html");
    }
    mainWindow.loadFile('index.html');

    const paths = fs.readdirSync(__dirname);
    paths.forEach(function (p) {
        console.log("file:", p);
    })
    return mainWindow
}

app.whenReady().then(() => {
    mainWindow = createWindow()
    createServerProcess(mainWindow);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

