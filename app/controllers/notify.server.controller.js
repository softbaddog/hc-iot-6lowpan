var Node = require('mongoose').model('Node');

module.exports = function(io, socket) {
	socket.on('nodeChanged', function(node) {
		console.log('node changed', node);
		socket.broadcast.emit('nodeChanged', node);
	});

	socket.on('nodeLocked', function(name) {
		console.log('node locked', name);
		Node.findOne({
			name: name
		}).exec(function(err, node) {
			if (err) {
				return next(err);
			}

			if (!node) {
				return next(new Error('非法Name ' + name));
			}

			socket.broadcast.emit('nodeLocked', node);
		});
	});

	socket.on('nodeUnlocked', function(name) {
		console.log('node unlocked', name);
		Node.findOne({
			name: name
		}).exec(function(err, node) {
			if (err) {
				return next(err);
			}

			if (!node) {
				return next(new Error('非法Name ' + name));
			}

			socket.broadcast.emit('nodeUnlocked', node);
		});
	});
};