var manual = require("../controllers/manual.server.controller");

module.exports = function(app) {
	app.get("manual", manual.render);
};