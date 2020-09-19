const {override} = require('customize-cra')

function addRendererTarget(config) {
    config.target = 'electron-renderer' // 重写webpack的target，解决在页面里面 import xxxx from 'electron'报错的问题
    return config
}

module.exports = override(addRendererTarget)