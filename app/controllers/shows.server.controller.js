exports.render = function(req, res) {
	res.redirect('/zh/shows');
};

exports.renderEn = function(req, res) {
	res.render('shows', {
		layout: false,
		title: '展点应用',
		index: 'Huawei Connect 2016 IoT Applications Shows',
		show1a: 'Connected City Lighting <br/> Solution',
		show1b: 'Light up Smart City',
		show2a: 'Large scale Mesh network<br/>based on 6LoWPAN',
		show2b: 'Star Trek: Galaxy',
		seemore: 'READ MORE',
		user: JSON.stringify(req.user)
	});
};

exports.renderZh = function(req, res) {
	res.render('shows', {
		layout: false,
		title: '展点应用',
		index: '华为全联接大会IoT展点应用',
		show1a: '照明物联网',
		show1b: '点亮智慧城市',
		show2a: '6LoWPAN大规模<br/>Mesh组网',
		show2b: '星际迷航: 银河',
		seemore: '查看更多',
		user: JSON.stringify(req.user)
	});
};