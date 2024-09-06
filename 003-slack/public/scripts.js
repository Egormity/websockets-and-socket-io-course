const socket = io('http://localhost:9000');
const socket2 = io('http://localhost:9000/admin');

socket.on('messageFromServer', dataFromServer => {
  console.log(dataFromServer);
  socket.emit('dataToServer', { data: 'Data from the client!' });
});

socket.on('joined', message => {
  console.log(message);
});

socket2.on('welcome', dataFromServer => {
  console.log(dataFromServer);
});

// document.getElementById('message-form').addEventListener('submit', e => {
//   e.preventDefault();
//   const input = document.getElementById('user-message');
//   const newMessage = input.value;
//   input.value = '';
//   socket.emit('newMessageToServer', { text: newMessage });
// });
