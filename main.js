const { app, BrowserWindow } = require('electron')

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // فایل مربوط به ظاهر اپ که در ایندکس اچ تی ام ال است را باز میکند
  win.loadFile('index.html')
  //این فایل مربوط به فریموورک الکترون است  که کد جی اس را در محیط ویندوز ران میکند
}

app.on('ready', createWindow)