const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('fs');

var goUrl = '';

function prepare() {
    const paths = fs.readdirSync(__dirname);
    paths.forEach(function (p) {
        console.log("file:", p);
    });
}

function createServerProcess(mainWindow) {
    // 开发环境
    const backend = require('./backend/index');
    backend.start(() => {
        mainWindow.webContents.send('go-url', goUrl);
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
        goUrl = "http://127.0.0.1:8080"
    } else {
        goUrl = "http://127.0.0.1:8888/index.html";
    }
    console.log("packaged:", packaged);
    console.log("goUrl:", goUrl);
    mainWindow.loadFile('index.html');
    return mainWindow
}

app.whenReady().then(() => {
    prepare();
    mainWindow = createWindow();
    createServerProcess(mainWindow);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

