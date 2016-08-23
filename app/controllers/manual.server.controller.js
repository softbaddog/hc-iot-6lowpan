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
		m1head: {
			'zh': '精彩内容',
			'en': 'Contents'
		},
		m1topic1: {
			'zh': '802.15.4、6LoWPAN和RPL',
			'en': ''
		},
		m1topic2: {
			'zh': 'LR-WPAN通信技术挑战',
			'en': ''
		},
		m1topic3: {
			'zh': '802.15.4适用场景',
			'en': ''
		},
		m1topic4: {
			'zh': '华为nStack IoT组件增强',
			'en': ''
		},
		m1topic5: {
			'zh': '物联网通信3种芯片方案',
			'en': ''
		},
		m2a: {
			'zh': '物联网操作系统',
			'en': 'Internet of Things<br/>Operating System'
		},
		m2object: {
			'zh': 'Huawei LiteOS 互联互通中间件',
			'en': 'Huawei LiteOS Connectivity Middleware'
		},
		m2head: {
			'zh': '精彩内容',
			'en': 'Contents'
		},
		m2topic1: {
			'zh': '嵌入式设备需要强健的OS',
			'en': ''
		},
		m2topic2: {
			'zh': '支持多芯片，多行业诉求',
			'en': ''
		},
		m2topic3: {
			'zh': '支持多种协议混合接入',
			'en': ''
		},
		m2topic4: {
			'zh': '华为nStack IoT组件架构',
			'en': ''
		},
		m2topic5: {
			'zh': 'IoT智能硬件7大方面问题',
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
		m3head: {
			'zh': '嵌入式应用开发',
			'en': ''
		},
		m3topic1: {
			'zh': '要求具备嵌入式C语言技术背景',
			'en': ''
		},
		m3topic2: {
			'zh': '要求熟练掌握IAR嵌入式开发工具',
			'en': ''
		},
		m3topic3: {
			'zh': '可快速掌握LiteOS网络组件开发方式',
			'en': ''
		},
		m3topic4: {
			'zh': '可体验固件开发与烧录流程',
			'en': ''
		},
		m3topic5: {
			'zh': '实现物联网终端快速入网',
			'en': ''
		},
		m4a: {
			'zh': '编程挑战-星际管家',
			'en': 'Programming Challenge<br/>"Star Manager"'
		},
		m4object: {
			'zh': '面向应用开发者',
			'en': 'For Web Application Developer'
		},
		m4head: {
			'zh': 'Web应用开发',
			'en': ''
		},
		m4topic1: {
			'zh': '要求具备HTML/JS语言技术背景',
			'en': ''
		},
		m4topic2: {
			'zh': '要求熟悉Restful API和JSON数据模型',
			'en': ''
		},
		m4topic3: {
			'zh': '可基于AC-IoT开发极具个性的Web应用',
			'en': ''
		},
		m4topic4: {
			'zh': '可体验Web Ajax异步通信开发方式',
			'en': ''
		},
		m4topic5: {
			'zh': '实现物联网终端远程管理',
			'en': ''
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
				'"imagePath": "/img/6lowpan/6lowpan.001.png", ' +
				'"order": "1", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/6lowpan/6lowpan.002.png", ' +
				'"order": "2", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/6lowpan/6lowpan.003.png", ' +
				'"order": "3", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/6lowpan/6lowpan.004.png", ' +
				'"order": "4", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/6lowpan/6lowpan.005.png", ' +
				'"order": "4", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'}]';
			console.log(JSON.parse(sliderJSON));
			break;
		case '/manual/liteos':
			titleJSON = {
				'zh': '物联网操作系统',
				'en': 'Internet of Things OS'
			};
			sliderJSON = '[{' +
				'"imagePath": "/img/liteos/liteos.001.png", ' +
				'"order": "1", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/liteos/liteos.002.png", ' +
				'"order": "2", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/liteos/liteos.003.png", ' +
				'"order": "3", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/liteos/liteos.004.png", ' +
				'"order": "4", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/liteos/liteos.005.png", ' +
				'"order": "4", ' +
				'"url": "#", ' +
				'"slideText": ""' +
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
				'en': ''
			};
			courseJSON = '[{' +
				'"title": "故事背景", ' +
				'"description": "在无垠的银河系中，有5艘宇宙飞船因通信故障与地球失去了联系，由于相距遥远，无法直接联系到地球，只能通过行星多跳方式才能与地球取的联系，做为其中一架飞船指挥官的您，请尽快尝试恢复通信，离开这一危险区域。<hr><p>任务一：快速掌握Huawei LiteOS互联互通组件使用方法</p><p>任务二：打开编译工程，填写关键api，使用socket接口恢复网络通信。</p><p>任务三：将代码编译成二进制固件，并烧录到飞船通信模块中。</p>", ' +
				'"content": "nStack/6LoWPAN组件介绍", ' +
				'"detail": "是Huawei LiteOS物联网操作系统中在无线嵌入式物联网领域的互联互通通信中间件。<br/><img src=/img/ipvs6lowpan.png width=400 heigth=300>", ' +
				'"file": ""' +
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
				'"file": "1.txt"' +
				'},{' +
				'"title": "验证结果", ' +
				'"description": "编程手册4", ' +
				'"content": "编程手册4", ' +
				'"detail": "编程手册4", ' +
				'"file": "2.txt"' +
				'}]';
			console.log(JSON.parse(courseJSON));
			break;
		case '/manual/webapp':
			titleJSON = {
				'zh': '编程挑战-星际管家',
				'en': ''
			};
			courseJSON = '[{' +
				'"title": "故事背景", ' +
				'"description": "公元3389年，人类早已经走出太阳系，并在多个小行星上创建殖民地。您做为一名优秀的星际管理员希望在任何时候监控小行星上的情况。请您基于Web技术实现远程管理，尝试获取各个行星（灯）上的能量数据。<img src=/img/look_star.jpg width=300 height=200>", ' +
				'"content": "华为照明物联网方案", ' +
				'"detail": "内容待补充", ' +
				'"file": ""' +
				'},{' +
				'"title": "方案详解", ' +
				'"description": "Web应用早已被人们所接受，由于其跨平台能力，可以在任意尺寸设备上进行展示。做为一名Web应用开发者的您，一定尽快想大显身手，把<strong>小行星能量管理</strong>应用部署在Web服务器上。为了能让您快速掌握开发方法，我们先了解一下这一系统架构模型。<p><img src=/img/ar502.png width=500 heigth=75></p>", ' +
				'"content": "答题准备", ' +
				'"detail": "我们已经为您准备好基于HTML5/JS的工程目录，最终效果如下图所示。您只需要按照提示，理解JSON格式数据模型，便能在数分钟完成应用开发。<br>由于我们华为工程师GG提供了多种JSON接口给我们使用，这里我们推荐使用2种编程方法，您可以根据需要选择其中一种来尝试解答。只要您能够<strong>读取3种以上能量数据</strong>，就能获得我们提供的精美小礼品。<p><img src=/img/lighting.jpg width=300 heigth=400></p>", ' +
				'"file": ""' +
				'},{' +
				'"title": "批量读取能量数据", ' +
				'"description": "编程手册3", ' +
				'"content": "开发指导", ' +
				'"detail": "一次性将所有能量数据读取回来", ' +
				'"file": "bultGet.js"' +
				'},{' +
				'"title": "逐条读取能量数据", ' +
				'"description": "编程手册4", ' +
				'"content": "编程手册4", ' +
				'"detail": "编程手册4", ' +
				'"file": "singleGet.js"' +
				'},{' +
				'"title": "验证结果", ' +
				'"description": "编程手册4", ' +
				'"content": "编程手册4", ' +
				'"detail": "编程手册4", ' +
				'"file": "2.txt"' +
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