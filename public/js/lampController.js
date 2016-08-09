/**
 * Created by Administrator on 2016/8/1.
 */
//全局变量
var _commonId='';

//点击获取Id 调用函数
$('.circle').on('click',function(){
    var _id=$(this).attr('id');
    _commonId=_id;
    getEnergyInfo(_id);
    getOnlineStatus();
});

function getEnergyInfo(id){
    $.ajax({
        type: "GET",
        //url: "data/lampController.json",
        url: "/api/"+id,
        //data: "name=John&location=Boston",
        success: function(msg){
                $('#deviceId').html(msg.name);
                $('#location').html(msg.params.location);

                //六个值
                $('#voltage').html(msg.params.voltage);
                $('#current').html(msg.params.current);
                $('#power').html(msg.params.power);
                $('#frequency').html(msg.params.frequency);
                $('#energy').html(msg.params.energy);
                if(msg.switch == true){
                    $("#switch").attr('checked','checked');
                    $("#switch").addClass('on');
                }else{
                    $("#switch").removeAttr('checked','checked');
                    $("#switch").removeClass('on');
                }
                $("#light_count").val(msg.level);

                //进度条
                $('#lifetime').html(msg.params.lifttime);
                $('.Jprogess').css({width:msg.params.lifttime+'%'});
        }
    });
}
//开关状态 start
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
        url : "/api/"+id,
        //url: "data/lampControllerjson",
        data: _dataCtrl,
        success: function(msg){

        }
    })
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
        url : "/api/"+id,
        //url : "/dev-bulk-ctrl",
        //url: "data/lampController.json",
        data: _dataCtrl,
        success: function(msg){

        }
    })
}
//灯控级别 end

//重启 start
$('#button_close').on('click',function(){
    reset(_commonId);
});
function reset(id){
    var _dataCtrl={
        "devices": id,
        "reboot": "true" // 注意重启后，需要获取一次online状态
    };

    $.ajax({
        type: "POST",
        url : "/api/"+id,
        //url : "/dev-bulk-ctrl",
        //url: "data/lampController.json",
        data: _dataCtrl,
        success: function(msg){

        }
    })
}
//重启 end

function getOnlineStatus(){
    if(_commonId != null && _commonId != "") {
        $.ajax({
            type: 'GET',
            url:'/api/online',
            //url:'data/onlineData.json',
            success: function (msg) {
                var isOnline = false;
                var onlincDeviceId = msg;
                if(onlincDeviceId != null && onlincDeviceId.length > 0){
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

function timerForOnlineStatus(){
    var _timer= setInterval(getOnlineStatus,5000);
    $('.Jbutton-close').on('click',function(){
        clearInterval(_timer);
    });
}
timerForOnlineStatus();

$('.Jbutton-close').on('click',function(){
    _commonId = '';
    $('.circle').removeClass('on');
    $('.text-box').show();
    $('.light-controller').hide();
});

var socket = io('/');
socket.on('connect', function () {
    socket.on('nodeChanged', function (msg) {
        console.log('nodeChanged-------------------------------------------------');
        console.log(msg);
    });
});
