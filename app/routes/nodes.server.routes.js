var users = require('../../app/controllers/users.server.controller');
var nodes = require('../../app/controllers/nodes.server.controller');

module.exports = function(app) {

	app.get('/api/init', nodes.init);
	app.get('/api/sync/:nodeId', nodes.sync);
	app.get('/api/gtest', nodes.gtest);
	app.get('/api/dtest', nodes.dtest);

	app.route('/api/nodes')
		.get(nodes.list)
		.post(users.requiresLogin, nodes.create);

	app.route('/api/nodes/:nodeId')
		.get(nodes.read)
		.put(users.requiresLogin, nodes.hasAuthorization, nodes.update)
		.delete(users.requiresLogin, nodes.hasAuthorization, nodes.delete);

	app.param('nodeId', nodes.nodeByID);
};
