var http = require('http');
var querystring = require('querystring');
var config = require('./config');
var Node = require('mongoose').model('Node');

// { "online": [ "FFFF010203FCE000", "2E00000000000031", "2E00000000000030" ] }
exports.devStatus = function(devices) {
	devices.forEach(function(element, index) {
		Node.findOne({
			deviceId: element
		}).exec(function(err, node) {
			if (err) {
				return err;
			}

			if (!node) {
				return new Error('非法deviceId ' + element);
			}

			node.status = 1;
			node.updated = new Date();
			node.save(function(err) {
				if (!err) {
					console.log(node.name);
				}
			});
		});
	});
};

// r = '[ { "device-id": "FFFF010203FCE000", "status": "online", "node-id": 1, "parent-node-id": 0, "hop-count": 0 }, { "device-id": "2E00000000000030", "status": "online", "node-id": 2, "parent-node-id": 1, "hop-count": 1 }, { "device-id": "2E00000000000032", "status": "online", "node-id": 3, "parent-node-id": 1, "hop-count": 1 } ]';
exports.devTopo = function(devices) {
	// console.log(devices);
	var map = {};
	devices.forEach(function(element, index) {
		Node.findOne({
			deviceId: element.deviceid
		}).exec(function(err, node) {
			if (err) {
				return err;
			}

			if (!node) {
				return new Error('非法deviceId ' + element);
			}
			map[element.nodeid] = node.name;
		});
	});

	return map;

	// devices.forEach(function(element, index) {
	// if (element.parentnodeid == 0) { return; }
	// 	Node.findOne({
	// 		deviceId: element.deviceid
	// 	}).exec(function(err, node) {
	// 		if (err) {
	// 			return err;
	// 		}

	// 		if (!node) {
	// 			return new Error('非法deviceId ' + element);
	// 		}

	// 		node.parent = map[element.parentnodeid];
	// 		node.updated = new Date();
	// 		node.save(function(err) {
	// 			if (!err) {
	// 				console.log(node.name);
	// 			}
	// 		});
	// 	});	
	// });	
}
