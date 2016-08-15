exports.render = function(req, res) {
	res.redirect('/zh/manual');
};

exports.renderZh = function(req, res) {
	res.render('manual', {
		title: '开发指导',
		wsn: '802.15.4 / 6LoWPAN',
		user: JSON.stringify(req.user)
	});
};

exports.renderEn = function(req, res) {
	res.render('manual', {
		title: '首页',
	});
};