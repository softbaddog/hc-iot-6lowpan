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
	groupId: { // 分组
		type: Number,
		default: 0
	},
	status: { // 是否在线
		type: Number,
		default: 1
	},
	parent: { // 父节点，空节点为null
		type: String,
		default: 'null'
	},
	priority: { // 控制优先级
		type: Number,
		default: 0
	},
	level: { // 调光级别
		type: Number,
		default: 100
	},
	switch: { // 开关
		type: Number,
		default: 1
	},
	params: { // 电参数
		voltage: { // 电压
			type: Number,
			default: 0
		},
		current: { // 电流
			type: Number,
			default: 0
		},
		power: { // 电量
			type: Number,
			default: 0
		},
		frequency: { // 频率
			type: Number,
			default: 0
		},
		energy: { // 功率
			type: Number,
			default: 0
		},
		lifttime: { // 剩余寿命
			type: Number,
			default: 100
		},
		location: { // 位置信息
			type: String,
			default: '上海'
		},
	},
	updated: {
		type: Date,
		default: Date.now
	},
	hidden: Boolean,
	metadata: { // 与产品无关源数据
		x: {
			type:Number,
			default: 0
		},
		y: {
			type:Number,
			default: 0
		},
		z: {
			type:Number,
			default: 0
		}
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Node', nodeSchema);