const {ipcMain} = require('electron');
const {send: sendMainWindow} = require('./window/main');
const {create: createControlWindow} = require('./window/control');

module.exports = function () {
    //处理 login control
    ipcMain.handle('login', async () => {
        // 先mock，返回一个code
        let code = Math.floor(Math.random() * (999999-100000)) + 100000;
        return code;
    });

    ipcMain.on('control', async (e, remoteCode) => {
        //这里应该跟服务端有交互，成功后我们会唤起面板
        createControlWindow();
        sendMainWindow('control-state-change', remoteCode, 1);
    });
}