var express = require('express'); // Подключаем express
var app = express();
var server = require('http').Server(app); // Подключаем http через app
var io = require('socket.io')(server); // Подключаем socket.io и указываем на сервер
var fs = require('fs');
var watch = require('node-watch');

const port = 9080;
server.listen(port);
app.use(express.static(__dirname + '/src'));


const isDevMode = process.env.isDevModeAvaiables || false;
const devMode = process.env.myDevMode || false;
const address = process.env.backendMachine || false;
let count = 0;//убрать для работы
if(process.env.isHotReload) {
  watch('./', { recursive: true }, function(evt, name) {  
    io.emit('change', {changed, isDevMode, devMode});  
    count += 1;
    changed = [{name, evt}, ...changed];  
  });
};


let changed = [];
app.get('/data', (req, res) => {
  res.data = count;
  res.send({count, changed});
});
    