var manual = require("../controllers/manual.server.controller");

module.exports = function(app) {
	app.get("/manual", manual.render);
	app.get("/zh/manual", manual.renderZh);
	app.get("/en/manual", manual.renderEn);
};