exports.render = function(req, res) {
	res.render('bulbctrl', {
		layout: false,
		title: '灯控图',
		user: JSON.stringify(req.user)
	});
};