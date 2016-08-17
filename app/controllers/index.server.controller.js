exports.render = function(req, res) {
	res.redirect('/zh');
};

exports.renderZh = function(req, res) {
	res.render('index', {
		lang: 'zh',
		title: '华为全联接大会2016',
		home: '首页',
		signin: '登录',
		signup: '注册',
		quicksignup: '立即注册',
		signout: '注销',
		welcome: '欢迎来到华为全联接大会IoT展区',
		topic: 'IEEE 802.15.4 / 6LoWPAN：无线传感器网络应用展示',
		remark: '（ 基于Huawei LiteOS互联互通中间件打造超大规模Mesh网络 ）',
		admin: '灯控后台',
		shows: '展示应用',
		manual: '开发指南',
		user: JSON.stringify(req.user)
	});
};

exports.renderEn = function(req, res) {
	res.render('index', {
		lang: 'en',
		title: 'Home',
		home: 'Home',
		signin: 'Login',
		signup: 'Register',
		quicksignup: 'Register Fast',
		signout: 'Logout',
		welcome: 'Welcome to Huawei Connect 2016 IoT Display Area',
		topic: 'IEEE 802.15.4 / 6LoWPAN：Wireless Sensor Network Applicaiton Shows',
		remark: '( Large scale Mesh network Based on Huawei LiteOS Connection Middleware )',
		admin: 'Administator Page',
		shows: 'Shows',
		manual: 'Developer Manual',
		user: JSON.stringify(req.user)
	});
};