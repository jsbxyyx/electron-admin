const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('node:path');
const { fork } = require('node:child_process');
const fs = require('fs');
const os = require("os");

var isDev;
var goUrl = '';
var version = 1;

function prepare() {
    console.log("__dirname:", __dirname);
    const paths = fs.readdirSync(__dirname);
    paths.forEach(function (p) {
        console.log("file:", p);
    });

    if (isDev) {
        const backend = require("./backend/index.js");
    } else {
        var versionfile = path.join(os.tmpdir(), "./electron-admin.v")
        var copy = false;
        if (!fs.existsSync(versionfile)) {
            fs.writeFileSync(versionfile, version);
            copy = true;
        } else {
            var fversion = fs.readFileSync(versionfile).toString("utf-8");
            if (version != fversion) {
                copy = true;
            }
        }
        console.log("copy:", copy);
        if (copy) {
            const dest = path.join(os.tmpdir(), './backend/');
            fs.rmSync(dest, {recursive: true});
            const src = path.join(__dirname, './backend/');
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest);
                fs.cpSync(src, dest, {recursive: true});
            }
        }
        console.log("start server.");
        setTimeout(() => {
            const backend = require(path.join(os.tmpdir(), "./backend/index.js"));
        }, 500);
    }
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
    if (isDev) {
        mainWindow.webContents.openDevTools();
        goUrl = "http://127.0.0.1:8080/public"
    } else {
        goUrl = "http://127.0.0.1:8888/public/index.html";
    }
    console.log("isDev:", isDev);
    console.log("goUrl:", goUrl);
    mainWindow.loadFile('index.html');
    setTimeout(() => {
        mainWindow.webContents.send('go-url', goUrl);
    }, 2000);
}

app.whenReady().then(() => {
    isDev = !app.isPackaged;
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
        app.quit();
    }
});

