var Node = require('mongoose').model('Node');
var request = require('../../config/request');
var response = require('../../config/response');

var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return '未知错误';
	}
};

var getNodeResource = function(node) {
	// 在线状态
	request.get('dev-online-status', null, node, function(data) {
		var obj = JSON.parse(data.replace(/-/g, ''));
		response.devStatus(obj, node);

		// 只有状态为online时才发送后续查询指令
		if (node.status === 1) {
			// 将当前分组信息刷新到服务器
			request.post('group-list', null, node);

			// 开光状态
			request.get('switch-status', null, node, function(data) {
				var obj = JSON.parse(data.replace(/-/g, ''));
				response.devSwitch(obj, node);

				// 调光级别
				request.get('dim-level', null, node, function(data) {
					var obj = JSON.parse(data.replace(/-/g, ''));
					response.devLevel(obj, node);

					// 电流
					request.get('current', null, node, function(data) {
						var obj = JSON.parse(data.replace(/-/g, ''));
						response.devCurrent(obj, node);

						// 有功功率
						request.get('active-power', null, node, function(data) {
							var obj = JSON.parse(data.replace(/-/g, ''));
							response.devPower(obj, node);

							// 电压
							request.get('voltage', null, node, function(data) {
								var obj = JSON.parse(data.replace(/-/g, ''));
								response.devVoltage(obj, node);

								// 电能
								request.get('total-energy', null, node, function(data) {
									var obj = JSON.parse(data.replace(/-/g, ''));
									response.devEnergy(obj, node);

									// 频率
									request.get('power-grid', null, node, function(data) {
										var obj = JSON.parse(data.replace(/-/g, ''));
										response.devFrequency(obj, node);

										// 分组
										request.get('group-list', null, node, function() {
											console.log(node.name, node.groupId);
										});
									});

								});
							});
						});
					});
				});
			});
		}
	});
};

exports.sync = function(req, res) {
	var node = req.node;

	// 数据清空
	node.status = 0;
	node.level = 0;
	node.switch = 0;
	node.params.voltage = 0;
	node.params.current = 0;
	node.params.power = 0;
	node.params.frequency = 0;
	node.params.energy = 0;

	if (node.name === 'roots') {
		return;
	}
	getNodeResource(node);
	res.redirect('/admin#!/nodes');
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
	// getNodeParams(req.node);
	res.json(req.node);
};

exports.update = function(req, res) {
	var topoChanged = false;
	var onlineChanged = false;
	var node = req.node;

	node.name = req.body.name;
	node.deviceId = req.body.deviceId;

	if (node.parent != req.body.parent) {
		node.parent = req.body.parent;
		topoChanged = true;
	}

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
			node.parent = null;
		}

		onlineChanged = true;
		topoChanged = true;
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
			if (topoChanged) io.emit('topoChanged', node);
			if (onlineChanged) io.emit('onlineChanged', node);
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