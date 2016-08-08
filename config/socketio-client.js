var config = require('./config');
var request = require('./request');

module.exports = function() {
	var socket = require('socket.io-client')('http://' + config.host + ':' + config.port);
	socket.on('connect', function() {
		socket.send('hello world');

		// 与EEM连接成功后，每分钟获取一次所有设备状态
		setInterval(request.post('dev-online-status', function(err, data) {
			if (err) {
				console.log(err);
			}

			// 解析数据并保存到数据库
		}), 60000);

		// 每10秒获取一次网络拓扑信息
		setInterval(request.get('net-topo', function(err, data) {
			if (err) {
				console.log(err);
			}

			// 解析数据并保存到数据库
		}), 10000);

		socket.on('message', function(data) {
			console.log(data);
		});
	});
};