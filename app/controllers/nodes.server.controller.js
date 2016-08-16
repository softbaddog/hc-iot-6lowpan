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
	var mapX = {
		'A': -900,
		'B': -800,
		'C': -700,
		'D': -600,
		'E': -500,
		'F': -400,
		'G': -300,
		'H': -200,
		'I': -100,
		'J': 0,
	};

	var mapY = {
		'1': -150,
		'2': -150,
		'3': -150,
		'4': -50,
		'5': -50,
		'6': -50,
		'7': 50,
		'8': 50,
		'9': 50,
		'10': 150,
		'11': 150,
		'12': 150,
		'13': 150,
	};

	var gArray = {
		0: ['roots'],
		1: ['H1', 'H2', 'H3', 'I1', 'I2', 'I3', 'J1', 'J2', 'J3'],
		2: ['F4', 'F5', 'F6', 'G4', 'G5', 'G6', 'H4', 'H5', 'H6'],
		3: ['D7', 'D8', 'D9', 'E7', 'E8', 'E9', 'F7', 'F8', 'F9'],
		4: ['A10', 'A11', 'A12', 'A13', 'B10', 'B11', 'B12', 'B13', 'C10', 'C11', 'C12', 'C13', 'D10', 'D11', 'D12', 'D13'],
		5: ['devices1', 'devices2', 'devices3', 'devices4', 'devices5'],
	};

	Node.find({}, function(err, nodes) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			nodes.forEach(function(element, index) {
				element.status = 0;
				element.parent = null;
				element.level = 0;
				element.switch = 0;
				element.params.voltage = 0;
				element.params.current = 0;
				element.params.power = 0;
				element.params.frequency = 0;
				element.params.energy = 0;
				element.params.lifttime = 100;
				element.params.location = '上海';

				// 按规律刷新灯节点位置信息
				if (element.name !== 'roots' && element.name.substr(0, 7) !== "devices") {
					element.metadata.x = parseInt(element.name.substr(1, element.name.length - 1)) * 100;
					element.metadata.y = mapY[element.name.substr(1, element.name.length - 1)];
					element.metadata.z = mapX[element.name.substr(0, 1)];
					console.log(mapX[element.name.substr(0, 1)], mapY[element.name.substr(1, element.name.length - 1)], parseInt(element.name.substr(1, element.name.length - 1)) * 100);
				}

				function findGroup(name) {
					for (var i = 0; i <= 5; i++) {
						for (j in gArray[i]) {
							if (gArray[i][j] === name) {
								return i;
							}
						}
					}
				}
				element.groupId = findGroup(element.name);
				console.log(element.name, element.groupId);

				// 为便于测试，新增随机路由
				// if (element.name !== 'roots') {
				// 	// element.parent = gArray[element.groupId-1][Math.floor(Math.random()*gArray[element.groupId-1].length)];
				// 	element.parent = gArray[element.groupId-1][0];
				// 	console.log(element.name, element.parent);					
				// }

				element.updated = new Date();
				element.save(function(err) {
					if (err) {
						return res.status(400).send({
							message: '未知错误'
						});
					} else {
						// 同步数据到所有终端
						// io.emit('onlineChanged', node);
					}
				});
			});
		}
		res.redirect('/bulbctrl#!/nodes');
	});
};

exports.gtest = function(req, res) {
	var levelList = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
	[1, 2, 3, 4].forEach(function(element) {
		var i = 0;
		Node.find({
			groupId: element
		}).exec(function(err, nodes) {
			if (err) {
				return err;
			}

			if (!nodes || nodes.length === 0) {
				return new Error('非法Group ' + element.name);
			}

			var post = function() {
				nodes[0].level = levelList[i++ % levelList.length];
				console.log(element, nodes[0].level);
				request.post('dim-level', nodes, null);
				if (i < levelList.length) {
					setTimeout(post, 5000);
				}
			};
			post();
		});
	});
	res.redirect('/bulbctrl#!/nodes');
};

exports.dtest = function(req, res) {
	var levelList = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
	Node.find({}, function(err, nodes) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			nodes.forEach(function(node, index) {
				if (node.name === 'roots' || node.name.substr(0, 7) == 'devices') {
					return new Error('无需处理');
				}
				var post = function() {
					node.level = levelList[Math.floor(Math.random() * levelList.length)];
					console.log(node.name, node.level);
					request.post('dim-level', null, node);
				};
				post();
			});
		}
	});
	res.redirect('/bulbctrl#!/nodes');
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

	// 在线状态
	request.get('dev-online-status', null, node, function(data) {
		var obj = JSON.parse(data.replace(/-/g, ''));
		response.devStatus(obj, node);

		// 只有状态为online时才发送后续查询指令 
		if (node.status === 1) {
			// 将当前分组信息刷新到服务器
			// request.post('group-list', null, node);

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
	// getNodeParams(req.node);
	res.json(req.node);
};

exports.update = function(req, res) {
	var node = req.node;

	node.name = req.body.name;
	node.deviceId = req.body.deviceId;

	if (node.parent != req.body.parent) {
		node.parent = req.body.parent;

		// 拓扑数据变更，同步数据到所有终端
		io.emit('topoChanged', node);
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
			node.parent = 'null';
		}

		io.emit('onlineChanged', node);
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