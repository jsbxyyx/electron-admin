const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('node:path')
const { fork } = require('child_process')

var serverProcess = null
function createServerProcess() {
    // 开发环境
    serverProcess = fork(require.resolve('./backend'))
    serverProcess.on('close', (code) => {
        console.log('子线程已经退出', code)
    })
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // Menu.setApplicationMenu(null)
    mainWindow.webContents.openDevTools()

    mainWindow.loadFile('index.html')
    // mainWindow.loadURL("http://127.0.0.1:8080")
}

app.whenReady().then(() => {
    createServerProcess()
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        if (serverProcess) {
            process.kill(serverProcess.pid)
        }
    }
})

