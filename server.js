var express = require('express'); // Подключаем express
var app = express();
var server = require('http').Server(app); // Подключаем http через app
var io = require('socket.io')(server); // Подключаем socket.io и указываем на сервер

const port = 9080;
server.listen(port);
app.use(express.static(__dirname + '/src'));






/*
var socket = io.connect('http://localhost:' + port);

    const dir = './src';
    fs.watch(dir, () => {
      socket.emit('change');
      console.log('изменено');
        // location.reload();
    })
    */