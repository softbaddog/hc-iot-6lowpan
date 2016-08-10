module.exports = function(io, socket) {
	socket.on('nodeChanged', function(node) {
		console.log('node changed', node.name);
		socket.broadcast.emit('nodeChanged', node);
	});

	socket.on('nodeOpened', function(node) {
		console.log('node opened', node.name);
		socket.broadcast.emit('nodeOpened', node);
	});

	socket.on('nodeClosed', function(node) {
		console.log('node closed', node.name);
		socket.broadcast.emit('nodeClosed', node);
	});
};