var admin = require("../controllers/admin.server.controller");
var nodes = require('../../app/controllers/nodes.server.controller');

module.exports = function(app) {
	app.get("/admin", admin.render);

	app.get('/api/online', admin.online);

	app.get('/api/mesh', admin.mesh);

	app.route('/api/name/:nodeName')
		.get(admin.read)
		.post(admin.ctrl);

	app.get('/api/init', admin.init);
	app.get('/api/gtest', admin.gtest);
	app.get('/api/dtest', admin.dtest);

	app.param('nodeId', nodes.nodeByID);
	app.param('nodeName', admin.nodeByName);
};