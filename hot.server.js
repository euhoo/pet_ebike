const express = require('express');
const http = require('http');
const watch = require('node-watch');
// const proxy = require('http-proxy-middleware');

const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);

const exeptions = ['git', 'js_babeled', 'node_modules', 'build', 'hotreload']; // исключения,которые вотчить не надо, файлы и папки
const backPortObj = {
  '2.100': 8091,
  2.101: 4092,
  2.115: 4092,
  2.117: 4092,
  12.11: 4092,
  12.6: 4092,
};
const address = process.argv[2] || 2.101;
const localHostPort = process.argv[3] || 9080;
const backMachinePort = backPortObj[address] || 4092;
const isHotReload = process.argv[4] || 'y'; // "n" || "y"
const target = `http://192.168.${address}:${backMachinePort}`;
const str = `Connected to machine: ${target}, hot reload: ${isHotReload === 'y' ? 'enabled' : 'disabled'}.`;
const link = `http://localhost:${localHostPort}/`;

server.listen(localHostPort);

/* app
    .use('/bg-portal', proxy({
    target,
    changeOrigin: true,
    ws: true,
  }))

  .use(express.static('.')); */
app.use(express.static('.'));

if (isHotReload === 'y') {
  watch('./', { recursive: true }, (evt, name) => {
    let include = false;
    exeptions.forEach((item) => {
      if (`${name}`.includes(item)) include = true;
    });
    if (!include) {
      console.log(name);
      io.emit('change', { evt, name, exeptions });
    }
  });
}

console.log(str);
console.log(link);
