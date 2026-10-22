// Electron entry point: a full-screen, fully offline presentation shell
// around the Vite build in dist/.
const { app, BrowserWindow, protocol, shell, Menu } = require('electron');
const path = require('path');
const { respond } = require('./serve.cjs');

const SCHEME = 'app';
const HOST = 'dosti';
const START_URL = `${SCHEME}://${HOST}/index.html`;

// Media and the 360 tour are unpacked from app.asar so they can be streamed.
const DIST = path.join(__dirname, '..', 'dist').replace(`app.asar${path.sep}`, `app.asar.unpacked${path.sep}`);
const DIST_PACKED = path.join(__dirname, '..', 'dist');

protocol.registerSchemesAsPrivileged([
  {
    scheme: SCHEME,
    privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true, corsEnabled: true },
  },
]);

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 1024,
    minHeight: 640,
    show: false,
    fullscreen: true,
    backgroundColor: '#000000',
    title: 'Dosti Greater Thane',
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
      backgroundThrottling: false,
    },
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());

  // Keep everything inside the app; nothing should leave for the internet.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith(`${SCHEME}://`)) {
      mainWindow.loadURL(url);
    } else if (/^https?:/i.test(url)) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(`${SCHEME}://`)) event.preventDefault();
  });

  // F11 toggles full screen, Esc leaves it (kiosk-friendly controls).
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.type !== 'keyDown') return;
    if (input.key === 'F11') {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
      event.preventDefault();
    } else if (input.key === 'Escape' && mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(false);
    }
  });

  mainWindow.loadURL(START_URL);
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  protocol.handle(SCHEME, (request) => {
    // Prefer the unpacked copy (media/tour), fall back to files inside the asar.
    const unpacked = respond(DIST, request);
    if (unpacked.status !== 404 || DIST === DIST_PACKED) return unpacked;
    return respond(DIST_PACKED, request);
  });
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => app.quit());
