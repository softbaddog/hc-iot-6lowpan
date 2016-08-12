var Node = require('mongoose').model('Node');
var request = require('../../config/request');

exports.render = function(req, res) {
	res.render('bulbctrl', {
		title: '灯控图',
		user: JSON.stringify(req.user)
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
	console.log(req.node);
	console.log(req.body);
	console.log("ctrl=====");
	res.json({});
};