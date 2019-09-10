const express = require('express');
// Подключаем express
const app = express();
const server = require('http').Server(app); // Подключаем http через app
const io = require('socket.io')(server); // Подключаем socket.io и указываем на сервер
// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const watch = require('node-watch');

const port = 9080;
server.listen(port);
app.use(express.static(`${__dirname}/src`));

const isDevMode = process.env.isDevModeAvaiable || false;
const devMode = process.env.myDevMode || false;
const address = process.env.backendMachine || false;

if (process.env.isHotReload) {
  watch('./', { recursive: true }, (evt, name) => {
    io.emit('change', { changed, isDevMode, devMode });
    count += 1;
    changed = [{ name, evt }, ...changed];
  });
}
const str = `Connected to machine: ${address}, dev mode is ${isDevMode ? 'enabled' : 'disabled'} and it is "${devMode || 'not set'}"`;
// eslint-disable-next-line no-console
console.log(str);
