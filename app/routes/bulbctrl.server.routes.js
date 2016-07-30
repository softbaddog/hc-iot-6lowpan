module.exports = function(app) {
	var bulbctrl = require("../controllers/bulbctrl.server.controller");

	app.get("/bulbctrl", bulbctrl.render);

	// app.route('/dev-bulk-ctrl/:name')
	// 	.post(users.create)
	// 	.get(users.list);
};