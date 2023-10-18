const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('node:path');
const { fork } = require('node:child_process');
const fs = require('fs');

var goUrl = '';
var serverProcess;

function prepare() {
    const paths = fs.readdirSync(__dirname);
    paths.forEach(function (p) {
        console.log("file:", p);
    });

    const backend = require("./backend/index.js");

    // serverProcess = fork(require.resolve('./backend/index.js'))
    // serverProcess.on('close', code => {
    //     console.log('子线程已经退出', code)
    // })
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
    setTimeout(() => {
        mainWindow.webContents.send('go-url', goUrl);
    }, 2000);
}

app.whenReady().then(() => {
    prepare();
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        if (serverProcess) {
            process.kill(serverProcess.pid);
        }
    }
});

