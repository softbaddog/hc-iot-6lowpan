var users = require('../controllers/users.server.controller');
var passport = require('passport');

module.exports = function(app) {
	app.route('/zh/signup')
		.get(users.renderSignup)
		.post(users.signup);

	app.route('/zh/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local', {
			successRedirect: '/zh',
			failureRedirect: '/zh/signin',
			failureFlash: true
		}));

	app.get('/zh/signout', users.signout);

	app.route('/en/signup')
		.get(users.renderSignupEn)
		.post(users.signupEn);

	app.route('/en/signin')
		.get(users.renderSigninEn)
		.post(passport.authenticate('local', {
			successRedirect: '/en',
			failureRedirect: '/en/signin',
			failureFlash: true
		}));

	app.get('/en/signout', users.signoutEn);
};