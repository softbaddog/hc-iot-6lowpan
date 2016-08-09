/**
 * Created by Administrator on 2016/7/26.
 */
$(function(){
    $('.circle').on('click',function(){
        $('.circle').removeClass('on');
        $(this).addClass('on');

        $('.text-box').hide();
        $('.light-controller').show();
    });


    //首页跳转进入不同页面
    $('#left_box').on('click',function(){
        window.location.href='lampController.html';
    });
    $('#right_box').on('click',function(){
        window.location.href='starTrek.html';
    });

    //中英文切换
    $('.Jtoggle-text').on('click',function(){
        $(this).addClass('on');
        $(this).siblings().removeClass('on');
    });

});