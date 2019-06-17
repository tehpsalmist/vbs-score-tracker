/**
 * Library Variables
 */

const fs = require('fs')

const { app, BrowserWindow, ipcMain } = require('electron')
const Store = require('electron-store')
const serve = require('electron-serve')
const { autoUpdater } = require('electron-updater')

const createDBListeners = require('./dbListeners')
const { schema, defaults, validateSchema } = require('./schema')
const { getStringScores } = require('./utilities')
const { setupMenu } = require('./setupMenu')

const DEV = (process.argv || []).indexOf('--dev') !== -1

/**
 * Application Variables
 */

const store = new Store({ schema, defaults })

const loadMenuURL = serve({ directory: 'menu-screen/build', scheme: 'menu-screen' })
const loadScorekeeperURL = serve({ directory: 'vbs-scorekeeper/build', scheme: 'vbs-scorekeeper' })
const loadScoreboardURL = serve({ directory: 'vbs-scoreboard/build', scheme: 'vbs-scoreboard' })

const windows = {
  menuWindow: null,
  scorekeeperWindow: null,
  scoreboardWindow: null
}

const updateIfAvailable = () => {
  autoUpdater.checkForUpdatesAndNotify().then(result => {
    if (result) {
      result.downloadPromise.then(() => {
        autoUpdater.quitAndInstall()
      })
    }
  })
}

/**
 * Startup Stuff
 */

updateIfAvailable()

app.on('ready', createMenuWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (windows.menuWindow === null) createMenuWindow()
})

setupMenu(app)

/**
 * Database Stuff
 */

ipcMain.on('offeringUpdate', (event, offerings) => {
  store.set('offerings', offerings)
})

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

ipcMain.on('getDB', (event, reason) => {
  event.sender.send('freshDB', store.store, reason)
})

/**
 * Scores/Offering Revealer Stuff
 */

ipcMain.on('openScoreRevealer', (event) => {
  if (windows.scoreboardWindow instanceof BrowserWindow) {
    const { teamA, teamB } = store.store

    const scores = getStringScores(
      Object.keys(teamA).reduce((total, key) => total + teamA[key], 0),
      Object.keys(teamB).reduce((total, key) => total + teamB[key], 0)
    )

    windows.scoreboardWindow.webContents.send('openScoreRevealer', scores)
    windows.scorekeeperWindow.webContents.send('openScoreRevealer', scores)
  }
})

ipcMain.on('openOfferingRevealer', (event, { teamA, teamB }) => {
  if (windows.scoreboardWindow instanceof BrowserWindow) {
    const offerings = getStringScores(teamA.replace('.', ''), teamB.replace('.', ''))

    windows.scoreboardWindow.webContents.send('openOfferingRevealer', offerings)
    windows.scorekeeperWindow.webContents.send('openOfferingRevealer', offerings)
  }
})

ipcMain.on('revealIndex', (event, index) => {
  if (windows.scoreboardWindow instanceof BrowserWindow) {
    windows.scoreboardWindow.webContents.send('revealIndex', index)
  }
})

ipcMain.on('closeRevealers', (event) => {
  if (windows.scoreboardWindow instanceof BrowserWindow) {
    windows.scoreboardWindow.webContents.send('closeRevealers')
  }
})

/**
 * Export/Import Scores Stuff
 */

ipcMain.on('clearScores', (event, filename) => {
  if (filename) {
    fs.writeFile(filename, JSON.stringify(store.store, null, 2), err => {
      if (err) return console.log(err)

      store.store = defaults
      event.sender.send('clearUndoList')
    })
  }
})

ipcMain.on('importScores', (event, filename) => {
  if (filename) {
    fs.readFile(filename, (err, buffer) => {
      if (err) return console.log(err)

      const json = buffer.toString()

      if (!validateSchema(json)) return console.error('Invalid JSON')

      store.store = JSON.parse(json)
      event.sender.send('clearUndoList')
    })
  }
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
    backgroundColor: '#667eea',
    webPreferences: {
      nodeIntegration: true
    }
  })

  DEV ? windows.menuWindow.loadURL('http://localhost:3000') : loadMenuURL(windows.menuWindow)

  windows.menuWindow.on('closed', () => {
    windows.menuWindow = null
  })
}

function createScorekeeperWindow () {
  if (windows.scorekeeperWindow instanceof BrowserWindow) {
    return windows.scorekeeperWindow.focus()
  }

  windows.scorekeeperWindow = new BrowserWindow({
    width: DEV ? 1200 : getScreen('width'),
    height: DEV ? 650 : getScreen('height'),
    x: 0,
    y: 0,
    backgroundColor: '#667eea',
    webPreferences: {
      nodeIntegration: true
    }
  })

  DEV ? windows.scorekeeperWindow.loadURL('http://localhost:3002') : loadScorekeeperURL(windows.scorekeeperWindow)

  windows.scorekeeperWindow.on('closed', () => {
    windows.scorekeeperWindow = null
  })
}

function createScoreboardWindow () {
  if (windows.scoreboardWindow instanceof BrowserWindow) {
    return windows.scoreboardWindow.focus()
  }

  windows.scoreboardWindow = new BrowserWindow({
    backgroundColor: '#4a5568',
    webPreferences: {
      nodeIntegration: true
    }
  })

  DEV ? windows.scoreboardWindow.loadURL('http://localhost:3001') : loadScoreboardURL(windows.scoreboardWindow)

  windows.scoreboardWindow.maximize()

  windows.scoreboardWindow.on('closed', () => {
    windows.scoreboardWindow = null
  })
}

function getScreen (key) {
  return require('electron').screen.getPrimaryDisplay().size[key]
}
