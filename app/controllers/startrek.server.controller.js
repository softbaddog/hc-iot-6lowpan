exports.render = function(req, res) {
	res.render('startrek', {
		layout: false,
		title: '星空图',
		user: JSON.stringify(req.user)
	});
};