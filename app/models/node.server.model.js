var mongoose = require("mongoose");
var	Schema = mongoose.Schema;

var nodeSchema = new Schema({
	name: {
		type: String,
		trim: true,
		unqiue: true,
		required: 'Node Name is required.'
	},
	status: {
		type: Number,
		default: 0
	},
	group: {
		type: Number,
		validate: [
			function(num) {
				return num >= 0 && num < 5;
			},
			'Group Number should be 0 - 4.'
		]
	},
	parent: {
		type: String,
		default: 'roots'
	},
	priority: {
		type: Number,
		default: 0
	},
	deviceid: String,
	params: {
		voltage: Number,
		current: Number,
		power: Number,
		frequency: Number,
		lifttime: Number,
		location: String,		
		level: {
			type: Number,
			validate: [
				function(value) {
					return value > 100;
				},
				'Brightness level is less 100'
			]
		},
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