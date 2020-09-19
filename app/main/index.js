const {app} = require('electron')
const {create: createMainWindow} = require('./window/main')
const handleIPC = require('./ipc')


app.on('ready', () => {
    createMainWindow()
    handleIPC()
})