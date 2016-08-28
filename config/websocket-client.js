var config = require('./config');
var request = require('./request');
var response = require('./response');

connectStatus = false;
topoCount = 0;

exports.initialize = function() {
	var WebSocketClient = require('websocket').client;

	var client = new WebSocketClient();

	client.connect('ws://' + config.host + ':' + config.socketPort + '/iotdm/stream/nb/v1/device');

	client.on('connectFailed', function(error) {
		console.log('Connect Error: ' + error.toString());
		connectStatus = false;
	});

	client.on('connect', function(connection) {
		console.log('WebSocket Client Connected');
		connectStatus = true;

		// 获取在线状态
		var devOnline = function() {
			// data = '{ "online": [ "FFFF010203FCE000", "2E00000000000031", "2E00000000000030" ] }';
			// request.get('dev-online-status', null, null, function(data) {
			// 	var devices = JSON.parse(data);
			// 	response.devStatus(devices);
			// 	setTimeout(devOnline, 600000);
			// });

			request.post('query-online-device-list', null, null, function(data) {
				var devices = JSON.parse(data.replace(/-/g, ''));
				response.queryStatus(devices.item);
				setTimeout(devOnline, config.onlineTimeout);
			});
		};
		//devOnline();

		// 获取拓扑数据
		var netTopo = function() {
			// 先将设备在线和拓扑数据重置
			response.devStatusInit();
			// data = '[ { "device-id": "FFFF010203FCE000", "status": "online", "node-id": 1, "parent-node-id": 0, "hop-count": 0 }, { "device-id": "2E00000000000030", "status": "online", "node-id": 2, "parent-node-id": 1, "hop-count": 1 }, { "device-id": "2E00000000000032", "status": "online", "node-id": 3, "parent-node-id": 2, "hop-count": 1 } ]';
			topoCount++;
			console.log(topoCount);
			request.get('net-topo', null, null, function(data) {
				var devices = JSON.parse(data.replace(/-/g, ''));
				var map = {};
				response.devMap(devices, function(key, value) {
					map[key] = value;
				});
				response.devTopo(devices, map);
				setTimeout(netTopo, config.topoTimeout);
			});
		};
		netTopo();

		connection.on('error', function(error) {
			console.log("Connection Error: " + error.toString());
			connectStatus = false;
		});

		connection.on('close', function() {
			console.log('echo-protocol Connection Closed');
			connectStatus = false;
		});

		// Received: '{"type":"huawei-iotdm-device-common:online-status-change","data":{"online-status":"offline"},"gateway":"000D6
		// F00052AE47E","timestamp":"2016-08-15T15:27:55Z","esn":"2E00216EFC000255"}'
		// Received: '{"type":"huawei-iotdm-device:data-report","data":{"huawei-iotdm-device-common:online-status":"offline","huawe
		// i-iotdm-device-common:offline-reason":"normal"},"gateway":"000D6F00052AE47E","timestamp":"2016-08-15T15:27:55Z","esn":"2
		// E00216EFC000255"}'


		// Received: '{"type":"huawei-iotdm-device-common:online-status-change","data":{"on
		// line-status":"online"},"gateway":"000D6F00052AE47E","timestamp":"2016-08-15T15:2
		// 6:02Z","esn":"2E00216EFC000255"}'		
		connection.on('message', function(message) {
			if (message.type === 'utf8') {
				var obj = JSON.parse(message.utf8Data.replace(/-/g, ''));
				switch (obj.type) {
					case 'huaweiiotdmdevicecommon:onlinestatuschange':
						console.log("Received: '" + message.utf8Data + "'");
						if (obj.data.onlinestatus === 'online') {
							response.devStatusChanged(1, obj.esn);
						} else {
							response.devStatusChanged(0, obj.esn);
						}
						break;

					default:
						break;
				}
			}
		});

	});
};