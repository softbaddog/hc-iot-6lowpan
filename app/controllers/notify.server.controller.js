var Node = require('mongoose').model('Node');

module.exports = function(io, socket) {
	socket.on('nodeChanged', function(node) {
		console.log('node changed', node);
		socket.broadcast.emit('nodeChanged', node);
	});

	socket.on('nodeLocked', function(name) {
		console.log('node locked', name);
		socket.broadcast.emit('nodeLocked', name);
		Node.findOne({
			name: name
		}).exec(function(err, node) {
			if (err) {
				return err;
			}

			if (!node) {
				return new Error('非法Name ' + name);
			}

			// socket.broadcast.emit('nodeLocked', node);
			node.priority = 1;
			console.log(node.priority);
		});
	});

	socket.on('nodeUnlocked', function(name) {
		console.log('node unlocked', name);
		socket.broadcast.emit('nodeUnlocked', name);
		Node.findOne({
			name: name
		}).exec(function(err, node) {
			if (err) {
				return err;
			}

			if (!node) {
				return new Error('非法Name ' + name);
			}

			// socket.broadcast.emit('nodeUnlocked', node);
			node.priority = 0;
			console.log(node.priority);
		});
	});
};