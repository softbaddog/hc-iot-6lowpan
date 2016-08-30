exports.render = function(req, res) {
	if (req.session.lastPage) {
		console.log("Last Page: " + req.session.lastPage);
	}
	req.session.lastPage = '/manual';

	res.render('manual', {
		lang: req.session.lang || 'zh',
		title: {
			'zh': '开发指导',
			'en': 'Development Guides'
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
			'zh': '短距无线物联网',
			'en': 'Short-distance Wireless Embedded Internet'
		},
		m1object: {
			'zh': 'IEEE 802.15.4、6LoWPAN与RPL',
			'en': 'IEEE 802.15.4、6LoWPAN and RPL'
		},
		m1head: {
			'zh': '精彩内容',
			'en': 'Contents'
		},
		m1topic1: {
			'zh': '802.15.4、6LoWPAN和RPL来源',
			'en': 'IEEE 802.15.4, 6LoWPAN, and RPL'
		},
		m1topic2: {
			'zh': 'LR-WPAN通信技术挑战',
			'en': 'LR-WPAN communication technology challenges'
		},
		m1topic3: {
			'zh': '短距无线适用场景举例',
			'en': 'Examples of short-distance wireless IoT application scenarios'
		},
		m1topic4: {
			'zh': '华为nStack IoT组件增强特性',
			'en': 'Enhanced features of Huawei nStack IoT component'
		},
		m1topic5: {
			'zh': '基于AR502E+AC-IoT打造IoT生态圈',
			'en': 'Building IoT ecosystem based on AR502E and AC-IoT'
		},
		m2a: {
			'zh': '物联网操作系统',
			'en': 'Internet of Things<br/>Operating System'
		},
		m2object: {
			'zh': 'nStack互联互通中间件',
			'en': 'nStack Interconnection Middleware'
		},
		m2head: {
			'zh': '精彩内容',
			'en': 'Contents'
		},
		m2topic1: {
			'zh': '嵌入式设备需要强健的OS',
			'en': 'Requiring robust OS for embedded devices'
		},
		m2topic2: {
			'zh': '支持多芯片，多行业诉求',
			'en': 'Supporting multiple chips and multiple-industry demands'
		},
		m2topic3: {
			'zh': '支持多种协议混合接入',
			'en': 'Supporting multi-protocol access'
		},
		m2topic4: {
			'zh': '华为nStack IoT组件架构详解',
			'en': 'Huawei nStack IoT component architecture details'
		},
		m2topic5: {
			'zh': 'IoT智能硬件7大方面问题',
			'en': '7 problems with the IoT intelligent hardware'
		},
		m3a: {
			'zh': '编程挑战-星际迷航',
			'en': 'Programming Challenge<br/>Lost in Space'
		},
		m3object: {
			'zh': '面向嵌入式开发者',
			'en': 'For Embedded Application Developers'
		},
		m3head: {
			'zh': '嵌入式应用开发',
			'en': 'Embedded Application Development'
		},
		m3topic1: {
			'zh': '要求具备嵌入式C语言技术背景',
			'en': 'Technical background required for the embedded C programming language'
		},
		m3topic2: {
			'zh': '要求熟练掌握IAR嵌入式开发工具',
			'en': 'Proficiency in IAR embedded development tools required'
		},
		m3topic3: {
			'zh': '可快速掌握LiteOS网络组件开发方式',
			'en': 'Capable of quickly mastering the development mode of the LiteOS network component'
		},
		m3topic4: {
			'zh': '可体验固件开发与烧录流程',
			'en': 'Capable of experiencing firmware development and burning process'
		},
		m3topic5: {
			'zh': '实现物联网终端快速入网',
			'en': 'Achieving fast network entry of IoT terminal'
		},
		m4a: {
			'zh': '编程挑战-星际管家',
			'en': 'Programming Challenge<br/>Space Administrator'
		},
		m4object: {
			'zh': '面向应用开发者',
			'en': 'For Web Application Developers'
		},
		m4head: {
			'zh': 'Web应用开发',
			'en': 'Web Application Development'
		},
		m4topic1: {
			'zh': '要求具备HTML/JS语言技术背景',
			'en': 'Technical background required for the HTML/JS programming language'
		},
		m4topic2: {
			'zh': '要求熟悉Restful API和JSON数据模型',
			'en': 'Familiar with the Restful API and JSON data models'
		},
		m4topic3: {
			'zh': '可基于AC-IoT开发极具个性的Web应用',
			'en': 'Developing unique Web application based on AC-IoT'
		},
		m4topic4: {
			'zh': '可体验Web Ajax异步通信开发方式',
			'en': 'Capable of experiencing the development mode Web Ajax asynchronous communication'
		},
		m4topic5: {
			'zh': '实现物联网终端远程管理',
			'en': 'Achieving remote management of IoT terminals'
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
				'zh': '短距无线物联网',
				'en': 'Short-distance Wireless Embedded Internets'
			};
			sliderJSON = '[{' +
				'"imagePath": "/img/6lowpan/幻灯片1.PNG", ' +
				'"order": "1", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/6lowpan/幻灯片2.PNG", ' +
				'"order": "2", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/6lowpan/幻灯片3.PNG", ' +
				'"order": "3", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/6lowpan/幻灯片4.PNG", ' +
				'"order": "4", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/6lowpan/幻灯片5.PNG", ' +
				'"order": "5", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/6lowpan/幻灯片6.PNG", ' +
				'"order": "6", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/6lowpan/幻灯片7.PNG", ' +
				'"order": "7", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/6lowpan/幻灯片8.PNG", ' +
				'"order": "8", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/6lowpan/幻灯片9.PNG", ' +
				'"order": "9", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/6lowpan/幻灯片10.PNG", ' +
				'"order": "10", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/6lowpan/幻灯片11.PNG", ' +
				'"order": "11", ' +
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
				'"imagePath": "/img/liteos/幻灯片1.PNG", ' +
				'"order": "1", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/liteos/幻灯片2.PNG", ' +
				'"order": "2", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/liteos/幻灯片3.PNG", ' +
				'"order": "3", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/liteos/幻灯片4.PNG", ' +
				'"order": "4", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/liteos/幻灯片5.PNG", ' +
				'"order": "5", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/liteos/幻灯片6.PNG", ' +
				'"order": "6", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/liteos/幻灯片7.PNG", ' +
				'"order": "7", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/liteos/幻灯片8.PNG", ' +
				'"order": "8", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'},{' +
				'"imagePath": "/img/liteos/幻灯片9.PNG", ' +
				'"order": "9", ' +
				'"url": "#", ' +
				'"slideText": ""' +
				'}]';
			console.log(JSON.parse(sliderJSON));
			break;
		default:
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
				'en': 'Programming Challenge - Lost in Space'
			};
			courseJSON = '[{' +
				'"title": {"zh":"故事背景", "en":"Background"}, ' +
				'"description": {"zh":"在无垠的银河系中，有5艘宇宙飞船因通信故障与地球失去了联系，由于相距遥远，无法直接联系到地球，只能通过行星多跳（Mesh）方式才能与地球取的联系，做为其中一架飞船指挥官的您，请尽快尝试恢复通信，离开这一危险区域。<hr><p>任务一：快速掌握华为nStack协议栈（socket网络编程）使用方法。</p><p>任务二：根据操作指导，使用IAR编译工程，填入关键api，调用socket接口恢复网络通信。</p><p>任务三：将工程编译成二进制固件包，烧录到飞船通信模块中，当观察到设备接入到Mesh网络，即完成最终任务。</p><img src=/img/space_plane.jpg width=450 height=300>", "en":"In the vast Milky Way galaxy, 5 spacecrafts lose contact with the earth as a result of communication failures. Long distances prevent direct contact, and a multi-hop mesh network provides the only potential solution. As a commander, you must restore communications, and escape from the danger zone.<hr><p>Task 1: Master the usage of Huawei nStack interconnection middleware as quickly as possible.</p><p>Task 2: Following the instruction and using an IAR compiling project, fill in key APIs, and call the socket interface to restore network communications.</p><p>Task 3: Compile the project into a binary firmware package, and burn it into the communication module of the spacecraft. Once the device is connected to the Mesh network, the final task is complete.</p>"}, ' +
				'"content": {"zh":"nStack IoT组件介绍","en":"Introduction to nStack IoT Component"}, ' +
				'"detail": {"zh":"nStack IoT组件是Huawei LiteOS在短距无线嵌入式物联网领域的通信协议栈，其中集成了IEEE 802.15.4，6LoWPAN和RPL等多个协议栈。在深入了解nStack IoT组件之前，我们先来看看基于6LoWPAN的IP协议栈与传统IP协议栈的差别。<br/><img src=/img/ip_vs_6lowpan.png width=600 heigth=250><br>可以看到，6LoWPAN与传统TCP/IP分层非常类似，由于nStack IoT组件具有良好的c接口，只要有过使用BSD socket套接字网络编程经验，便可在非常短的时间迅速掌握nStack IoT组件的使用。<p><strong>IEEE 802.15.4</strong><br/>IEEE802.15.4定义了低速率无线个域网的物理层和媒体访问控制协议，属于IEEE 802.15工作组。运行在2.4GHz或Sub-GHz的ISM频段上，IEEE 802.15.4标准的低功耗、低成本和低速率的特点使其在嵌入式设备通信领域得到广泛的应用。与WIFI不同的是，IEEE 802.15.4能够支持设备间多跳通信模式，通过形成一个Mesh网络极大地扩展通信的覆盖范围。</p><p><strong>基于IPv6的低速无线个域网</strong><br/>由于IEEE 802.15.4的MTU（最大报文段长度）非常小，未经处理的IPv6协议直接运行在这种协议上非常的不切实际，因为无法携带更多有用的数据信息。6LoWPAN使用无状态IPv6/UDP头部字段压缩，显著减小了IPv6的头部大小（从40bytes到2/3字节），使得IPv6能完美得运行在低速率无线个域网。此外，6LoWPAN还定义了邻居发现机制的优化和分片重组的方法。</p><p><strong>低功耗有损网络路由协议</strong><br/>读作“Ripple”，IETF为低功耗有损网络定义的距离向量路由协议，RPL可以基于不同的路由度量和限制条件创建不同的网络路由拓扑，华为nStack通过RPL路由算法优化，能够使大规模节点组成的网络在短时间内快速收敛，当节点发生故障后，整个网络快速自愈和修复。</p>","en":"The nStack IoT component is the interconnection middleware of Huawei LiteOS in the wireless embedded IoT LR-WPAN domain. It integrates protocol stacks such as IEEE 802.15.4, 6LoWPAN, and RPL. "}, ' +
				'"file": ""' +
				'},{' +
				'"title": {"zh":"6LoWPAN协议栈网络编程","en":"xxxxxxxxxxx"}, ' +
				'"description": {"zh":"采用类似BSD Socket编程，只要您具备Linux网络编程经验，可以在非常短的时间内玩转nStack协议栈。", "en":"xxxxxxxxxxx"}, ' +
				'"content": {"zh":"关键Socket API介绍","en":"xxxxxxxxxxx"}, ' +
				'"detail": {"zh":"<p><strong>uint32_t vpp_udp_socket_register(udp_socket *udpSock, void *ptr, const vpp_udp_socket_input_callback_t recv_callback);</strong><br/>创建一个UDP Socket，并注册一个接收数据的回调函数，任何UDP消息都会在该回调函数中处理。</p><p><strong>uint32_t vpp_udp_socket_bind(udp_socket *udpSock, const uint16_t local_port);</strong><br/>绑定Socket到本地的端口。</p><p><strong>uint32_t vpp_udp_socket_connect(udp_socket *udpSock, const uip_ipaddr_t *remote_addr, const uint16_t remote_port);</strong><br/>连接UDP的Socket到指定的远端服务器IP地址和端口。注意，连接成功之后，才能接收到指定服务器发往该Socket的UDP报文，并且只能接收到该接口指定远端服务器的UDP报文。</p><p><strong>int vpp_udp_socket_sendto (udp_socket *udpSock, const void *data, uint16_t datalen, const uip_ipaddr_t *remotrAddr, uint16_t remotePort);</strong><br/>在该UDP Socket上发送数据到指定的远端IP地址和端口。发送数据之前，不需要显示调用vpp_udp_socket_connect()来建立连接。注意，send()和sendto()可以在同一个UDP Socket上使用。</p><p>typedef void (* vpp_udp_socket_input_callback_t)<br/>(<br/>&nbsp;&nbsp;struct _udp_socket *c,<br/>&nbsp;&nbsp;void *ptr,<br/>&nbsp;&nbsp;const uip_ipaddr_t *source_addr,<br/>&nbsp;&nbsp;uint16_t source_port,const uip_ipaddr_t *dest_addr,<br/>&nbsp;&nbsp;uint16_t dest_port,<br/>&nbsp;&nbsp;uint16_t datalen<br/>);<br/>用来接收数据的回调，回调函数在创建Socket时使用。</p><p>uint32_t vpp_udp_socket_close(udp_socket *udpSock);</strong><br/>关闭UDP Socket</p>","en":"xxxxxxxxxxx"}, ' +
				'"file": "" ' +
				'},{' +
				'"title": {"zh":"实战指导","en":"xxxxxxxxxxx"}, ' +
				'"description": {"zh":"uStack IoT组件提供了大量的socket接口函数，我们这里只使用以下3个Socket API，用来实现设备入网：<p>&nbsp;</p><p>1.vpp_udp_socket_register（获取Socket）</p><p>2.vpp_udp_socket_bind（绑定端口）</p><p>3.vpp_udp_socket_send（发送UDP消息）","en":"xxxxxxxxxxx"}, ' +
				'"content": {"zh":"编程手册","en":"xxxxxxxxxxx"}, ' +
				'"detail": {"zh":"UDP消息由于其简单易用，对硬件资源要求少，非常适合在物联网上使用。我们这里只需要弯沉","en":"xxxxxxxxxxx"}, ' +
				'"file": "udpDemo.txt"' +
				'},{' +
				'"title": {"zh":"大功告成","en":"Complete"}, ' +
				'"description": {"zh":"<img src=/img/success.jpg width=100% heigth=100%></img>","en":"<img src=/img/success.jpg width=100% heigth=100%></img>"}, ' +
				'"content": {"zh":"验证结果","en":"Verification Result"}, ' +
				'"detail": {"zh":"编码完成后，先执行Compile，将代码编译打包。确认无误后再执行Download and Run，您的固件包则会立即加载到桌面的小蓝头中。等待数分钟，您可以看到：<br/>1、飞船上线，并发光显示；<br/>2、飞船与地球之间的连线逐渐显示出来。<p><img src=/img/plane_ok.png width=400 height=300","en":"xxxxxxxxxxx"}, ' +
				'"file": "2.txt"' +
				'}]';
			console.log(JSON.parse(courseJSON));
			break;
		case '/manual/webapp':
			titleJSON = {
				'zh': '编程挑战-星际管家',
				'en': 'Programming Challenge<br/>Space Administrator'
			};
			courseJSON = '[{' +
				'"title": {"zh":"故事背景", "en":"Background"}, ' +
				'"description": {"zh":"公元3389年，人类早已经走出太阳系，分散定居在无数小行星上。您做为一名优秀的星际管理员希望实时监控小行星上的情况。请您使用Web技术实现对小行星（灯）远程能量采集功能，目标是从小行星（灯）上获取当前的能量数据。<hr><p>任务一：快速掌握华为物联网能效管理平台（EEM）JSON北向接口。</p><p>任务二：理解并选择一种数据采集方式（批量数据采集和逐条数据采集二选一）。</p><p>任务三：在app.js文件中填入关键JSON api，最终实现Ajax异步数据采集。</p><img src=/img/look_star.jpg width=60% height=40%>","en":"In AD 3389, human beings have reached beyond the Milky Way galaxy, inhabiting numerous minor planets. As a leading space administrator, you wish to monitor these planets in real time. Use the Web technology to remotely collect energy from these minor planets (lamps). Your objective is to obtain the current energy data from these minor planets (lamps).<p>Task 1: Master the JSON northbound interface on Huawei&acute;s IoT energy efficiency management (EEM) software as quickly as possible.</p><p>Task 2: Understand and select a data collection method (choose from bulk data collection and data collection piece by piece).</p><p>Task 3: Key in the JSON API into the app.js file to achieve Ajax asynchronous data collection.</p>"}, ' +
				'"content": {"zh":"华为照明物联网方案","en":"Huawei Connected City Lighting Solution"}, ' +
				'"detail": {"zh":"整个解决方案包括四个部分构成，主要是路灯控制器、华为物联网网关、EEM、APP（业务系统），各部分功能描述如下：<p><strong>路灯控制器</strong>：控制路灯调光、开光，支持计量功能，可采集电压、电流、功率、电量、频率数据。<br/><strong>物联网网关</strong>：连接路灯控制器，获取通过3G/LTE方式进行上行与EEM进行通信。<br/><strong>EEM</strong>：连接物联网网关，提供上行RESTCONF、WebSocket接口给第三方应用进行二次开发，可实现对路灯进行远程开关、调光等功能，也支持编制计划和策略控制。<br/><strong>APP</strong>：客户基于EEM平台开发的业务应用系统。</p><p><img src=/img/huawei_eem.png width=60% hegith=60%></p>","en":"The solution consists of the street lamp controller, Huawei IoT gateway, EEM software, and SMS (Street lamp management system). Their respective functions are as follows:<p>Street lamp controller: adjusts lamp brightness, controls lamp on/off, supports metering, and collects voltage, current, power, electric energy, and frequency.</p><br/>IoT gateway: connects with the street lamp controller in the downstream direction, and communicates with the EEM software in the upstream direction through 3G or LTE.<br/>EEM software: connects with the IoT gateway in the downstream direction, and provides the RESTCONF and WebSocket APIs for third-party applications to perform secondary development, including remote on/off, light adjustment, plan development, and policy control.<br/>The SMS is the service application system developed by customers based on the EEM software."}, ' +
				'"file": ""' +
				'},{' +
				'"title": {"zh":"方案详解","en":"Solution Details"}, ' +
				'"description": {"zh":"HTML/JS Web技术由于其跨平台能力，早已被人们所接受，它可以很容易地部署在任意尺寸设备上。做为一名Web应用开发者的您，一定尽快想大显身手，把<strong>小行星能量管理</strong>应用部署在Web服务器上。为了能让您快速掌握开发方法，我们先快速了解一下这一系统架构。<p><img src=/img/ar502.png width=500 heigth=75></p><p>为了快速体验开发过程，我们选取能量采集JSON接口来进行实战。</p>","en":"As a result of its cross-platform capabilities, the HTML/JS Web technology has already been accepted. It can easily be deployed for use with equipment of any dimension. As a Web application developer, you certainly want to give a good account of yourself as soon as possible, deploying the energy management application of minor planets on the Web server. To master the development approach as soon as possible, you must quickly obtain an understanding of the system architecture."}, ' +
				'"content": {"zh":"答题准备","en":"Answer Preparation"}, ' +
				'"detail": {"zh":"我们已经为您准备好基于HTML5/JS的工程文件（<a href=/exam/web/web-demo.zip>这里下载</a>）。您只需要将其解压到任意目录，然后按照开发提示，便可在数分钟内完成Web应用开发。<p>我们华为工程师GG们为了满足客户多样需求，专门设计了多种JSON接口给我们使用，这里我们选取其中2种数据采集接口进行体验，您可以根据需要选择任意一种来完成Demo。只要您能够<strong>读取3种以上能量数据</strong>，就能获得我们提供的精美小礼品。<p>小伙伴们，赶紧来体验吧！</p>","en":"We have prepared the HTML5/JS-based project files for you. As long as you have an understanding of the data model in JSON format as prompted, you will be able to complete the application development within minutes.<p>Since the Huawei engineer GG has provided several JSON interfaces, we hereby recommend 2 for data collection. You can answer with either one as required. Once you can read 3 or more kinds of energy data, you will receive a prize.</p>"}, ' +
				'"file": ""' +
				'},{' +
				'"title": {"zh":"批量数据采集方式","en":"xxxxxxxxxxx"}, ' +
				'"description": {"zh":"顾名思义，由于设备能量数据种类繁多，我们可以一次性将数据采集回来并进行解析。您可以使用/iotdm/nb/v1/system/action/urn:huawei:iotdm:task/bulk-get接口获取所有数据项。<p>获取JSON格式数据如下所示：</p><img src=/img/getBluk.png width=100% height=100%>","en":"xxxxxxxxxxx"}, ' +
				'"content": {"zh":"开发指导","en":"Development Guides"}, ' +
				'"detail": {"zh":"使用批量数据采集方式获取数据方法非常简单，您只需要用编辑器打开js目录下的app.js文件，找到bultGet函数，将其中???替换为所需要采集的电参数英文标识，完成能量数据获取后，返回json对象，获取相应的参数。<p>请参考如下样例代码完成Demo应用：</p>","en":"The sample code is as follows:"}, ' +
				'"file": "bultGet.txt"' +
				'},{' +
				'"title": {"zh":"逐条数据采集方式","en":"xxxxxxxxxxx"}, ' +
				'"description": {"zh":"该方法是所有数据采集接口中最容易使用的，适合有针对性，对网络要求敏感的场景。您可以使用诸如huawei-iotdm-device-energy:frequency接口查询设备电流频率。</p><p>Demo使用URL列表如下：</p><p>&nbsp;</p><p>/iotdm/nb/v1/device/get/设备ID/urn:huawei:iotdm:device/data/huawei-iotdm-device-energy:frequency</p><p>/iotdm/nb/v1/device/get/设备ID/urn:huawei:iotdm:device/data/huawei-iotdm-device-energy:a-voltage</p><p>/iotdm/nb/v1/device/get/设备ID/urn:huawei:iotdm:device/data/huawei-iotdm-device-energy:a-current</p><p>/iotdm/nb/v1/device/get/设备ID/urn:huawei:iotdm:device/data/huawei-iotdm-device-energy:total-active-power</p><p>/iotdm/nb/v1/device/get/设备ID/urn:huawei:iotdm:device/data/huawei-iotdm-device-energy:total-active-energy</p><p>&nbsp;</p><p>获取JSON格式数据如下所示：</p><p>&nbsp;</p><p>{结果}，如{220}</p>","en":"xxxxxxxxxxx"}, ' +
				'"content": {"zh":"开发指导","en":"Development Guides"}, ' +
				'"detail": {"zh":"使用逐条数据采集方式获取数据方法非常简单，您只需要用编辑器打开js目录下的app.js文件，找到singleGet函数，将其中???替换为所需要采集的电参数英文标识，完成能量数据获取后，返回json对象，获取相应的参数。<p>请参考如下样例代码完成Demo应用：</p>","en":"The sample code is as follows:"}, ' +
				'"file": "singleGet.txt"' +
				'},{' +
				'"title": {"zh":"大功告成","en":"Complete"}, ' +
				'"description": {"zh":"<img src=/img/success.jpg width=100% heigth=100%></img>","en":"<img src=/img/success.jpg width=100% heigth=100%></img>"}, ' +
				'"content": {"zh":"验证结果","en":"Verification Result"}, ' +
				'"detail": {"zh":"编码完成后，运行工作目录下的start.bat，会自动打开Chrome浏览器，访问EEM。如果编码无误，您可以看到：<p><img src=/img/lighting.jpg width=300 heigth=400></p>","en":"After coding, please move the project directory to XXX directory. Then open Chrome and enter http://localhost/ in the address bar. If the coding is correct, you can find:"}, ' +
				'"file": ""' +
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