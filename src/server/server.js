const server = () => {

  const express = require('express');
  const http = require('http');
  const watch = require('node-watch');
  const proxy = require('http-proxy-middleware');
  
  const app = express();
  const server = http.createServer(app);
  const io = require('socket.io-client').listen(server);
  const config = require('../ebike.config');
  
  const {
    exeptions, defaultOptions, addressesObj, remoteServerOptions, isRemoteServer, pathToWatch,
  } = config;
  const { remoteServer, clientPort } = defaultOptions;
  
  
  const address = process.argv[2] || 2.102;
  const localHostPort = process.argv[3] || clientPort || 9080;
  const target = addressesObj[address] || remoteServer;
  const str = `Connected to machine: ${target}.`;
  const link = `http://localhost:${localHostPort}/`;
  const watchFunc = require('./watchFunc');
  
  server.listen(localHostPort);
  
  // eslint-disable-next-line no-unused-expressions
  isRemoteServer ? app.use(remoteServerOptions.path, proxy(remoteServerOptions.proxy))
  : app.use(express.static('.'));
  
  watchFunc(watch, exeptions, io, pathToWatch);
  
  
  console.log(str);
  console.log(link);
  
};
module.exports = server;