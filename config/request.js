var http = require('http');
var querystring = require('querystring');
var config = require('./config');

exports.post = function(api, nodes, node, callback) {
	switch (api) {
		case 'dim-level':
			if (node) {
				contents = querystring.stringify({
					'index': 0,
					'level': node.level,
				});
				path = 'device/set/' + node.deviceId + '/urn:huawei:iotdm:device/data/huawei-iotdm-device-sensor:' + api;
			} else if (nodes) {
				contents = querystring.stringify({
					'gid': nodes[0].group,
					'type': 'set',
					'path': '/huawei-iotdm-device:data/huawei-iotdm-device-sensor:' + api,
					'body': {
						'index': 0,
						'level': node.level
					}
				});
				path = 'device/set/' + node.deviceId + '/urn:huawei:iotdm:device/data/huawei-iotdm:device/huawei-iotdm-device-common:multicast';
			}
			break;
		case 'dev-online-status':
			if (node) {
				contents = '';
				path = 'system/action/urn:huawei:iotdm:advoper/' + api + '?esn=' + node.deviceId;
			} else if (nodes) {
				contents = '';
				path = 'system/action/urn:huawei:iotdm:advoper/' + api + '?domain=' + config.domain;
			}
			break;
		case 'force-leave-net':
			if (node) {
				contents = querystring.stringify({
					'leave-time': 45
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
			'Content-Type': 'application/x-www-form-urlencoded',
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
		case 'net-topo':
			contents = '';
			path = 'device/get/' + config.gateway + 'urn:huawei:iotdm:device/huawei-iotdm-common:' + api;
			break;
		case 'voltage':
		case 'current':
			contents = '';
			path = 'device/get/' + node.deviceId + 'urn:huawei:iotdm:device/group/huawei-iotdm-device-energy:' + api;
			break;
		default:
			console.log('No Support!');
			break;
	}

	var options = {
		host: config.host,
		port: config.host,
		path: '/iotdm/nb/v1/' + path,
		method: 'GET',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': contents.length
		}
	};
	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function(data) {
			console.log(data);
			if (callback) {
				callback(api, data);
			}
		});
		res.on('error', function(err) {
			console.log(err);
		});
	});

	req.write(contents);
	req.end();
};