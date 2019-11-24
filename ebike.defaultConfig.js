module.exports = {
  exeptions: ['git', 'js_babeled', 'node_modules', 'build', 'hotreload', 'idea'], // исключения,которые вотчить не надо, файлы и папки
  isRemoteServer: false,
  addressesObj: {
    1.102: 'http://192.168.1.102:4444',
  },
  defaultOptions: {
    remoteServer: 'http://192.168.2.101:4444',
    clientPort: '9080',
  },
  remoteServerOptions: {
    path: '/myServer',
    proxy: {
      target: 'http://192.168.2.101:4444',
      changeOrigin: true,
      ws: true,
    },
  },
  pathToWatch: './',
};
