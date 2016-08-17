exports.renderZh = function(req, res) {
	res.render('manual', {
		lang: 'zh',
		title: '开发指导',
		home: '首页',
		signin: '登录',
		signup: '注册',
		signout: '注销',
		m1a: '无线嵌入式互联网',
		m1object: 'IEEE 802.15.4 / 6LoWPAN 物联网标准',
		m2a: '物联网操作系统',
		m2object: 'Huawei LiteOS 互联互通中间件',
		m3a: '编程挑战-星际迷航',
		m3object: '面向嵌入式开发者',
		m4a: '编程挑战-星星点灯',
		m4object: '面向应用开发者',
		seemore: '了解更多',
		challenge: '请你挑战',
		user: JSON.stringify(req.user)
	});
};

exports.renderEn = function(req, res) {
	res.render('manual', {
		lang: 'en',
		title: 'Developer Manual',
		home: 'Home',
		signin: 'Login',
		signup: 'Register',
		signout: 'Logout',
		m1a: 'Wireless Embedded Internet',
		m1object: 'IEEE 802.15.4 / 6LoWPAN IoT Standard',
		m2a: 'Internet of Things<br/>Operate System',
		m2object: 'Huawei LiteOS Connectivity Middleware',
		m3a: 'Programming Challenge<br/>Star Trex',
		m3object: 'For Embedded Application Developer',
		m4a: 'Programming Challenge<br/>Star Light',
		m4object: 'For Web Application Developer',
		seemore: 'SEE MORE',
		challenge: 'Challenge',
		user: JSON.stringify(req.user)
	});
};