const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/js', express.static(__dirname + '/public'))

let clients = [];
io.on('connection', function(socket){
    clients.push(socket);
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
    socket.on('disconnect', function() {
      clients.splice(clients.indexOf(socket), 1);
    });
    clients.map((x, i) => {
      console.log('client: ' + i, x.id)
    });
    io.emit('client', socket.id);
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});