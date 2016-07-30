var Mogoose = require("mongoose"),
	Schema = Mogoose.Schema;

var NodeSchema = new Schema({
	name: {
		type: String,
		trim: true,
		unqiue: true,
		required: 'Node Name is required.'
	},
	online: {
		type: Boolean,
		default: false
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
	parent: String,
	role: {
		type: String,
		enum: ['StarTrek', 'BulbCtrl']
	},
	devid: String,
	params: {
		voltage: Number,
		current: Number,
		power: Number,
		frequency: Number,
		lifttime: Number,
		location: String,		
		brightness: {
			type: Number,
			validate: [
				function(value) {
					return value > 5;
				},
				'Brightness is less 5'
			]
		},
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

Mogoose.model('Node', NodeSchema);