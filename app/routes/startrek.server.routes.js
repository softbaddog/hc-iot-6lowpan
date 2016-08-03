var startrek = require("../controllers/startrek.server.controller");

module.exports = function(app) {
	app.get("/startrek", startrek.render);
};