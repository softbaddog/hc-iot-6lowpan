var bulbctrl = require("../controllers/bulbctrl.server.controller");

module.exports = function(app) {
	app.get("/bulbctrl", bulbctrl.render);
};