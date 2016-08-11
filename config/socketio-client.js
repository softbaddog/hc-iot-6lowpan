var config = require('./config');
var request = require('./request');
var response = require('./response');

exports.initialize = function() {
	var socket = require('socket.io-client')('http://' + config.host + ':' + config.socketPort);
	// var socket = require('socket.io-client')('http://localhost:3000');
	socket.on('connect', function() {
		console.log('client connected');	
	});

	socket.on('message', function(data) {
		console.log(data);
	});

	socket.on('error', function(err) {
		console.log(err);
	});

	socket.on('disconnect', function() {
		console.log('disconnect');
	});

	socket.on('reconnection', function(err) {
		console.log('reconnection');
	});

};