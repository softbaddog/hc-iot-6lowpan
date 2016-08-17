var User = require('mongoose').model('User');
var Passport = require('passport');

var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = '该账号已经存在，请重新输入';
				break;
			default:
				message = '未知错误';
				break;
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message)
				message = err.errors[errName].message;
		}
	}
	return message;
};

exports.renderSignin = function(req, res, next) {
	if (!req.user) {
		res.render('signin', {
			lang: 'zh',
			title: '用户登录',
			home: '首页',
			signin: '登录',
			signup: '注册',
			userlogin: '用户登入',
			email: '邮箱',
			password: '口令',
			login: '登录',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/zh');
	}
};


exports.renderSigninEn = function(req, res, next) {
	if (!req.user) {
		res.render('signin', {
			lang: 'en',
			title: 'Sign-in Form',
			home: 'Home',
			signin: 'Longin',
			signup: 'Register',
			userlogin: 'User Login',
			email: 'eMail',
			password: 'Password',
			login: 'Login',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/en');
	}
};

exports.renderSignup = function(req, res, next) {
	if (!req.user) {
		res.render('signup', {
			lang: 'zh',
			title: '用户注册',
			home: '首页',
			signin: '登录',
			signup: '注册',
			usersingup: '用户注册',
			email: '邮箱',
			help: '使用一个合法的邮箱账户，用于登录。',
			password: '口令',
			repeat: '重复输入口令',
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/zh');
	}
};

exports.renderSignupEn = function(req, res, next) {
	if (!req.user) {
		res.render('signup', {
			lang: 'en',
			title: 'Sign-up Form',
			home: 'Home',
			signin: 'Login',
			signup: 'Register',
			usersingup: 'User Register',
			email: 'eMail',
			help: 'Please use a valid email for login.',
			password: 'Password',
			repeat: 'Password Repeat',
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/en');
	}
};


exports.signup = function(req, res, next) {
	if (!req.user) {
		if (req.body['password-repeat'] != req.body['password']) {
			req.flash('error', '两次输入的口令不一致');
			return res.redirect('/zh/signup');
		}

		User.count({}, function(err, count) {

			var user = new User(req.body);
			var message = null;

			// 如果是首个注册用户，默认将其角色刷成admin
			if (count === 0) user.role = 'admin';
			user.provider = 'local';

			user.save(function(err) {
				if (err) {
					var message = getErrorMessage(err);

					req.flash('error', message);
					return res.redirect('/signup');
				}

				req.login(user, function(err) {
					if (err) return next(err);
					return res.redirect('/zh');
				});
			});
		});
	} else {
		return res.redirect('/zh');
	}
};

exports.signupEn = function(req, res, next) {
	if (!req.user) {
		if (req.body['password-repeat'] != req.body['password']) {
			req.flash('error', '两次输入的口令不一致');
			return res.redirect('/en/signup');
		}

		User.count({}, function(err, count) {

			var user = new User(req.body);
			var message = null;

			// 如果是首个注册用户，默认将其角色刷成admin
			if (count === 0) user.role = 'admin';
			user.provider = 'local';

			user.save(function(err) {
				if (err) {
					var message = getErrorMessage(err);

					req.flash('error', message);
					return res.redirect('/en/signup');
				}

				req.login(user, function(err) {
					if (err) return next(err);
					return res.redirect('/en');
				});
			});
		});
	} else {
		return res.redirect('/en');
	}
};

exports.signout = function(req, res) {
	req.logout();
	res.redirect('/zh');
};

exports.signoutEn = function(req, res) {
	req.logout();
	res.redirect('/en');
};

exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: '用户未登录'
		});
	}
	next();
};