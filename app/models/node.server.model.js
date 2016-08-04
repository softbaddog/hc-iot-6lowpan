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
	voltage: {
		type: Number,
		default: 140		
	},
	current: {
		type: Number,
		default: 10		
	},
	power: {
		type: Number,
		default: 15.3		
	},
	frequency: {
		type: Number,
		default: 200		
	},
	energy: {
		type: Number,
		default: 15.3		
	},	
	lifttime: {
		type: Number,
		default: 80		
	},
	location: {
		type: String,
		default: '上海奔驰文化中心'
	},
	updated: {
		type: Date,
		default: Date.now
	},
	hidden: Boolean,
	meta: {
		texture: String,
		lightColor: String,
		x: Number,
		y: Number,
		z: Number
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Node', nodeSchema);