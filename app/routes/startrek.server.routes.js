module.exports = function(app) {
	var startrek = require("../controllers/startrek.server.controller");
	app.get("/startrek", startrek.render);
};