exports.render = function(req, res) {
	req.session.lastPage = '/shows';
	res.render('shows', {
		layout: false,
		lang: req.session.lang || 'zh',
		title: {
			'zh':'展点应用',
			'en':'Shows'
		},
		index: {
			'zh':'华为全联接大会IoT展点应用',
			'en':'Huawei Connect 2016 IoT Applications Shows'
		},
		switchlang: {
			'zh':'EN',
			'en':'中文'
		},
		show1a: {
			'zh':'照明物联网',
			'en':'Connected City Lighting <br/> Solution'
		},
		show1b: {
			'zh':'点亮智慧城市',
			'en':'Light up Smart City'
		},
		show2a: {
			'zh':'6LoWPAN大规模<br/>Mesh组网',
			'en':'Large scale Mesh network<br/>based on 6LoWPAN'
		},
		show2b: {
			'zh':'星际迷航: 银河',
			'en':'Star Trek: Galaxy'
		},
		seemore: {
			'zh':'查看更多',
			'en':'READ MORE'
		},
		user: JSON.stringify(req.user)
	});
};