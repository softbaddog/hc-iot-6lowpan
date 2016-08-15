var bulbctrl = require("../controllers/bulbctrl.server.controller");
var nodes = require('../../app/controllers/nodes.server.controller');

module.exports = function(app) {
	app.get("/bulbctrl", bulbctrl.render);

	app.get('/api/online', bulbctrl.online);

	app.get('/api/mesh', bulbctrl.mesh);

	app.route('/api/name/:nodeName')
		.get(bulbctrl.read)
		.post(bulbctrl.ctrl);

	app.param('nodeName', bulbctrl.nodeByName);
};