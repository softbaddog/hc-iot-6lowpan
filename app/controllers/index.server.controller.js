exports.render = function(req, res) {
	res.redirect('/zh');
};

exports.renderZh = function(req, res) {
	res.render('index', {
		title: '首页',
		welcome: '欢迎来到华为全联接大会IoT展区',
		topic: 'IEEE 802.15.4 / 6LoWPAN：无线传感器网络应用展示',
		remark: '（ 基于Huawei LiteOS互联互通中间件打造超大规模Mesh网络 ）',
		user: JSON.stringify(req.user)
	});
};

exports.renderEn = function(req, res) {
	res.render('index', {
		title: 'Home',
		welcome: 'Welcome to Huawei Connect 2016 IoT Display Area',
		topic: 'IEEE 802.15.4 / 6LoWPAN：Wireless Sensor Network Applicaiton Shows',
		remark: '(Large scale Mesh network Based on Huawei LiteOS Connection Middleware)',
		user: JSON.stringify(req.user)
	});
};