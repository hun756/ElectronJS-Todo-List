const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');


let mainWindow;


app.on('ready', () => {

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: "file:",
            slashes: true
        })
    );

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);


    ipcMain.on('key:txt', (err, data) => {
        console.log(data);
    });


    ipcMain.on('key:newWindow', () => {
        console.log('Handled new window reques...!');
        createwindow();
    });

    mainWindow.on('close', () => {
        app.quit();
    });
});


const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add new Todo',
            },
            {
                label: 'Delete All'
            },
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                role: 'quit'
            }
        ]
    },
]

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: "Dev Tools",
        submenu: [
            {
                label: "Open Developer Tools",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                label: "Reload",
                role: "reload"
            }
        ]
    });
}

createwindow = () => {
    newWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        width: 400,
        height: 200,
        resizable: false,
    });

    newWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'modal.html'),
            protocol: "file:",
            slashes: true
        })
    );

    newWindow.on('close', () => {
        newWindow = null;
    });
}


if (process.platform == "darwin") {
    mainMenuTemplate.unshift({
        label: app.getName(),
        role: "TODO"
    });
}