var index = require("../controllers/index.server.controller");

module.exports = function(app) {
	app.get("/", index.render);
	app.get('/zh', index.switchLanguage);
	app.get('/en', index.switchLanguage);
};