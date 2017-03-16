module.exports = function(io) {
    io.on('connection', function(socket) {
        // Receive: server receive a socket.
        var message = socket.handshake.query['msg'];
        console.log(socket.id + " sends you a message: " + message);
        // Send: server send message back
        io.to(socket.id).emit('message', 'hehe')
    });
}
