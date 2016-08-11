exports.render = function(req, res) {
	res.redirect('/zh');
};

exports.renderZh = function(req, res) {
	res.render('index', {
		title: '首页',
		welcome: '欢迎来到华为全联接大会IoT展区',
		topic: '6LoWPAN：无线嵌入式物联网',
		user: JSON.stringify(req.user)
	});
};

exports.renderEn = function(req, res) {
	res.render('index', {
		title: 'Index',
		welcome: 'Welcome to Huawei Connect 2016 IoT Shows',
		topic: '6LoWPAN：Wireless Sensor Network',
		user: JSON.stringify(req.user)
	});
};