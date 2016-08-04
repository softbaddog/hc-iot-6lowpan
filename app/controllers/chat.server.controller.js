module.exports = function(io, socket) {
    io.emit('chatMessage', {
        type: 'status',
        text: 'connected',
        created: Date.now(),
        email: socket.request.user.email
    });

    socket.on('chatMessage', function(message) {
        message.type = 'message';
        message.created = Date.now();
        message.email = socket.request.user.email;

        io.emit('chatMessage', message);
    });

    socket.on('disconnect', function() {
        io.emit('chatMessage', {
            type: 'status',
            text: 'disconnected',
            created: Date.now(),
            email: socket.request.user.email
        });
    });
};
