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

exports.render = function(req, res) {
	res.render('bulbctrl', {
		title: '灯控图',
		user: JSON.stringify(req.user)
	});
};

exports.nodeByName = function(req, res, next, name) {
	Node.findOne({
		name: name
	}).populate('creator', 'email').exec(function(err, node) {
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

exports.read = function(req, res) {
	res.json(req.node);
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

exports.ctrl = function(req, res) {
	var node = req.node;
	var data = req.body;

	console.log(data);

	if (data.reboot) {
		// 下发退网指令
		request.post('force-leave-net', null, node);

		node.status = 0;
		node.parent = 'null';
	}

	if (data.switch) {
		if (data.switch === 'on') {
			node.switch = 1;
			node.level = 100;
		} else {
			node.switch = 0;
			node.level = 0;
		}

		// 同步开光状态
		request.post('switch-status', null, node);
	}

	if (data.brightness) {
		if (node.level !== data.brightness) {
			node.level = data.brightness;

			// 刷新调光信息
			request.post('dim-level', null, node);
		}
	}

	node.updated = new Date();
	node.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			io.emit('nodeChanged', node);
			res.end();
		}
	});
};