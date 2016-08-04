var Node = require('mongoose').model('Node');
var http = require('http');
var querystring = require('querystring');

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
	Node.find({'status':1}).sort('name').populate('creator', 'email').exec(function(err, nodes) {
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
		node.groupId = req.body.groupId;
		node.status = req.body.status;
		node.parent = req.body.parent;

	if (req.body.level && node.level != req.body.level) {
			node.level = req.body.level;

			// 如果刷新了调光级别，需要下发http request到EEM平台
			var contents = querystring.stringify({
				index: '0',
				level: node.level,
			});

			console.log(contents);
			// var options = {
			// 	host: 'localhost',
			// 	port: '3000',
			// 	path: '/iotdm/nb/v1/device/set/' + node.deviceId + 'urn:huawei:iotdm:device/data/huawei-iotdm-device-sensor:dim-level',
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/x-www-form-urlencoded',
			// 		'Content-Length': contents.length
			// 	}
			// };
			// var req = http.request(options, function(res) {
			// 	res.setEncoding('utf8');
			// 	res.on('data', function(data) {
			// 		console.log(data);
			// 	});
			// });
			// req.write(contents);
			// req.end();
	}

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