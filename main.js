const { app, BrowserWindow, Menu, Accelerator } = require('electron');
const url = require('url');
const path = require('path');


let mainWindow;


app.on('ready', () => {
    
    mainWindow = new BrowserWindow({});

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: "file:",
            slashes: true
        })
    );

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

});


const mainMenuTemplate = [
    {
        label: 'file',
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