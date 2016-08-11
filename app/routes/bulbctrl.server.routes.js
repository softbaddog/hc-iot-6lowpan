var bulbctrl = require("../controllers/bulbctrl.server.controller");
var nodes = require('../../app/controllers/nodes.server.controller');

module.exports = function(app) {
	app.get("/bulbctrl", bulbctrl.render);

	app.route('/api/online')
		.get(bulbctrl.online);

	app.route('/api/mesh')
		.get(bulbctrl.mesh);

	app.route('/api/:nodeName')
		.get(nodes.read)
		.post(bulbctrl.ctrl);


	app.param('nodeName', nodes.nodeByName);
};