[![Maintainability](https://api.codeclimate.com/v1/badges/d4fd2dc726f19e2d4bc2/maintainability)](https://codeclimate.com/github/euhoo/watch_bg/maintainability)
[![Build Status](https://travis-ci.org/euhoo/watch_bg.svg?branch=master)](https://travis-ci.org/euhoo/watch_bg)  


1.Установить пакет npm install ebike --save-dev 
2.Опционально создать конфигу в корне проекта ./ebike.config.js.
3.Скачать файл библиотеки socket.io
4.Добавить в index.html сначала socket.io и ниже ebike:
<script src="./src/libs/socket.io.js"></script>
<script src="./node_modules/ebike/ebike.js"></script>

5.в package.json прописать скрипт запуска:
"scripts": {
    "start": "node ./node_modules/ebike/ebike.js"
  },

Для старта приложения набрать npm start.
При старте можно передавать сервер, куда будут ходить запросы(первым параметром) и порт, на котором будет крутиться приложение в браузере (вторым параметров).
Предварительно в ebike.config прописать краткий alias для соотв сервера:
aliaseses: {
    2.101: 'http://192.168.2.101:4444',
  },

  Пример.Команда:
npm start 2.101 9080
при указанном выше алиасе 2.101: 'http://192.168.2.101:4444',
стартует локальный сервер на порту localhost:9080


Описание ebike.config.js:
exeptions - массив исключений, для которых не надо отслеживать изменения. При нахождении в имени измененного файла одной из срок этого массива, перезагрузка осуществляться не будет
isRemoteServer - boolean. есть ли удаленный сервер.
aliaseses- объект кратких alias для вызова из командной строки по алиасу,а не полному имени удаленного сервера. Актуально, когда isRemoteServer == true;
defaultOptions - параметры,выставленные по дефолту при старте приложения без дополнительных аргументов. Актуально, когда isRemoteServer == true;
remoteServerOptions - опции удаленного сервера. можно настраивать свои.
remoteServerOptions.path и remoteServerOptions.proxy будут выполнены как app.use(path, proxy(proxy)) при выставлении isRemoteServer в положение true.
pathToWatch - строка. в каком каталоге отслеживать изменения.



Cпасибо моему другу и сенсею Ивану Фисунову за подсказки и сэкономленное время!  
  
