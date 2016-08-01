var app = require('../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Node = mongoose.model('Node');

var user, node;

describe('Node Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			node = new Node({
				title: 'Node Title',
				content: 'Node Content',
				user: user
			});

			done();
		});
	});

	describe('Testing the save method', function() {
		it('Should be able to save without problems', function() {
			node.save(function(err) {
				should.not.exist(err);
			});
		});

		it('Should not be able to save an node without a title', function() {
			node.title = '';

			node.save(function(err) {
				should.exist(err);
			});
		});
	});

	afterEach(function(done) {
		Node.remove(function() {
			User.remove(function() {
				done();
			});
		});
	});
});