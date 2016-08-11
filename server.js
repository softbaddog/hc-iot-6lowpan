process.env.NODE_ENV = process.env.NODE_ENV || "development";

var mongoose = require('./config/mongoose');
var	express = require('./config/express');
var	passport = require('./config/passport');

var db = mongoose();
var app = express(db);
var pass = passport();

app.listen(3000);

require('./config/socketio-client').initialize();

var request = require('./config/request');
var response = require('./config/response');

setTimeout(function() {
	data = '{ "online": [ "FFFF010203FCE000", "2E00000000000031", "2E00000000000030" ] }';
	// request.get('dev-online-status', null, null, function(data) {
		var devices = JSON.parse(data);
		console.log(devices);
		response.devStatus(devices);
	// });
}, 1000);

setTimeout(function() {
	data = '[ { "device-id": "FFFF010203FCE000", "status": "online", "node-id": 1, "parent-node-id": 0, "hop-count": 0 }, { "device-id": "2E00000000000030", "status": "online", "node-id": 2, "parent-node-id": 1, "hop-count": 1 }, { "device-id": "2E00000000000032", "status": "online", "node-id": 3, "parent-node-id": 2, "hop-count": 1 } ]';
	// request.get('net-topo', null, null, function(data) {
	var devices = JSON.parse(data.replace(/-/g, ''));
	console.log(devices);
	var map = {};
	response.devMap(devices, function(key, value) {
		map[key] = value;
	});
	response.devTopo(devices, map);			
// });
}, 3000);

module.exports = app;

console.log("HC-IoT-6LoWPAN Server running at http://localhost:3000");
