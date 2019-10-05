module.exports = {
  exeptions: ['git', 'js_babeled', 'node_modules', 'build', 'hotreload', 'idea'], // исключения,которые вотчить не надо, файлы и папки
  isRemoteServer: false,
  addressesObj: {
    2.100: 'http://192.168.2.100:8091',
    2.101: 'http://192.168.2.101:4092',
    2.102: 'http://192.168.2.102:4092',
    2.117: 'http://192.168.2.117:4092',
    12.11: 'http://192.168.12.11:4092',
    12.6: 'http://192.168.12.6:4092',
  },
  defaultOptions: {
    remoteServer: 'http://192.168.2.102:4092',
    clientPort: '9080',
  },
  remoteServerOptions: {
    path: '/bg-portal',
    proxy: {
      target: 'http://192.168.2.102:4092',
      changeOrigin: true,
      ws: true,
    },
  },
  pathToWatch: './',
};
