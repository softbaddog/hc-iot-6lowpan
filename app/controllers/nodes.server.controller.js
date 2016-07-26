var Node = require('mongoose').model('Node');

// 创建新的节点
exports.create = function(req, res, next) {
	var node = new Node(req.body);

	node.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(node);
		}
	});
};

// 返回所有节点信息
exports.list = function(req, res, next) {
	Node.find({}, function(err, nodes) {
		if (err) {
			return next(err);
		} else {
			res.json(nodes);
		}
	});
};