function getEnergyInfo(id){
    $.ajax({
        type: "GET",
        url: "data/demo.json",
        // url: "/api/name/"+id,
        success: function(msg){
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
                $('#lifetime').html(msg.params.lifttime);
                $('.Jprogess').css({width:msg.params.lifttime+'%'});
        }
    });
}

getEnergyInfo();