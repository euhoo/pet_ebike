var express = require('express'); // Подключаем express
var app = express();
var server = require('http').Server(app); // Подключаем http через app
var io = require('socket.io')(server); // Подключаем socket.io и указываем на сервер
var fs = require('fs');
var watch = require('node-watch');

const port = 9080;
server.listen(port);
app.use(express.static(__dirname + '/src'));

let count = 0;
let changed = [];
app.get('/data', (req, res) => {
  res.data = count;
  res.send({count, changed});
})
const translate = {
  remove: "удален",
  update: "изменен"
}


watch('./', { recursive: true }, function(evt, name) {
  // console.log(process.env)

  io.emit('change', {data: count}); 
  count += 1;
  changed = [{name, evt}, ...changed];
  // const fullDate = new Date; 
  // const time = fullDate.toTimeString().slice(0,8);
  // const date = fullDate.toDateString();
  // const isoDate = fullDate.toISOString()
  // const str = `${isoDate}: ${name} был ${translate[evt]}`;
  // fs.writeFile("log.log", str, (error) => {
  //   if (error) console.log(error);
  // });  
});


// const dir = './src';
// fs.watch(dir, () => { 
//   io.emit('change', {data: count});
//   count += 1;
// })
    