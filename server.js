var express = require('express'); // Подключаем express
var app = express();
var server = require('http').Server(app); // Подключаем http через app
var io = require('socket.io')(server); // Подключаем socket.io и указываем на сервер
fs = require('fs');

const port = 9080;
server.listen(port);
app.use(express.static(__dirname + '/src'));

let count = 0;
app.get('/data', (req, res) => {
  res.data = count;
  res.send(`${count}`);
})



const dir = './src';
fs.watch(dir, () => {
  io.emit('change', {data: count});
  count += 1;
})
    