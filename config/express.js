var config = require('./config');
var http = require('http');
var socketio = require('socket.io');
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var passport = require('passport');
var partials = require('express-partials');

module.exports = function(db) {
	var app = express();
	var server = http.createServer(app);
	// var io = socketio.listen(server);
	io = socketio(server);  // 引入到全局变量中

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());

	var mongoStore = new MongoStore({
		mongooseConnection: db.connection
	});

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: mongoStore
	}));

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(partials());

	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.static('./public'));

	app.use(function(req, res, next) {
		res.locals.user = req.session.user;

		var err = req.flash('error');
		var success = req.flash('success');

		res.locals.error = err.length ? err : null;
		res.locals.success = success.length ? success : null;

		next();
	});

	require('../app/routes/nodes.server.routes.js')(app);
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);

	require('../app/routes/shows.server.routes.js')(app);
	require('../app/routes/manual.server.routes.js')(app);

	require('../app/routes/admin.server.routes.js')(app);
	require('../app/routes/bulbctrl.server.routes.js')(app);
	require('../app/routes/startrek.server.routes.js')(app);

	require('./socketio')(server, io, mongoStore);

	return server;
};