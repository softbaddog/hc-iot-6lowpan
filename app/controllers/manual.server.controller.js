exports.render = function(req, res) {
	if (req.session.lastPage) {
		console.log("Last Page: " + req.session.lastPage);
	}
	req.session.lastPage = '/manual';

	res.render('manual', {
		lang: req.session.lang || 'zh',
		title: {
			'zh': '开发指导',
			'en': 'Developer Manual'
		},
		home: {
			'zh': '首页',
			'en': 'Home'
		},
		signin: {
			'zh': '登录',
			'en': 'Login'
		},
		signup: {
			'zh': '注册',
			'en': 'Register'
		},
		signout: {
			'zh': '注销',
			'en': 'Logout'
		},
		m1a: {
			'zh': '无线嵌入式互联网',
			'en': 'Wireless Embedded Internet'
		},
		m1object: {
			'zh': 'IEEE 802.15.4 / 6LoWPAN 物联网标准',
			'en': 'IEEE 802.15.4 / 6LoWPAN IoT Standard'
		},
		m2a: {
			'zh': '物联网操作系统',
			'en': 'Internet of Things<br/>Operate System'
		},
		m2object: {
			'zh': 'Huawei LiteOS 互联互通中间件',
			'en': 'Huawei LiteOS Connectivity Middleware'
		},
		m3a: {
			'zh': '编程挑战-星际迷航',
			'en': 'Programming Challenge<br/>Star Trex'
		},
		m3object: {
			'zh': '面向嵌入式开发者',
			'en': 'For Embedded Application Developer'
		},
		m4a: {
			'zh': '编程挑战-星星点灯',
			'en': 'Programming Challenge<br/>Star Light'
		},
		m4object: {
			'zh': '面向应用开发者',
			'en': 'For Web Application Developer'
		},
		seemore: {
			'zh': '了解更多',
			'en': 'SEE MORE'
		},
		challenge: {
			'zh': '请你挑战',
			'en': 'Challenge'
		},
		user: JSON.stringify(req.user)
	});
};