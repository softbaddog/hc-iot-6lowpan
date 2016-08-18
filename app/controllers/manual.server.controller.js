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
			'zh': '无线嵌入式物联网',
			'en': 'Wireless Embedded Internet'
		},
		m1object: {
			'zh': 'IEEE 802.15.4 / 6LoWPAN 物联网标准',
			'en': 'IEEE 802.15.4 / 6LoWPAN IoT Standards'
		},
		m1topic1: {
			'zh': '为什么使用802.15.4/6LoWPAN？',
			'en': ''
		},
		m1topic2: {
			'zh': '无线嵌入式物联网通信技术挑战有哪些？',
			'en': ''
		},
		m1topic3: {
			'zh': '6LoWPAN架构、组网和路由技术',
			'en': ''
		},
		m1topic4: {
			'zh': '无线嵌入式物联网应用场景',
			'en': ''
		},
		m1topic5: {
			'zh': 'LPWAN会取代6LoWPAN吗？',
			'en': 'LR-WPAN和LPWAN技术对比'
		},
		m2a: {
			'zh': '物联网操作系统',
			'en': 'Internet of Things<br/>Operating System'
		},
		m2object: {
			'zh': 'Huawei LiteOS 互联互通中间件',
			'en': 'Huawei LiteOS Connectivity Middleware'
		},
		m2topic1: {
			'zh': 'Huawei LiteOS操作系统',
			'en': 'Huawei LiteOS Operating System'
		},
		m2topic2: {
			'zh': '6LoWPAN/uIP互联互通组件',
			'en': ''
		},
		m2topic3: {
			'zh': '华为照明物联网技术架构',
			'en': ''
		},
		m2topic4: {
			'zh': '应用场景：xxxx',
			'en': ''
		},
		m2topic5: {
			'zh': '开源与技术合作讲解',
			'en': ''
		},
		m3a: {
			'zh': '编程挑战-星际迷航',
			'en': 'Programming Challenge<br/>"Star Trex"'
		},
		m3object: {
			'zh': '面向嵌入式开发者',
			'en': 'For Embedded Application Developer'
		},
		m4a: {
			'zh': '编程挑战-星星点灯',
			'en': 'Programming Challenge<br/>"Star Light"'
		},
		m4object: {
			'zh': '面向应用开发者',
			'en': 'For Web Application Developer'
		},
		seemore: {
			'zh': '了解更多',
			'en': 'See More'
		},
		challenge: {
			'zh': '请你挑战',
			'en': 'Challenge'
		},
		user: JSON.stringify(req.user)
	});
};

exports.slider = function(req, res) {
	var titleJSON;
	var sliderJSON;

	if (req.session.lastPage) {
		console.log("Last Page: " + req.session.lastPage);
	}
	req.session.lastPage = req.path;

	switch (req.path) {
		case '/manual/6lowpan':
			titleJSON = {
				'zh': '无线嵌入式物联网',
				'en': 'Wireless Embedded Internet'
			};
			sliderJSON = '[{' +
				'"imagePath": "/img/6lowpan/幻灯片1.jpg", ' +
				'"order": "1", ' +
				'"url": "#", ' +
				'"slideText": "标题1"' +
				'},{' +
				'"imagePath": "/img/6lowpan/幻灯片2.jpg", ' +
				'"order": "2", ' +
				'"url": "#", ' +
				'"slideText": "标题2"' +
				'},{' +
				'"imagePath": "/img/6lowpan/幻灯片3.jpg", ' +
				'"order": "3", ' +
				'"url": "#", ' +
				'"slideText": "标题3"' +
				'},{' +
				'"imagePath": "/img/6lowpan/幻灯片4.jpg", ' +
				'"order": "4", ' +
				'"url": "#", ' +
				'"slideText": "标题4"' +
				'}]';
			console.log(JSON.parse(sliderJSON));
			break;
		case '/manual/liteos':
			titleJSON = {
				'zh': '物联网操作系统',
				'en': 'Internet of Things OS'
			};
			sliderJSON = '[{' +
				'"imagePath": "/img/liteos/幻灯片1.jpg", ' +
				'"order": "1", ' +
				'"url": "#", ' +
				'"slideText": "标题1"' +
				'},{' +
				'"imagePath": "/img/liteos/幻灯片2.jpg", ' +
				'"order": "2", ' +
				'"url": "#", ' +
				'"slideText": "标题2"' +
				'},{' +
				'"imagePath": "/img/liteos/幻灯片3.jpg", ' +
				'"order": "3", ' +
				'"url": "#", ' +
				'"slideText": "标题3"' +
				'},{' +
				'"imagePath": "/img/liteos/幻灯片4.jpg", ' +
				'"order": "4", ' +
				'"url": "#", ' +
				'"slideText": "标题4"' +
				'}]';
			console.log(JSON.parse(sliderJSON));
			break;
		default:
			// statements_def
			break;
	}

	res.render('slider', {
		layout: false,
		lang: req.session.lang || 'zh',
		title: titleJSON,
		sliderJSON: sliderJSON
	});
};

exports.code = function(req, res) {
	var titleJSON;
	var courseJSON;

	if (req.session.lastPage) {
		console.log("Last Page: " + req.session.lastPage);
	}
	req.session.lastPage = req.path;

	switch (req.path) {
		case '/manual/embedapp':
			titleJSON = {
				'zh': '编程挑战-星际迷航',
				'en': 'Wireless Embedded Internet'
			};
			courseJSON = '[{' +
				'"title": "故事背景", ' +
				'"description": "在无垠的银河系中，有5艘飞船由于通信故障与地球失去联系，由于相距遥远，无法直接联系到地球，只能通过多跳拓扑方式与地球取的联系，做为聪明的指挥官您，请尽快恢复通信，离开这个危险区域。", ' +
				'"content": "uIP/6LoWPAN组件", ' +
				'"detail": "是Huawei LiteOS物联网操作系统中在无线嵌入式物联网领域的互联互通通信中间件。", ' +
				'"file": "", ' +
				'"slideText": "标题1"' +
				'},{' +
				'"title": "组件架构", ' +
				'"description": "编程手册2", ' +
				'"content": "详细操作", ' +
				'"detail": "编程手册2", ' +
				'"file": "2.txt", ' +
				'"slideText": "标题2"' +
				'},{' +
				'"title": "实际操作", ' +
				'"description": "编程手册3", ' +
				'"content": "编程手册3", ' +
				'"detail": "编程手册3", ' +
				'"file": "1.txt", ' +
				'"slideText": "标题3"' +
				'},{' +
				'"title": "验证结果", ' +
				'"description": "编程手册4", ' +
				'"content": "编程手册4", ' +
				'"detail": "编程手册4", ' +
				'"file": "2.txt", ' +
				'"slideText": "标题4"' +
				'}]';
			console.log(JSON.parse(courseJSON));
			break;
		case '/manual/webapp/':
			titleJSON = {
				'zh': '编程挑战-星星点灯',
				'en': 'Wireless Embedded Internet'
			};
			courseJSON = '[{' +
				'"title": "故事背景", ' +
				'"description": "星际管理者，", ' +
				'"content": "JSON接口", ' +
				'"detail": "详细介绍", ' +
				'"file": "", ' +
				'"slideText": "标题1"' +
				'},{' +
				'"title": "组件架构", ' +
				'"description": "编程手册2", ' +
				'"content": "详细操作", ' +
				'"detail": "编程手册2", ' +
				'"file": "2.txt", ' +
				'"slideText": "标题2"' +
				'},{' +
				'"title": "实际操作", ' +
				'"description": "编程手册3", ' +
				'"content": "编程手册3", ' +
				'"detail": "编程手册3", ' +
				'"file": "1.txt", ' +
				'"slideText": "标题3"' +
				'},{' +
				'"title": "验证结果", ' +
				'"description": "编程手册4", ' +
				'"content": "编程手册4", ' +
				'"detail": "编程手册4", ' +
				'"file": "2.txt", ' +
				'"slideText": "标题4"' +
				'}]';
			console.log(JSON.parse(courseJSON));
			break;
		default:
			break;
	}

	res.render('code', {
		layout: false,
		lang: req.session.lang || 'zh',
		title: titleJSON,
		courses: courseJSON,
		prev: {
			'zh': '上一步',
			'en': 'Prev'
		},
		next: {
			'zh': '下一步',
			'en': 'Next'
		},
		close: {
			'zh': '关闭',
			'en': 'Close'
		}
	});
};