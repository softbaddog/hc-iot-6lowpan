var config = require('./config');
var request = require('./request');
var response = require('./response');
var connectSuccess = false;

exports.success = function() {
	return connectSuccess;
};

exports.initialize = function() {
	var socket = require('socket.io-client')('http://' + config.host + ':' + config.socketPort);
	// var socket = require('socket.io-client')('http://localhost:3000');
	socket.on('connect', function() {
		console.log('connect to http://' + config.host + ':' + config.socketPort);
		connectSuccess = true;

		var request = require('./config/request');
		var response = require('./config/response');

		// 获取在线状态
		var devOnlineStatus = function() {
			// data = '{ "online": [ "FFFF010203FCE000", "2E00000000000031", "2E00000000000030" ] }';
			request.get('dev-online-status', null, null, function(data) {
				var devices = JSON.parse(data);
				console.log(devices);
				response.devStatus(devices);
			});
		};
		deveOnlineStatus();
		setTimeout(devOnlineStatus, 60000);

		// 获取拓扑数据
		var netTopo = function() {
			// data = '[ { "device-id": "FFFF010203FCE000", "status": "online", "node-id": 1, "parent-node-id": 0, "hop-count": 0 }, { "device-id": "2E00000000000030", "status": "online", "node-id": 2, "parent-node-id": 1, "hop-count": 1 }, { "device-id": "2E00000000000032", "status": "online", "node-id": 3, "parent-node-id": 2, "hop-count": 1 } ]';
			request.get('net-topo', null, null, function(data) {
				var devices = JSON.parse(data.replace(/-/g, ''));
				console.log(devices);
				var map = {};
				response.devMap(devices, function(key, value) {
					map[key] = value;
				});
				response.devTopo(devices, map);
			});
		};
		netTopo();
		setTimeout(netTopo, 5000);
	});

	socket.on('message', function(data) {
		console.log(data);
	});

	socket.on('error', function(err) {
		console.log(err);
	});
};