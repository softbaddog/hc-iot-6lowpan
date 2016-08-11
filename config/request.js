var http = require('http');
var querystring = require('querystring');
var config = require('./config');

exports.post = function(api, nodes, node, callback) {
	switch (api) {
		case 'dim-level':
			if (node) {
				contents = JSON.stringify({
					'index': 0,
					'level': node.level,
				});
				path = 'device/set/' + node.deviceId + '/urn:huawei:iotdm:device/data/huawei-iotdm-device-sensor:' + api;
			} else if (nodes) {
				contents = JSON.stringify({
					'gid': nodes[0].groupId,
					'type': 'set',
					'path': '/huawei-iotdm-device:data/huawei-iotdm-device-sensor:' + api,
					'body': {
						'index': 0,
						'level': nodes[0].level
					}
				});
				path = 'device/action/' + config.gateway + '/urn:huawei:iotdm:device/huawei-iotdm-device-common:multicast';
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
		case 'group-list':
			if (node) {
				contents = JSON.stringify({
					node.groupId
				});
				path = 'device/set/' + node.deviceId + '/urn:huawei:iotdm:device/data/huawei-iotdm-device-common:' + api;
			}		
			break;
		default:
			console.log('No Support!');
			break;
	}

	console.log(contents);
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

	console.log(options);
	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function(data) {
			console.log(api, data);
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
			path = 'device/get/' + config.gateway + '/urn:huawei:iotdm:device/data/huawei-iotdm-device-common:' + api;
			break;
		case 'voltage':
		case 'current':
			path = 'device/get/' + node.deviceId + '/urn:huawei:iotdm:device/group/huawei-iotdm-device-energy:' + api;
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

	console.log(options);
	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function(data) {
			console.log(api, data);
			if (callback) {
				callback(data);
			}
		});
		res.on('error', function(err) {
			console.log(err);
		});
	});

	req.end();
};
