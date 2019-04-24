const url = require('url')
const path = require('path')

const { app, BrowserWindow, ipcMain } = require('electron')
const Store = require('electron-store')

const createDBListeners = require('./dbListeners')
const schema = require('./schema')

const { DEV } = process.env

const store = new Store({ schema })

const windows = {
  menuWindow: null,
  scorekeeperWindow: null,
  scoreboardWindow: null
}

/**
 * Startup Stuff
 */

app.on('ready', createMenuWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (windows.menuWindow === null) createMenuWindow()
})

/**
 * Scorekeeping Stuff
 */

ipcMain.on('score', (event, { category, points, team }) => {
  const currentScore = (store.store[team] && store.store[team][category]) || 0

  store.set(`${team}.${category}`, currentScore + points)
})

const scoreKeys = [
  'teamA.visitors',
  'teamA.verses',
  'teamA.rally',
  'teamA.games',
  'teamA.attendance',
  'teamA.bibles',
  'teamA.offering',
  'teamB.visitors',
  'teamB.verses',
  'teamB.rally',
  'teamB.games',
  'teamB.attendance',
  'teamB.bibles',
  'teamB.offering'
]

createDBListeners(store, scoreKeys, key => (newValue, oldValue) => {
  if (windows.scoreboardWindow) {
    windows.scoreboardWindow.webContents.send('new-score', { key, points: newValue - (oldValue || 0), newValue })
  }

  if (windows.scorekeeperWindow) {
    windows.scorekeeperWindow.webContents.send('new-score', { key, oldPoints: newValue - (oldValue || 0), newValue })
  }
})

ipcMain.on('getDB', (event) => {
  event.sender.send('freshDB', store.store)
})

/**
 * Window Stuff
 */

ipcMain.on('open', (event, appName) => {
  appName === 'scoreboard' && createScoreboardWindow()
  appName === 'scorekeeper' && createScorekeeperWindow()
})

function createMenuWindow () {
  windows.menuWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    backgroundColor: '#667eea',
    webPreferences: {
      nodeIntegration: true
    }
  })

  windows.menuWindow.loadURL(DEV ? 'http://localhost:3000' : url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, 'menuscreen/build/index.html')
  }))

  // windows.menuWindow.webContents.openDevTools()

  windows.menuWindow.on('closed', () => {
    windows.menuWindow = null
  })
}

function createScorekeeperWindow () {
  if (windows.scorekeeperWindow instanceof BrowserWindow) {
    return windows.scorekeeperWindow.focus()
  }

  windows.scorekeeperWindow = new BrowserWindow({
    width: getScreen('width'),
    height: getScreen('height'),
    x: 0,
    y: 0,
    backgroundColor: '#667eea',
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  windows.scorekeeperWindow.loadURL(DEV ? 'http://localhost:3002' : url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, 'vbs-scorekeeper/build/index.html')
  }))

  // windows.scorekeeperWindow.webContents.openDevTools()

  windows.scorekeeperWindow.on('closed', () => {
    windows.scorekeeperWindow = null
  })
}

function createScoreboardWindow () {
  if (windows.scoreboardWindow instanceof BrowserWindow) {
    return windows.scoreboardWindow.focus()
  }

  windows.scoreboardWindow = new BrowserWindow({
    frame: false,
    backgroundColor: '#4a5568',
    webPreferences: {
      nodeIntegration: true
    }
  })

  windows.scoreboardWindow.loadURL(DEV ? 'http://localhost:3001' : url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, 'vbs-scoreboard/build/index.html')
  }))

  windows.scoreboardWindow.maximize()

  windows.scoreboardWindow.webContents.openDevTools()

  windows.scoreboardWindow.on('closed', () => {
    windows.scoreboardWindow = null
  })
}

function getScreen (key) {
  return require('electron').screen.getPrimaryDisplay().size[key]
}
