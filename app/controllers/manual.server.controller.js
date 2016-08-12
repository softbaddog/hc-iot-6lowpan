exports.render = function(req, res) {
	res.redirect('/zh/manual');
};

exports.renderZh = function(req, res) {
	res.render('manual', {
		layout: false
	});
};

exports.renderEn = function(req, res) {
	res.render('manual', {
		layout: false
	});
};