/**
 * Created by Administrator on 2016/8/1.
 */
//全局变量
var _commonId='';
var allOnlincDeviceIdArr;
/*
//点击获取Id 调用函数
$('.circle').on('click',function(){
    var _id=$(this).attr('id');
    _commonId=_id;
    getEnergyInfo(_id);
    getOnlineStatus();
});
*/
function getEnergyInfo(id){
    $.ajax({
        type: "GET",
        //url: "data/lampController.json",
        url: "/api/name/"+id,
        //data: "name=John&location=Boston",
        success: function(msg){
                $('#deviceId').html(msg.name);
                $('#location').html(msg.params.location);
                $("#button_close").attr("class","button-green");
                //六个值
                $('#voltage').html(msg.params.voltage);
                $('#current').html(msg.params.current);
                $('#power').html(msg.params.power);
                $('#frequency').html(msg.params.frequency);
                $('#energy').html(msg.params.energy);
                var div2 = document.getElementById("div2");
                var div1 = document.getElementById("div1");
                if(msg.switch === 1){
                    div1.className = "open1";
                    div2.className = "open2";
                }else{
                    div1.className = "close1";
                    div2.className = "close2";
                }
                $("#light_count").val(msg.level);

                //进度条
                $('#lifetime').html(msg.params.lifttime);
                $('.Jprogess').css({width:msg.params.lifttime+'%'});
        }
    });
}
//开关状态 start
/*
$('#switch').on('click',function(){
    var switchStatus;
    if(!$(this).hasClass('on')){
        $(this).attr('checked','checked');
        $(this).addClass('on');
        //$(this).attr('data-type','on');
        switchStatus = "on";
    }else{
        $(this).removeAttr('checked','checked');
        $(this).removeClass('on');
        //$(this).attr('data-type','0ff');
        switchStatus = "off";
    }
    switchInfo(_commonId,switchStatus);
});
*/
$('#div2').on('click',function(){
    var div2 = document.getElementById("div2");
    var div1 = document.getElementById("div1");
    var switchStatus = "";

    div1.className = (div1.className=="close1")?"open1" : "close1";
    div2.className = (div2.className=="close2")?"open2" : "close2";
    if(div2.className == "open2"){
        switchStatus = "on";
    }else{
        switchStatus = "off";
    }
    switchInfo(_commonId,switchStatus);
});
function switchInfo(id,switchStatus){
    var _dataCtrl={
        "devices": id,
        //"brightness":'', // 1-5级
        "switch": switchStatus
        //"reboot": "true" // 注意重启后，需要获取一次online状态
    };
    //console.log(id,_switch);
    $.ajax({
        type: "POST",
        url : "/api/name/"+id,
        //url: "data/lampControllerjson",
        data: _dataCtrl,
        success: function(msg){

        }
    });
}
//开关状态 end


//灯控级别 start
$('#light_count').change(function(id){
    var _brightvalue=$('#light_count').val();// 1-5级
    //console.log(_brightness);
    lightLevel(_commonId,_brightvalue);
});
function lightLevel(id,brightvalue){

    var _dataCtrl={
        "devices": id,
        "brightness":brightvalue // 1-5级
        //"reboot": "true" // 注意重启后，需要获取一次online状态
    };

    $.ajax({
        type: "POST",
        url : "/api/name/"+id,
        //url : "/dev-bulk-ctrl",
        //url: "data/lampController.json",
        data: _dataCtrl,
        success: function(msg){

        }
    });
}
//灯控级别 end

//重启 start
$('#button_close').on('click',function(){
    if($("#button_close").attr("class") != "button-gray") {
        $("#button_close").attr("class","button-gray");
        reset(_commonId);
    }
});
function reset(id){
    var _dataCtrl={
        "devices": id,
        "reboot": "true" // 注意重启后，需要获取一次online状态
    };

    $.ajax({
        type: "POST",
        url : "/api/name/"+id,
        //url : "/dev-bulk-ctrl",
        //url: "data/lampController.json",
        data: _dataCtrl,
        success: function(msg){

        }
    });
}
//重启 end

function getOnlineStatus(){
    if(_commonId !== null && _commonId !== "") {
        $.ajax({
            type: 'GET',
            url:'/api/online',
            //url:'data/onlineData.json',
            success: function (msg) {
                var isOnline = false;
                var onlincDeviceId = msg;
                if(onlincDeviceId !== null && onlincDeviceId.length > 0){
                    for(var i = 0;i < onlincDeviceId.length;i++){
                        if(onlincDeviceId[i] == _commonId){
                            isOnline = true;
                            break;
                        }
                    }
                }
                if(isOnline){
                    $("#status").html("Online");
                }else{
                    $("#status").html("Offline");
                }
            }
        });
    }
}
/*
function timerForOnlineStatus(){
    var _timer= setInterval(getOnlineStatus,5000);
    $('.Jbutton-close').on('click',function(){
        clearInterval(_timer);
    });
}
timerForOnlineStatus();
*/
$('.Jbutton-close').on('click',function(){
    _commonId = '';
    $('.circle').removeClass('on');
    $('.text-box').show();
    $('.light-controller').hide();
});

dynamicLoadLamp();

function lampClick(obj){
    $('.circle').removeClass('on');
    $(obj).addClass('on');

    $('.text-box').hide();
    $('.light-controller').show();

    var _id = $(obj).attr('id');
    _commonId = _id;
    getEnergyInfo(_id);
    getOnlineStatus();
}
function getAllOnlineDevices(){
    $.ajax({
        type: 'GET',
        url:'/api/online',
        //url:'data/onlineData.json',
        async: false,
        success: function (msg) {
            allOnlincDeviceIdArr = msg;
        }
    });
}
function sortNumber(a,b)
{
    return a - b;
}
function dynamicLoadLamp(){
    getAllOnlineDevices();
    $.ajax({
        type: 'GET',
        url:'/api/metadata',
        //url:'data/PlanePosition2.json',
        async: false,
        success: function (msg) {
            // var allRowName = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            var allRowName = ['A','B','C','D','E','F','G','H','I','J'];
            //var allLampArr = msg.item;
            var allLampArr = msg;
            var allLampIdArr = [];
            var rowNameArry = [];
            var columnNameArry = [];
            var columnNum;
            if(allLampArr != null && allLampArr.length > 0){
                for(var i = 0;i < allLampArr.length;i++){
                    if(allLampArr[i].name != null && allLampArr[i].name.substr(0,7) != "devices" && allLampArr[i].name != "roots"){
                        rowNameArry.push(allLampArr[i].name.substr(0,1));
                        columnNum = allLampArr[i].name.substr(1,allLampArr[i].name.length - 1);
                        if(columnNum != null && columnNum != ""){
                            columnNameArry.push(parseInt(columnNum));
                        }
                        allLampIdArr.push(allLampArr[i].name);
                    }
                }
            }
            rowNameArry.sort();
            columnNameArry.sort(sortNumber);

            var tableHtml = '';
            if(allLampIdArr != null && allLampIdArr.length > 0){
                //table head s
                tableHtml += '<tr class="head">';
                tableHtml += '<td style="border-bottom: none;"></td>';
                for(var k = 1;k <= columnNameArry[columnNameArry.length - 1];k++){
                    tableHtml += '<td class="bottom-line">'+k+'</td>';
                }
                tableHtml += '</tr>';
                //table head e

                for(var j = 0;j < allRowName.length;j++){
                    tableHtml += '<tr>';
                    tableHtml += '<td class="left-head right-line">'+allRowName[j]+'</td>';
                    for(var k = 1;k <= columnNameArry[columnNameArry.length - 1];k++){
                        if(isExistInArray(allLampIdArr,allRowName[j]+k)){
                            if(isExistInArray(allOnlincDeviceIdArr,allRowName[j]+k)) {
                                if(allRowName[j]+k == _commonId){
                                    tableHtml += '<td class="grid"><span class="circle on" id="' + allRowName[j] + k + '" onclick="lampClick(this)"></span></td>';
                                }else {
                                    tableHtml += '<td class="grid"><span class="circle" id="' + allRowName[j] + k + '" onclick="lampClick(this)"></span></td>';
                                }
                            }else{
                                tableHtml += '<td class="grid"><span class="greyCircle" id="' + allRowName[j] + k + '"></span></td>';
                            }
                        }else{
                            tableHtml += '<td class="grid"><span></span></td>';
                        }
                    }
                    tableHtml += '</tr>';
                    if(allRowName[j] == rowNameArry[rowNameArry.length - 1]){
                        break;
                    }
                }
            }
            $("#lampTableId").html(tableHtml);
        }
    });
}

//判断数组中是否有重复
function isExistInArray(array,value) {
    var isExist = false;
    for(var i in array){
        if(array[i] === value){
            isExist = true;
            break;
        }
    }
    return isExist;
}

var socket = io('/');
socket.on('connect', function () {
    socket.on('nodeChanged', function (msg) {
        dynamicLoadLamp();
        if(_commonId !== null && _commonId !== ""){
            console.log("_commonId-->"+_commonId);
            getEnergyInfo(_commonId);
            getOnlineStatus();
        }
    });
});
