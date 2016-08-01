var app = require('../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Node = mongoose.model('Node');

var user, node;

describe('Node Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			email: 'test@test.com',
			password: 'password'
		});

		user.save(function() {
			node = new Node({
				name: 'A1',
				status: 0,
				group: 0,
				parent: 'roots',
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

		it('Should not be able to save an node without a name', function() {
			node.name = '';

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