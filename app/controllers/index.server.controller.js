exports.render = function(req, res) {
	res.render('index', {
		title: '首页',
		user: JSON.stringify(req.user)
	});
};