var Node = require('mongoose').model('Node');
var request = require('../../config/request');

var level_table = [0, 25, 50, 75, 100, 125];

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

exports.online = function(req, res) {
	Node.find({
		'status': 1
	}, 'name').sort('name').exec(function(err, nodes) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(nodes.map(function(x) {
				return x.name;
			}));
		}
	});
};

exports.mesh = function(req, res) {
	Node.find({
		'status': 1
	}, '-_id name parent').exec(function(err, nodes) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(nodes);
		}
	});
};

exports.pos = function(req, res) {
	Node.find({}, '-_id name groupId metadata.x metadata.y metadata.z').exec(function(err, nodes) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(nodes);
		}
	});
};

exports.nodeByName = function(req, res, next, name) {
	Node.findOne({
		name: name
	}, '-_id name switch status level params.voltage params.current params.power params.frequency params.energy params.lifttime params.location').exec(function(err, node) {
		if (err) {
			return next(err);
		}

		if (!node) {
			return next(new Error('非法Name ' + name));
		}

		req.node = node;
		next();
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
	node.groupId = req.body.groupId;
	node.status = req.body.status;
	node.parent = req.body.parent;
	node.switch = req.body.switch;

	node.params = req.body.params;
	node.metadata = req.body.metadata;

	if (req.body.level && node.level != req.body.level) {
		node.level = req.body.level;

		// 如果刷新了调光级别，需要下发http request到EEM平台
		request.post('dim-level', null, node);
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

exports.bulbctrl = function(req, res) {
	console.log(req.body);
	req.body.devices.forEach(function(element, index) {
		Node.findOne({
			name: element.name
		}).exec(function(err, node) {
			if (err) {
				return next(err);
			}

			if (!node) {
				return next(new Error('非法Name ' + element.name));
			}

			if (node.level !== level_table[element.brightness]) {
				node.level = level_table[element.brightness];
				node.save(function(err) {
					if (err) {
						console.log(err);
					} else {
						// 调光通知
						// io.emit('nodeChanged', node);

						// 如果刷新了调光级别，需要下发http request到EEM平台
						request.post('dim-level', null, node);
					}
				});
			}
		});
	});
	res.end();
};

exports.groupctrl = function(req, res) {
	console.log(req.body);
	req.body.group.forEach(function(element, index) {
		Node.find({
			groupId: element.name
		}).exec(function(err, nodes) {
			if (err) {
				return next(err);
			}

			if (!nodes) {
				return next(new Error('非法Group ' + element.name));
			}

			nodes.forEach(function(node, index) {
				if (node.level !== level_table[element.brightness]) {
					node.level = level_table[element.brightness];
					node.save(function(err) {
						if (err) {
							console.log(err);
						} else {
							// 调光通知
							// io.emit('nodeChanged', node);
						}
					});
				}
			});

			// 如果刷新了调光级别，需要下发http request到EEM平台
			request.post('dim-level', nodes, null);			
		});
	});
	res.end();
};

exports.ctrl = function(req, res) {
	console.log(req.node);
	console.log(req.body);
	console.log("ctrl=====");
	res.json({});
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