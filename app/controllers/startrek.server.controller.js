exports.render = function(req, res) {
	res.render('startrek', {
		title: '星空图',
		user: JSON.stringify(req.user)
	});
};