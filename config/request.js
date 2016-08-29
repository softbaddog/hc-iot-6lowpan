var http = require('http');
var config = require('./config');

exports.post = function(api, nodes, node, callback) {
	switch (api) {
		case 'query-online-device-list':
			contents = '';
			path = 'device/action/' + config.gateway + '/urn:huawei:iotdm:device/huawei-iotdm-device-common:' + api;
			break;

		case 'dim-level':
			if (node) {
				contents = JSON.stringify({
					'index': 0,
					'level': node.level,
				});
				path = 'device/set/' + node.deviceId + '/urn:huawei:iotdm:device/data/huawei-iotdm-device-sensor:' + api;
			} else if (nodes) {
				var devices = [];
				nodes.forEach(function(element, index) {
					if (element.priority == 0) {
						devices.push(element.deviceId);
					}
				});
				contents = JSON.stringify({
					"devices": devices,
					"priority": 100,
					"retry-times": 1,
					"retry-intervals": 0,
					"max-timeout": 20000,
					"enable": true,
					"action": [{
						"name": "1",
						'type': 'set',
						'path': '/huawei-iotdm-device:data/huawei-iotdm-device-sensor:' + api,
						'body': {
							'index': 0,
							'level': nodes[0].level
						}
					}]
				});
				path = 'system/action/urn:huawei:iotdm:task/bulk-ctl';
			}
			break;

		case 'force-leave-net':
			if (node) {
				contents = JSON.stringify({
					'leave-time': 45
				});
				path = 'device/set/' + node.deviceId + '/urn:huawei:iotdm:device/data/huawei-iotdm-device-common:' + api;
			}
			break;

		case 'switch-status':
			if (node) {
				contents = JSON.stringify({
					"index": 0,
					"status": node.switch == 1 ? 'on' : 'off'
				});
				path = 'device/set/' + node.deviceId + '/urn:huawei:iotdm:device/data/huawei-iotdm-device-sensor:' + api;
			}
			break;

		case 'net-topo':
			contents = JSON.stringify({
				"devices": config.gateway,
		    "priority": 1,
		    "retry-times": 2,
		    "retry-intervals": 0,
		    "max-timeout": 30000,
		    "enable": true,
		    "action": [{
		    	"name": "topo",
		    	"type": "get",
		    	"path": "/huawei-iotdm-device:data/huawei-iotdm-device-common:net-topo"
		    }]
			});
			path = 'system/action/urn:huawei:iotdm:task/bulk-get';
			break;

		case 'group-list':
			if (node) {
				contents = '[' + node.groupId + ']';
				path = 'device/set/' + node.deviceId + '/urn:huawei:iotdm:device/data/huawei-iotdm-device-common:' + api;
			}
			break;

		default:
			console.log('No Support!');
			break;
	}

	var options = {
		host: config.host,
		port: config.port,
		path: '/iotdm/nb/v1/' + path,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': contents.length
		}
	};

	if (api !== 'dim-level') {
		console.log('POST------%s-------start-', api);
		console.log(options);
		console.log(contents);
		console.log('POST------%s--------end--', api);
	}

	if (connectStatus) {
		var req = http.request(options, function(res) {
			var data = '';
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				data += chunk;
			});
			res.on('end', function() {
				if (api !== 'dim-level') {
					console.log(api, data);
				}
				if (callback) {
					callback(data);
				}
			});
			res.on('error', function(err) {
				console.log(err);
			});
		});

		req.write(contents);
		req.end();
	}
};

exports.get = function(api, nodes, node, callback) {
	switch (api) {
		case 'dev-online-status':
			if (node) {
				path = 'system/action/urn:huawei:iotdm:advoper/' + api + '?esn=' + node.deviceId;
			} else {
				path = 'system/action/urn:huawei:iotdm:advoper/' + api + '?domain=' + config.domain;
			}
			break;

		case 'net-topo':
			path = 'device/get/' + config.gateway[topoCount % 2] + '/urn:huawei:iotdm:device/data/huawei-iotdm-device-common:' + api;
			break;

		case 'voltage':
		case 'current':
		case 'active-power':
		case 'power-grid':
		case 'total-energy':
			path = 'device/get/' + node.deviceId + '/urn:huawei:iotdm:device/group/huawei-iotdm-device-energy:' + api;
			break;

		case 'switch-status':
		case 'dim-level':
			path = 'device/get/' + node.deviceId + '/urn:huawei:iotdm:device/data/huawei-iotdm-device-sensor:' + api;
			break;

		case 'group-list':
			path = 'device/get/' + node.deviceId + '/urn:huawei:iotdm:device/data/huawei-iotdm-device-common:' + api;
			break;
		default:
			console.log('No Support!');
			break;
	}

	var options = {
		host: config.host,
		port: config.port,
		path: '/iotdm/nb/v1/' + path,
		method: 'GET'
	};
	console.log('GET------%s-------start-', api);
	console.log(options);
	console.log('GET------%s--------end--', api);

	if (connectStatus) {
		var req = http.request(options, function(res) {
			var data = '';
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				data += chunk;
			});
			res.on('end', function() {
				console.log(api, data);
				if (res.headers['content-type'] === 'application/json' && callback) {
					callback(data);
				}
			});
			res.on('error', function(err) {
				console.log(err);
			});
		});
		req.end();
	}
};