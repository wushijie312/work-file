/**
 * Created by shijie on 2017/6/24.
 */
$(function(){
    $(".head_a_thr_img").click(function(){
        $(".head_a_thr").toggle();
    });

    $(".page_a_an").click(function () {
        var windowHeight=$(window).height();
        windowHeight=windowHeight+"px";
        $("html,body").animate({scrollTop:windowHeight});
    });
    // $(".head_a_two li a").each(function(index,row){
    //     $(this).click(function(){
    //         var offsetTop=$(".adkj_an").eq(index).offset().top;
    //         var headHeight=$(".head_a").height();
    //         $(".adkj_an").eq(index).offset(offsetTop+headHeight);
    //     });
    // });
    window.addEventListener("resize", function () {
        if($(window).width()>716){
            $(".head_a_thr").hide();
        }
    }, !1);
});