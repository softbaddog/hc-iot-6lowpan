var startrek = require("../controllers/startrek.server.controller");

module.exports = function(app) {
	app.get("/startrek", startrek.render);

	// 获取音乐列表，用于星空播放音乐
	app.get("/api/audiofiles", startrek.audiofiles);

	// 获取元数据，用于布局星空模型位置
	app.get('/api/metadata', startrek.metadata);

	// 星空2种灯控方式：1、按节点控；2、按组控
	app.post('/api/bulbctrl', startrek.bulbctrl);
	app.post('/api/groupctrl', startrek.groupctrl);
};