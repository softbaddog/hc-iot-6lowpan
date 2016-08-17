/**
 * Created by Administrator on 2016/7/26.
 */
$(function(){
    //首页跳转进入不同页面
    $('#left_box').on('click',function(){
        window.location.href='bulbctrl';
    });
    $('#right_box').on('click',function(){
        window.location.href='startrek';
    });

    //中英文切换
    $('.Jtoggle-text').on('click',function(){
        $(this).addClass('on');
        $(this).siblings().removeClass('on');
    });

});