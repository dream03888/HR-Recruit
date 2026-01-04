const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { SerialPort } = require('serialport');

app.disableHardwareAcceleration();

console.log('🚀 Electron main start');

let win;
let port = null;

function createWindow() {
  console.log('🪟 createWindow called');

  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,              // ✅ FIX จุดสำคัญ
    },
  });

  win.loadURL('http://localhost:9874');
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (port && port.isOpen) port.close();
  app.quit();
});

/* =========================
   IPC: COM PORT
========================= */
ipcMain.handle('com:list', async () => {
  const ports = await SerialPort.list();
  console.log('🔍 COM LIST:', ports);
  return ports.map(p => ({
    path: p.path,
    manufacturer: p.manufacturer
  }));
});

ipcMain.handle('com:connect', async (_, config) => {
  try {
    if (port && port.isOpen) port.close();

    port = new SerialPort({
      path: config.path,
      baudRate: config.baudRate,
      autoOpen: true
    });

    return { success: true };
  } catch (e) {
    return { success: false, message: e.message };
  }
});

ipcMain.handle('com:send', async (_, data) => {
  if (!port || !port.isOpen) {
    return { success: false, message: 'COM not connected' };
  }
  port.write(data);
  return { success: true };
});

ipcMain.handle('ping', async () => 'pong from electron');
