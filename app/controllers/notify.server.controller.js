module.exports = function(io, socket) {
    socket.on('nodeChanged', function(node) {
        console.log('node changed.');
        socket.broadcast.emit('nodeChanged', node);
    });
};
