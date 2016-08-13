var Node = require('mongoose').model('Node');
var request = require('../../config/request');

var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return '未知错误';
	}
};

exports.create = function(req, res) {
	var node = new Node(req.body);
	node.creator = req.user;

	node.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(node);
		}
	});
};

exports.init = function(req, res) {
	Node.find({}, function(err, nodes) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			nodes.forEach(function(element, index) {
				element.groupId = 0;
				if (element.name != 'roots') {
					element.status = 0;
				}
				element.parent = 'null';
				element.level = 0;
				element.switch = 0;
				element.params.voltage = 0;
				element.params.current = 0;
				element.params.power = 0;
				element.params.frequency = 0;
				element.params.energy = 0;
				element.params.lifttime = 100;
				element.params.location = '上海';
				element.updated = new Date();
				element.save(function(err) {
					if (err) {
						return res.status(400).send({
							message: '未知错误'
						});
					}
				});
			});
		}
		res.redirect('/bulbctrl#!/nodes');
	});
};

exports.sync = function(req, res) 	{
	Node.find().sort('name').exec(function(err, nodes) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			nodes.forEach(function(node) {
				// 在线状态
				request.get('dev-online-status', null, node, function(data) {
					var obj = JSON.parse(data.replace(/-/g, ''));
					reponse.devStatus(obj, node);
				});
				// 电压
				request.get('voltage', null, node, function(data) {
					var obj = JSON.parse(data.replace(/-/g, ''));
					reponse.devVoltage(obj, node);
				});
				// 电流
				request.get('current', null, node, function(data) {
					var obj = JSON.parse(data.replace(/-/g, ''));
					reponse.devCurrent(obj, node);
				});
				// 有功功率
				request.get('active-power', null, node, function(data) {
					var obj = JSON.parse(data.replace(/-/g, ''));
					reponse.devPower(obj, node);
				});
				// 频率
				request.get('power-grid', null, node, function(data) {
					var obj = JSON.parse(data.replace(/-/g, ''));
					reponse.devFrequency(obj, node);
				});
				// 电能
				request.get('total-energy', null, node, function(data) {
					var obj = JSON.parse(data.replace(/-/g, ''));
					reponse.devEnergy(obj, node);
				});
			});
		}
	});
	res.redirect('/bulbctrl#!/nodes');
};

exports.list = function(req, res) {
	Node.find().sort('name').populate('creator', 'email').exec(function(err, nodes) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(nodes);
		}
	});
};

exports.nodeByID = function(req, res, next, id) {
	Node.findById(id).populate('creator', 'email').exec(function(err, node) {
		if (err) {
			return next(err);
		}

		if (!node) {
			return next(new Error('非法NodeId ' + id));
		}

		req.node = node;
		next();
	});
};

exports.read = function(req, res) {
	res.json(req.node);
};

exports.update = function(req, res) {
	var node = req.node;

	node.name = req.body.name;
	node.deviceId = req.body.deviceId;

	node.parent = req.body.parent;

	node.params = req.body.params;
	node.metadata = req.body.metadata;

	if (node.groupId != req.body.groupId) {
		node.groupId = req.body.groupId;

		// 刷新分组信息
		request.post('group-list', null, node);
	}


	if (node.level != req.body.level) {
		node.level = req.body.level;

		// 刷新调光信息
		request.post('dim-level', null, node);
	}

	if (node.status != req.body.status) {
		node.status = req.body.status;

		// 如果状态转成离线，需要将路由节点置空，且需要将其作为父节点的Node状态同时置空
		if (node.status === 0) {
			node.parent = 'null';
		} else {
			node.parent = 'roots';
			io.emit('nodeChanged', node);
		}
	}

	if (node.switch != req.body.switch) {
		node.switch = req.body.switch;

		// 同步开光状态
		request.post('switch-status', null, node);

		// 如果开关设置为关，调光级别无意义，默认重置为0
		if (node.switch === 0) {
			node.level = 0;
		} else {
			node.level = 100;
		}
	}

	node.updated = new Date();
	node.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(node);
		}
	});
};

exports.delete = function(req, res) {
	var node = req.node;

	node.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(node);
		}
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.node.creator.id !== req.user.id) {
		return res.status(403).send({
			message: '用户未授权'
		});
	}
	next();
};