var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var nodeSchema = new Schema({
	name: {
		type: String,
		trim: true,
		unqiue: true,
		required: '请填写节点名称'
	},
	deviceId: {
		type: String,
		trim: true,
		unqiue: true,
		required: '请填写设备标识'
	},
	groupId: {
		type: Number,
		default: 0
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