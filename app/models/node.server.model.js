var Mogoose = require("mongoose"),
	Schema = Mogoose.Schema;

var NodeSchema = new Schema({
	name: {
		type: String,
		trim: true
	},
	online: Boolean,
	group: Number,
	parent: String,
	role: {
		type: String,
		enum: ['StarTrek', 'BulbCtrl']
	},
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
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

Mogoose.model('Node', NodeSchema);