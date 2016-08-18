exports.render = function(req, res) {
	req.session.lastPage = '/bulbctrl';
	res.render('bulbctrl', {
		layout: false,
		lang: req.session.lang || 'zh',
		title: {
			'zh':'灯控图',
			'en':'Bulb Controller'
		},
		user: JSON.stringify(req.user)
	});
};