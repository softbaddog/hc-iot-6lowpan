var shows = require("../controllers/shows.server.controller");

module.exports = function(app) {
	app.get("shows", shows.render);
};