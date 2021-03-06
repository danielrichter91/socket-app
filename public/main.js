$(function () {
    let socket = io();

    $('form').submit(function(){
        socket.emit('chat message', $('#message').val());
        $('#message').val('');
        return false;
    });

    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
    socket.on('client', function(client){
        $('#people').append($("<span class='tag is-success'>").text(client));
    });

});