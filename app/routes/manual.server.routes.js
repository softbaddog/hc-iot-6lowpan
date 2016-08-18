var manual = require('../controllers/manual.server.controller');

module.exports = function(app) {
	app.get('/manual', manual.render);

	app.get('/manual/6lowpan', manual.slider);
	app.get('/manual/liteos', manual.slider);

	app.get('/manual/embedapp', manual.code);
	app.get('/manual/webapp', manual.code);	
};