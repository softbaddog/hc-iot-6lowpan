var app = require('../../server'),
	request = require('supertest'),
	should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Node = mongoose.model('Node');

var user, node;

describe('Nodes Controller Uint Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			dispalyName: 'Full Name',
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

			node.save(function(err) {
				done();
			});
		});
	});

	describe('Testing the GET methods', function() {
		it('Should be able to get the list of nodes', function(done) {
			request(app).get('/api/nodes/')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					res.body.should.be.an.Array.and.have.lengthOf(1);
					res.body[0].should.have.property('title', node.title);
					res.body[0].should.have.property('content', node.content);

					done();
				});
		});

		it('Should be able to get the specific node', function(done) {
			request(app).get('/api/nodes/' + node.id)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					res.body.should.be.an.Object.and.have.property('title', node.title);
					res.body.should.have.property('content', node.content);

					done();
				});
		});
	});

	afterEach(function(done) {
		Node.remove().exec();
		User.remove().exec();
		done();
	});
});