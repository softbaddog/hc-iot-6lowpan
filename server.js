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

// setTimeout(function() {
// 	request.get('dev-online-status', null, null, function(data) {
// 		var devices = JSON.parse(data).online;
// 		response.devStatus(devices);
// 	});
// }, 2000);

// setTimeout(function() {
// 	request.get('net-topo', null, null, function(data) {
// 		var devices = JSON.parse(data.replace(/-/g, ''));
// 		var map = response.devTopo(devices);
// 		console.log(map);
// 	});
// }, 5000);

module.exports = app;

console.log("HC-IoT-6LoWPAN Server running at http://localhost:3000");
