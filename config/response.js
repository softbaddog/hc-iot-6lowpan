var http = require('http');
var querystring = require('querystring');
var config = require('./config');
var Node = require('mongoose').model('Node');

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
