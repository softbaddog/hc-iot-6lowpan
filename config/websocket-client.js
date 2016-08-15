var config = require('./config');
var request = require('./request');
var response = require('./response');
var connectSuccess = false;

exports.success = function() {
	return connectSuccess;
};

exports.initialize = function() {
	var WebSocketClient = require('websocket').client;

	var client = new WebSocketClient();

	client.connect('ws://' + config.host + ':' + config.socketPort + '/iotdm/stream/nb/v1/device');

	client.on('connectFailed', function(error) {
		console.log('Connect Error: ' + error.toString());
	});

	client.on('connect', function(connection) {
		console.log('WebSocket Client Connected');
		connectSuccess = true;

		connection.on('error', function(error) {
			console.log("Connection Error: " + error.toString());
		});
		connection.on('close', function() {
			console.log('echo-protocol Connection Closed');
		});
		connection.on('message', function(message) {
			if (message.type === 'utf8') {
				console.log("Received: '" + message.utf8Data + "'");
			}
		});

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
};