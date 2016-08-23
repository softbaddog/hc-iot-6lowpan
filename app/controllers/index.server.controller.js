exports.switchLanguage = function(req, res) {
	console.log(req.path);
	if (req.path === '/zh') {
		req.session.lang = 'en';
	} else if (req.path === '/en') {
		req.session.lang = 'zh';
	}

	res.redirect(req.session.lastPage);
};

exports.render = function(req, res) {
	if (req.session.lastPage) {
		console.log("Last Page: " + req.session.lastPage);
	}

	req.session.lastPage = '/';

	res.render('index', {
		lang: req.session.lang || 'zh',
		title: {
			'zh': '华为全联接2016',
			'en': 'Huawei Connect 2016'
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
			'en': 'Register',
		},
		signout: {
			'zh': '注销',
			'en': 'Logout'
		},
		quicksignup: {
			'zh': '立即注册',
			'en': 'Register Quickly'
		},
		welcome: {
			'zh': '欢迎来到华为全联接大会IoT展区',
			'en': 'Welcome to Huawei Connect 2016 IoT Display Area'
		},
		topic: {
			'zh': 'IEEE 802.15.4 / 6LoWPAN：无线嵌入式物联网应用展示',
			'en': 'IEEE 802.15.4 / 6LoWPAN：Wireless Embeded Internet Applicaiton Shows'
		},
		remark: {
			'zh': '（ 基于Huawei LiteOS互联互通中间件打造超大规模Mesh网络 ）',
			'en': '( Large Scale Mesh Network Based on Huawei LiteOS Connectivity Middleware )'
		},
		admin: {
			'zh': '灯控后台',
			'en': 'Administator Page',
		},
		shows: {
			'zh': '展示应用',
			'en': 'Shows Page'
		},
		manual: {
			'zh': '开发指南',
			'en': 'Developer Manual'
		},
		user: JSON.stringify(req.user)
	});
};