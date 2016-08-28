var Node = require('mongoose').model('Node');
var request = require('../../config/request');
var fs = require('fs');

exports.render = function(req, res) {
	res.render('startrek', {
		layout: false,
		title: '星际迷航 - 银河'
	});
};

exports.audiofiles = function(req, res) {
	fs.readdir('./public/audio', function(err, files) {
		if (err) {
			return res.status(400).send({
				message: "不存在的目录"
			});
		} else {
			res.json(files);
		}
	});
};

exports.metadata = function(req, res) {
	Node.find({}, '-_id name groupId metadata.x metadata.y metadata.z').exec(function(err, nodes) {
		if (err) {
			return res.status(400).send({
				message: '未知错误'
			});
		} else {
			res.json(nodes);
		}
	});
};

exports.bulbctrl = function(req, res) {
	console.log(req.body);
	req.body.devices.forEach(function(element) {
		Node.findOne({
			name: element.name
		}).exec(function(err, node) {
			if (err) {
				return err;
			}

			if (!node) {
				return new Error('非法Name ' + element.name);
			}
			
			if (node.status === 0 || node.switch === 0) {
				return "设备离线";
			}

			if (element.brightness < 100) {
				node.level = (Math.floor(element.brightness/10)+1)*10;
			} else {
				node.level = 100;
			}

			// 如果查找到节点，不刷新数据库，直接下发指令到EEM
			request.post('dim-level', null, node);
		});
	});
	res.end();
};

exports.groupctrl = function(req, res) {
	console.log(req.body);
	req.body.group.forEach(function(element) {
		Node.find({
			groupId: element.name
		}).exec(function(err, nodes) {
			if (err) {
				return next(err);
			}

			if (!nodes) {
				return next(new Error('非法Group ' + element.name));
			}

			if (element.brightness < 30) {
				nodes[0].level = 30;
			} else if (element.brightness < 100) {
				nodes[0].level = (Math.floor(element.brightness/10)+1)*10;
			} else {
				nodes[0].level = 100;
			}

			// 如果刷新了调光级别，需要下发http request到EEM平台
			request.post('dim-level', nodes, null);

		});
	});
	res.end();
};
