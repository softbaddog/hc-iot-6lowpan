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
	Node.find({}, '-_id name meta.texture meta.lightColor meta.x meta.y meta.z').exec(function(err, nodes) {
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
	}, '-_id name voltage current power frequency energy lifttime location').exec(function(err, node) {
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