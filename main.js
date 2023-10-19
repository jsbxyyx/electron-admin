const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('node:path');
const { fork } = require('node:child_process');
const fs = require('fs');
const os = require("os");
const util = require("./util");

var isDev;
var goUrl = '';
var version = "2";

function prepare() {
    console.log("__dirname:", __dirname);
    const paths = fs.readdirSync(__dirname);
    paths.forEach(function (p) {
        console.log("file:", p);
    });

    if (isDev) {
        const backend = require("./backend/index.js");
    } else {
        const base_dir = os.homedir();

        var versionfile = path.join(base_dir, "./.electron-admin.v")
        const dest = path.join(base_dir, './backend/');

        var copy = false;
        if (!fs.existsSync(versionfile)) {
            fs.writeFileSync(versionfile, version);
            copy = true;
        } else {
            var fversion = fs.readFileSync(versionfile).toString("utf-8");
            if (version != fversion || !fs.existsSync(dest)) {
                fs.writeFileSync(versionfile, version);
                copy = true;
            }
        }
        console.log("copy:", copy);
        if (copy) {
            const src = path.join(__dirname, './backend/');
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest);
            }
            util.copyDir(src, dest);
            util.finish();
        }
        const backend_path = path.join(base_dir, "./backend/index.js");
        while (!fs.existsSync(backend_path)) {
        }
        console.log("start server.");
        console.log("backend_path:", backend_path);
        const backend = require(backend_path);
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

