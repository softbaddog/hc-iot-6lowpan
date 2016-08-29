//var host="http://192.168.1.9:8181";
//var esn = "2E0000000000002E";
var host="";//same origin
var esn = "2E0000000000002E";/*设备编号，设备在网络中的唯一标识*/
var dataTemplate = {
	"name":esn,
	"params":{
		"location":"上海世博展览馆",
		"energy":"N/A",
		"voltage":"N/A",
		"current":"N/A",
		"power":"N/A",
		"frequency":"N/A"
	},
	"status":1
};

//  "huawei-iotdm-device-energy:frequency":"frequency"
//  "huawei-iotdm-device-energy:a-voltage":"voltage",
//  "huawei-iotdm-device-energy:a-current":"current",
//  "huawei-iotdm-device-energy:total-active-power":"power",
//  "huawei-iotdm-device-energy:total-active-energy":"energy",
function singleGet(){
	var devData = $.extend({},dataTemplate);

	//$.ajaxSettings.async = false;
	//SAMPLE VOLTAGE
	$.getJSON(host+"/iotdm/nb/v1/device/get/"+esn+"/urn:huawei:iotdm:device/data/huawei-iotdm-device-energy:frequency",function(data){
		devData.params.frequency=data;
		showData(devData);
	});
	//请采集其他数据项（电压）
	$.getJSON(host+"/iotdm/nb/v1/device/get/"+esn+"/urn:huawei:iotdm:device/data/huawei-iotdm-device-energy:a-voltage",function(data){
		devData.params.voltage=data;
		showData(devData);
	});
	//请采集其他数据项（电流）
	$.getJSON(host+"/iotdm/nb/v1/device/get/"+esn+"/urn:huawei:iotdm:device/data/huawei-iotdm-device-energy:a-current",function(data){
		devData.params.current=data;
		showData(devData);
	});
	//请采集其他数据项（功率）
	$.getJSON(host+"/iotdm/nb/v1/device/get/"+esn+"/urn:huawei:iotdm:device/data/huawei-iotdm-device-energy:total-active-power",function(data){
		devData.params.power=data;
		showData(devData);
	});
	//请采集其他数据项（能量）
	$.getJSON(host+"/iotdm/nb/v1/device/get/"+esn+"/urn:huawei:iotdm:device/data/huawei-iotdm-device-energy:total-active-energy",function(data){
		devData.params.energy=data;
		showData(devData);
	});
	//$.ajaxSettings.async = true;
}
function showData(msg){
	$('#deviceId').html(msg.name);
	$('#location').html(msg.params.location);
	//六个值
	$('#voltage').html(msg.params.voltage);
	$('#current').html(msg.params.current);
	$('#power').html(msg.params.power);
	$('#frequency').html(msg.params.frequency);
	$('#energy').html(msg.params.energy);
	if(msg.status == 1){
		$("#status").html("Online");
	}else{
		$("#status").html("Offline");
	}
	//进度条
	//$('#lifetime').html(msg.params.lifttime);
	//$('.Jprogess').css({width:msg.params.lifttime+'%'});
}
singleGet();