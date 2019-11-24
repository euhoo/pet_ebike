const findConfig = (path1, path2, defaultConfigObj) => {
  const fs = require("fs");
  const defaultConfig = fs.existsSync(path1) ? require(path1) : defaultConfigObj; 
  const config = fs.existsSync(path2) ? require(path2) : defaultConfig;
  return config;
}


if (typeof process === 'undefined') {
  const socket = io.connect();

  const findFullPathString = (path) => path
    .split('/')
    .filter((item) => item !== '.')
    .filter((item) => item)
    .join('');

  const makeCorrectName = (name) => name
    .replace('\\', '/')
    .split('?')[0];

  const findCss = (hrefToReplace) => {
    const head = document.getElementsByTagName('head')[0];
    const replacedString = findFullPathString(hrefToReplace);
    const cssLink = [...head.getElementsByTagName('link')]
      .filter((link) => {
        const href = link.getAttribute('href').split('?')[0];
        const hrefString = findFullPathString(href);
        if (hrefString === replacedString) return link;
      });
    return cssLink[0];
  };

  const replaceHref = (cssLink, hrefToReplace) => {
    cssLink.setAttribute('href', `${hrefToReplace}?${new Date().getTime()}`);
    return true;
  };

  const tryReloadCss = (name) => {
    const hrefToReplace = makeCorrectName(name);
    const cssLink = findCss(hrefToReplace);
    return cssLink ? replaceHref(cssLink, hrefToReplace) : false;
  };

  socket.on('change', ({ name }) => {
    const isCss = tryReloadCss(name);
    if (!isCss) location.reload();
  });
} else {
  const express = require('express');
  const http = require('http');
  const watch = require('node-watch');
  const proxy = require('http-proxy-middleware');

  const app = express();
  const server = http.createServer(app);
  const io = require('socket.io').listen(server);

  const userConfigPath = '../../ebike.config.js';
  const defaultConfigObj = {
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
  const defaultConfigPath = './ebike.defaultConfig.js';
  const config = findConfig(defaultConfigPath, userConfigPath, defaultConfigObj)

  const {
    exeptions, defaultOptions, addressesObj, remoteServerOptions, isRemoteServer, pathToWatch,
  } = config;
  const { remoteServer, clientPort } = defaultOptions;

  const watchFunc = (watch, exeptions, io, pathToWatch) => (watch(pathToWatch, { recursive: true }, (evt, name) => {
    let include = false;
    exeptions.forEach((item) => {
      if (`${name}`.includes(item)) include = true;
    });
    if (!include) {
      console.log(name);
      io.emit('change', { evt, name, exeptions });
    }
  }));


  const address = process.argv[2] || 2.102;
  const localHostPort = process.argv[3] || clientPort || 9080;
  const target = addressesObj[address] || remoteServer;
  const str = `Connected to machine: ${target}.`;
  const link = `http://localhost:${localHostPort}/`;

  server.listen(localHostPort);

  // eslint-disable-next-line no-unused-expressions
  isRemoteServer ? app.use(remoteServerOptions.path, proxy(remoteServerOptions.proxy))
    : app.use(express.static('.'));

  watchFunc(watch, exeptions, io, pathToWatch);


  console.log(str);
  console.log(link);
}
