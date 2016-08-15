/**
 * Created by Administrator on 2016/7/7.
 */
var HCC_IOT=HCC_IOT||{};
HCC_IOT.AudioControls=function(visualizer){
    var scope=this;
    // Settings
    var repeat = localStorage.repeat || 0,
        shuffle = localStorage.shuffle || 'false',
        continous = true,
        autoplay = true,
        //playlist = HCC_LIGHTS.ViewIni.mp3list;
        playlist = [];
    scope.playlist_=playlist;
    var time = new Date(),
        currentTrack = shuffle === 'true' ? time.getTime() % playlist.length : 0,
        trigger = false,
        audio, timeout, isPlaying, playCounts;

    var play = function(){
        if(!visualizer.playStatus) {
            visualizer.replay();//播放
        }else{
            visualizer.play();
        }

        $('.playback').addClass('playing');
        timeout = setInterval(updateProgress, 500);
        isPlaying = true;
    };

    var pause = function(){
        visualizer.stop(); //停止

        $('.playback').removeClass('playing');
        clearInterval(timeout);
        isPlaying = false;
    };

    // Update progress
    var setProgress = function(value){
        var currentSec = parseInt(value%60) < 10 ? '0' + parseInt(value%60) : parseInt(value%60),
            ratio = value / visualizer.endTime * 100;

        $('.timer').html(parseInt(value/60)+':'+currentSec);
        $('.progress .pace').css('width', ratio + '%');
        $('.progress .slider a').css('left', ratio + '%');
    };
    var updateProgress = function(){
        setProgress(visualizer.currentTime);
    };

    // Progress slider
    $('.progress .slider').slider({step: 0.1, slide: function(event, ui){
        $(this).addClass('enable');
        setProgress(visualizer.endTime * ui.value / 100);
        clearInterval(timeout);
    }, stop: function(event, ui){
        var pos_= visualizer.endTime * ui.value / 100;
        visualizer.seekTo(pos_);
        timeout = setInterval(updateProgress, 500);
    }});

    // Volume slider
    var setVolume = function(value){
        localStorage.volume = value;
        visualizer.volume(value);
        $('.volume .pace').css('width', value * 100 + '%');
        $('.volume .slider a').css('left', value * 100 + '%');
    }

    var volume = localStorage.volume || 0.5;
    $('.volume .slider').slider({max: 10, min: 0, step: 0.1, value: volume, slide: function(event, ui){
        setVolume(ui.value);
        $(this).addClass('enable');
        $('.mute').removeClass('enable');
    }, stop: function(){
        $(this).removeClass('enable');
    }}).children('.pace').css('width', volume * 100 + '%');

    // Switch track
    var switchTrack = function(i){
        if (i < 0){
            track = currentTrack = playlist.length - 1;
        } else if (i >= playlist.length){
            track = currentTrack = 0;
        } else {
            track = i;
        }
        loadMusic(track);
    };

    // Shuffle
    var shufflePlay = function(){
        var time = new Date(),
            lastTrack = currentTrack;
        currentTrack = time.getTime() % playlist.length;
        if (lastTrack == currentTrack) ++currentTrack;
        switchTrack(currentTrack);
    };
    $('.playback').on('click', function(){
        if ($(this).hasClass('playing')){
            pause();
        } else {
            play();
        }
    });
    $('.rewind').on('click', function(){
        if (shuffle === 'true'){
            shufflePlay();
        } else {
            switchTrack(--currentTrack);
        }
    });
    $('.fastforward').on('click', function(){
        if (shuffle === 'true'){
            shufflePlay();
        } else {
            switchTrack(++currentTrack);
        }
    });

    this.nextSong=function(){
        if (shuffle === 'true'){
            shufflePlay();
        } else {
            switchTrack(++currentTrack);
        }
    }

    visualizer.endCallBack=this.nextSong;

    // Load track
    var loadMusic = function(i){
        var item = playlist[i];
        visualizer.empty();
        visualizer.relayCallBack=play;
        visualizer.loadAudio(item);

    };
    scope.parseMp3list=function(data_){
        playlist=data_;
        loadMusic(currentTrack);
    };
    $.ajax({//获取歌曲列表
        url: "/api/mp3list",
        // url: "/data/mp3List.json",
        dataType: "json",
        async: true,
        type: "GET",
        success:scope.parseMp3list
    });

}