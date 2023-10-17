const { app, BrowserWindow, Menu, ipcMain } = require('electron')

const path = require('node:path')

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

    mainWindow.webContents.once("did-finish-load", function(){
        
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

