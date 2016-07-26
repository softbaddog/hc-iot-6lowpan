module.exports = function(app) {
	var nodes = require("../controllers/nodes.server.controller");

	app.route('/nodes')
		.post(users.create)
		.get(users.list);
};