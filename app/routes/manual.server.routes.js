var manual = require("../controllers/manual.server.controller");

module.exports = function(app) {
	app.get("/zh/manual", manual.renderZh);
	app.get("/en/manual", manual.renderEn);

	app.get("/zh/manual/6lowpan", function(req, res)  {
		res.redirect('/manual/6lowpan/index-zh.html');
	});
	app.get("/en/manual/6lowpan", function(req, res)  {
		res.redirect('/manual/6lowpan/index-en.html');
	});
};