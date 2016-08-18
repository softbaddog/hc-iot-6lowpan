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
			lang: req.session.lang || 'zh',
			title: {
				'zh':'用户登录',
				'en':'User Login'
			},
			home: {
				'zh':'首页',
				'en':'Home'
			},
			signin: {
				'zh':'登录',
				'en':'Login'
			},
			signup: {
				'zh':'注册',
				'en':'Register'
			},
			userlogin: {
				'zh':'用户登入',
				'en':'User Login'
			},
			email: {
				'zh':'邮箱',
				'en':'eMail'
			},
			password: {
				'zh':'口令',
				'en':'Password'
			},
			login: {
				'zh':'登录',
				'en':'Login'
			},
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/zh');
	}
};

exports.renderSignup = function(req, res, next) {
	if (!req.user) {
		res.render('signup', {
			lang: req.session.lang || 'zh',
			title: {
				'zh':'用户注册',
				'en':'User Register'
			},
			home: {
				'zh':'首页',
				'en':'Home'
			},
			signin: {
				'zh':'登录',
				'en':'Login'
			},
			signup: {
				'zh':'注册',
				'en':'Register'
			},
			usersingup: {
				'zh':'用户注册',
				'en':'User Register'
			},
			email: {
				'zh':'邮箱',
				'en':'eMail'
			},
			help: {
				'zh':'使用一个合法的邮箱账户，用于登录。',
				'en':'Please Use a Valid eMail for Login'
			},
			password: {
				 'zh':'口令',
				 'en':'Password'
			},
			repeat: {
				'zh':'重复输入口令',
				'en':'Password Repeat'
			},
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
};

exports.signup = function(req, res, next) {
	if (!req.user) {
		if (req.body['password-repeat'] != req.body['password']) {
			req.flash('error', '两次输入的口令不一致');
			return res.redirect('/signup');
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
					return res.redirect('/');
				});
			});
		});
	} else {
		return res.redirect('/');
	}
};

exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: '用户未登录'
		});
	}
	next();
};