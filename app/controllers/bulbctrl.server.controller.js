var Node = require('mongoose').model('Node');
var request = require('../../config/request');

exports.render = function(req, res) {
	res.render('bulbctrl', {
		title: '灯控图',
		user: JSON.stringify(req.user)
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