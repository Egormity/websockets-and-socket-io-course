const express = require('express');
const app = express();
const socketio = require('socket.io');

const namespaces = require('./data/namespaces');
console.log(namespaces);

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
// io = the server object in the docs!
const io = socketio(expressServer);

io.on('connection', socket => {
  console.log(socket.id, 'has connected');
  //in ws we use "send" method, and it socket.io we use the "emit" method
  // socket.emit('messageFromServer',{data:"Welcome to the socket server!"})

  socket.on('newMessageToServer', dataFromClient => {
    io.emit('messageToClients', { text: dataFromClient.text });
  });

  socket.join('level1');
  io.of('/').to('level1').emit('joined', `${socket.id} joined level 1`);
});

io.of('/admin').on('connection', socket => {
  console.log(socket.id, 'has connected to admin namespace');
  io.of('/admin').emit('welcome', 'Everyone welcome to the admin namespace');
});
