var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var nodeSchema = new Schema({
	name: {
		type: String,
		trim: true,
		unqiue: true,
		required: 'Node Name is required.'
	},
	deviceId: {
		type: String,
		required: true
	},
	groupId: {
		type: Number,
		validate: [
			function(num) {
				return num >= 0 && num < 5;
			},
			'Group Number should be 0 - 4.'
		]
	},
	status: {
		type: Number,
		default: 0
	},
	parent: {
		type: String,
		default: 'roots'
	},
	priority: {
		type: Number,
		default: 0
	},
	level: {
		type: Number,
		default: 100
	},
	params: {
		voltage: Number,
		current: Number,
		power: Number,
		frequency: Number,
		lifttime: Number,
		location: String
	},
	updated: {
		type: Date,
		default: Date.now
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Node', nodeSchema);