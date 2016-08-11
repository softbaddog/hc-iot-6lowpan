var config = require('./config');
var request = require('./request');
var response = require('./response');

exports.initialize = function() {
	var socket = require('socket.io-client')('http://' + config.host + ':' + config.socketPort);
	// var socket = require('socket.io-client')('http://localhost:3000');
	console.log('http://' + config.host + ':' + config.socketPort);
	socket.on('connect', function() {
		console.log('client connected');
		socket.send('hello world');

		// 每10分钟获取一次所有设备状态
		setInterval(function() {
			request.get('dev-online-status', null, null, function(data) {
				var devices = JSON.parse(data).online;
				response.devStatus(devices);
			});
		}, 60000);

		// 每10秒获取一次网络拓扑信息
		setInterval(function() {
			request.get('net-topo', function(data) {
				var topo = JSON.parse(data);
				console.log(topo);
			});
		}, 10000);
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
