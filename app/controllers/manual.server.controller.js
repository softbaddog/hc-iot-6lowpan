exports.render = function(req, res) {
	res.redirect('/zh/manual');
};

exports.renderZh = function(req, res) {
	res.render('manual', {
		title: '首页',
		user: JSON.stringify(req.user)
	});
};

exports.renderEn = function(req, res) {
	res.render('manual', {
		title: 'Index',
		user: JSON.stringify(req.user)
	});
};