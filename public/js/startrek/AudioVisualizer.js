/**
 * Created by Administrator on 2016/7/6.
 */
var HCC_IOT=HCC_IOT||{};
HCC_IOT.AudioVisualizer=function(callBack_,endCallBack){
    var scope;
    this.relayCallBack=callBack_;
    this.endCallBack=endCallBack;
    this._audioContext;
    this._audioSource;
    this._request;
    this._audioArrayBuffer;
    this._audioBufferSouceNode;
    this.analyser;
    this.gainNode;

    this.playStatus=false;
    this.startTime=0;
    this.currentTime=0;
    this.playTime=0;
    this.endTime=0;
    this.runing=false;
    this.skipTime=0;

    //暂停时间
    this.stopTime=0;
    this.stopStuts=false;
    this.stopDelayTime=0;

        //= audioContext.createBufferSource();
    //audioBufferSouceNode.buffer = buffer;

};
HCC_IOT.AudioVisualizer.prototype={
    init: function() {
        scope=this;
        //fix the browser vendor
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame;
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
        try {
            scope._audioContext = new window.AudioContext();
        } catch (e) {
            console.log('audio context is not supported :(');
        }
        this._request=new XMLHttpRequest();


        scope.analyser= scope._audioContext.createAnalyser();
        this.gainNode=this._audioContext.createGain();
        this.gainNode.connect(scope._audioContext.destination);

    },
    loadAudio:function(url_){
        scope._request.open('GET', '/audio/' + url_, true);
        scope._request.responseType = 'arraybuffer';
        // 对音频进行进一步操作
        scope._request.onload = function() {
            scope._audioSource = scope._request.response;
            try {
                scope._audioContext.decodeAudioData(scope._audioSource, function (buffer) {
                    scope._audioArrayBuffer = buffer;
                    scope.relayCallBack();//回调是否进行下一步处理
                });
            }catch(e){
                scope.endCallBack();
            }


        };
        scope._request.send();
    },
    replay:function(){
        scope.empty();
        scope.createBufferSource();
        scope.startTime=scope.getTime();//起始时间
        scope.endTime=scope._audioArrayBuffer.duration;//音乐时长
        scope.play("1");//播放不重新创建
    },
    getTime:function(){
        return (new Date().getTime()/1000);//获取当前时间
    }
    ,
    update:function(){//更新已播放时长
        if(!scope.runing)return;
        scope.currentTime=(scope.getTime()-scope.startTime)+scope.skipTime;
        scope.currentTime-=scope.stopDelayTime;//暂停的时间
        scope.playTime=(scope.getTime()-scope.startTime);
        if(scope.currentTime>scope.endTime){
            scope.empty();
            scope.endCallBack();
        }
    },
    stopFun:function(){
        scope.stopStuts=true;
        scope.stopTime=scope.getTime();
    },
    stopEnd:function(){
        if(scope.stopStuts==true){
            scope.stopDelayTime+=scope.getTime()-scope.stopTime;
            scope.stopStuts=false;
        }
    },
    stopReset:function(){

        scope.stopStuts=false;
        scope.stopTime=0;
        scope.stopUnTime=0;
        scope.stopDelayTime=0;
    }
    ,
    stop:function(){
        this.stopFun();
        scope.runing=false;
        try {
            scope._audioBufferSouceNode.stop();
        }catch(e){}
        scope._audioBufferSouceNode=null;
    },
    empty:function(){//清空
        this.stopReset();
        scope.playStatus=false;
        scope.currentTime=0;
        scope.playTime=0;
        scope.skipTime=0;
        scope.runing=false;
        try {
            scope._audioBufferSouceNode.stop();
        }catch(e){}
        scope._audioBufferSouceNode=null;
    },
    volume:function(value){
        scope.gainNode.gain.value=value;
        try {
            scope._audioBufferSouceNode.stop();
        }catch(e){}
        scope._audioBufferSouceNode=null;
        scope.play();
    },
    play:function(value_){
        this.stopEnd();
        scope.playStatus=true;
        scope.runing=true;
        if(value_==undefined)scope.createBufferSource();
        scope._audioBufferSouceNode.start(0,scope.currentTime);
    },
    createBufferSource:function(){
        try {
            scope._audioBufferSouceNode.stop();
        }catch(e){}
        scope._audioBufferSouceNode=scope._audioContext.createBufferSource();
        scope._audioBufferSouceNode.connect(scope.analyser);
        scope._audioBufferSouceNode.connect(scope._audioContext.destination);
        scope._audioBufferSouceNode.connect(this.gainNode);
        scope._audioBufferSouceNode.buffer=scope._audioArrayBuffer;
    },
    seekTo:function(time){
        this.stopReset();
        //scope.empty();
        try {
            scope._audioBufferSouceNode.stop();
        }catch(e){}
        scope._audioBufferSouceNode=null;
        scope.skipTime=(time-scope.playTime);
        scope.currentTime=time;
        scope.play();
    }
};
