exports.render = function(req, res) {
	res.render('bulbctrl', {
		layout: true,
		title: '灯控图',
		user: JSON.stringify(req.user)
	});
};

exports.bulbctrl = function(node, level) {

};

exports.groupctrl = function(nodes, level) {

};