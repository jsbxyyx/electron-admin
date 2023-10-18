const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('node:path');
const { fork } = require('node:child_process');
const fs = require('fs');
const os = require("os");
const { resourceLimits } = require('node:worker_threads');

var isDev;
var goUrl = '';

function delDir(dest) {
    let paths = fs.readdirSync(dest);
    paths.forEach(function (p) {
        const target = path.join(dest, p);
        const st = fs.statSync(target);
        if (st.isFile()) {
            // console.log(`\rDelete File: ${target}`);
            fs.unlinkSync(target);
        }
        if (st.isDirectory()) {
            // console.log(`\rDelete Directory: ${target}`);
            delDir(target);
        }
    });
    paths = fs.readdirSync(dest);
    if (!paths.length) {
        fs.rmdirSync(dest);
    }
}

function copyDir(source, dest) {
    const paths = fs.readdirSync(source);
    paths.forEach(function (p) {
        const src = path.join(source, p);
        const target = path.join(dest, p);
        const st = fs.statSync(src);
        if (st.isFile()) {
            if (fs.existsSync(target)) {
                console.log(`\rDelete File: ${target}`);
                fs.unlinkSync(target);
            }
            // console.log(`\rCopy File: ${target}`);
            const readStream = fs.createReadStream(src);
            const writeStream = fs.createWriteStream(target);
            readStream.pipe(writeStream);
        }
        if (st.isDirectory()) {
            if (fs.existsSync(target)) {
                // console.log(`\rDelete Directory: ${target}`);
                delDir(target);
            }
            // console.log(`\rCreate Directory: ${target}`);
            fs.mkdirSync(target);
            copyDir(src, target);
        }
    });
}

function prepare() {
    console.log("__dirname:", __dirname);
    const paths = fs.readdirSync(__dirname);
    paths.forEach(function (p) {
        console.log("file:", p);
    });

    if (isDev) {
        const backend = require("./backend/index.js");
    } else {
        // const resoutces = path.resolve(__dirname, "../");
        // const src = path.join(__dirname, './backend/');
        // const dest = path.join(resoutces, './backend/');
        // if (!fs.existsSync(dest)) {
        //     fs.mkdirSync(dest);
        //     copyDir(src, dest);
        // }
        console.log("start server.");
        setTimeout(() => {
            const backend = require("../backend/index.js");
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
        goUrl = "http://127.0.0.1:8080"
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

