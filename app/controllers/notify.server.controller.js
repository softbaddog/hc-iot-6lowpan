module.exports = function(io, socket) {
	socket.on('nodeChanged', function(node) {
		console.log('node changed', node.name);
		socket.broadcast.emit('nodeChanged', node);
	});

	socket.on('nodeLocked', function(node) {
		console.log('node locked', node.name);
		socket.broadcast.emit('nodeOpened', node);
	});

	socket.on('nodeUnlocked', function(node) {
		console.log('node unlocked', node.name);
		socket.broadcast.emit('nodeClosed', node);
	});
};