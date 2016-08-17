var shows = require("../controllers/shows.server.controller");

module.exports = function(app) {
	app.get("/zh/shows", shows.renderZh);
	app.get("/en/shows", shows.renderEn);
};