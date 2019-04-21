// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const { DEV } = process.env

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let menuWindow

function createMenuWindow () {
  // Create the browser window.
  menuWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  menuWindow.loadURL('http://localhost:3000')

  // Open the DevTools.
  menuWindow.webContents.openDevTools()

  menuWindow.maximize()

  // Emitted when the window is closed.
  menuWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    menuWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMenuWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (menuWindow === null) createMenuWindow()
})
