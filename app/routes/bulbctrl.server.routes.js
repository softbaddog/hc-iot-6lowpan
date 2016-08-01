module.exports = function(app) {
	var bulbctrl = require("../controllers/bulbctrl.server.controller");
	app.get("/bulbctrl", bulbctrl.render);
};