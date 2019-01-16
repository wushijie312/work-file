
$(function (){
    //解决click 300
    FastClick.attach(document.body);
    // home 方法调用
    var utils = {
        moduleChange: function (self,type1,type3,type4) {
            var index=$(self).index();
            $(self).addClass(type1).siblings().removeClass(type1);
            var mall_box=$(self).parent(type3).siblings(type4);
            mall_box.children().eq(index).addClass("allShow").siblings().removeClass("allShow");
        },
        heightauto:function (){
            //jQuery实现textarea高度根据内容自适应
            $.fn.extend({
                txtaAutoHeight: function () {
                    return this.each(function () {
                        var $this = $(this);
                        if (!$this.attr('initAttrH')) {
                            console.log($this.height());
                            $this.attr('initAttrH', $this.height());
                        }
                        setAutoHeight(this).on('input', function () {
                            setAutoHeight(this);
                        });
                    });
                    function setAutoHeight(elem) {
                        var $obj = $(elem);
                        return $obj.css({ height: $obj.attr('initAttrH') }).height(elem.scrollHeight);
                    }
                }
            });
        },
        detailCarousel: function () {
            var i=0;
            var timer=null;
            var str='';
            console.log($(".detail_two_aBox").width());
            $('.detail_two_a').append(str);
            var firstimg=$('.detail_two_a li').first().clone(); //复制第一张图片
            $('.detail_two_a').append(firstimg).width($('.detail_two_a li').length*($(".detail_two_aBox").width())); //将第一张图片放到最后一张图片后，设置ul的宽度为图片张数*图片宽度
            //判断左右滑动切换
            $('.detail_two_a').on("touchstart", function(e) {
                clearInterval(timer);
                startX = e.originalEvent.changedTouches[0].pageX;
                return false;
            });
            $('.detail_two_a').on("touchend", function(e) {
                moveEndX = e.originalEvent.changedTouches[0].pageX,
                    X = moveEndX - startX;
                if ( X > 0 ) {
                    clearInterval(timer);
                    i--;
                    if (i==-1) {
                        i=$('.detail_two_a li').length-2;
                        $(this).css({left:-($('.detail_two_a li').length-1)*$(".detail_two_aBox").width()});
                    }
                    $(this).stop().animate({left:-i*$(".detail_two_aBox").width()},300);
                    $('.detail_two_b span').text(1+i);
                }else if ( X < 0 ) {
                    clearInterval(timer);
                    i++;
                    if (i==$('.detail_two_a li').length) {
                        i=1; //这里不是i=0
                        $(this).css({left:0}); //保证无缝轮播，设置left值
                    };

                    $(this).stop().animate({left:-i*$(".detail_two_aBox").width()},300);
                    if (i==$('.detail_two_a li').length-1) {
                        $('.detail_two_b span').text(1);
                    }else{
                        $('.detail_two_b span').text(1+i);
                    }
                }
                timer=setTimeout(function (){
                    autoMove(i);
                },2000);
                return false;
            });
            function autoMove(n){
                timer= setInterval(function(){
                    n++;
                    i++;
                    if (n==$('.detail_two_a li').length) {
                        n=1;
                        i=1;
                        $('.detail_two_a').css({left:0});
                    };

                    $('.detail_two_a').stop().animate({left:-n*$(".detail_two_aBox").width()},300);
                    if (n==$('.detail_two_a li').length-1) {
                        $('.detail_two_b span').text(1);
                    }else{
                        $('.detail_two_b span').text(1+n);
                    }
                },4000);
            }
            autoMove(i);
        }
    };

//    var searchRender = {
//        submit: function () {
//            util.sum();
//        },
//        init: function () {
//
//        }
//    };
//	  //index 模块之间tab切换
//     $(".home_foot li").click(function(){
//         utils.moduleChange(this,"home_footHighlight",".home_foot",".mall_box");
//     });
    //index 商品列表tab切换
    $(".goods_listBox_a li").click(function(){
        utils.moduleChange(this,"goods_footHighlight",".goods_listBox_a",".goods_listBox_b");
    });
    //index search 搜索
    $(".home_one_bSearch").on('focus',function () {
        $(".home_b").addClass("allShow").siblings(".home_a").removeClass("allShow");
    });
    //index 商品列表滚动
    var goodsHeight=$(window).height()-$(".goods_boxLook").height()-$(".home_foot").height()-10;
    $(".goods_listBox_a").height(goodsHeight);
    $(".goods_listBox_b").height(goodsHeight);
    //goods 商品列表多余不显示
    $(".goods_information_a li a").each(function(index,ele){
        $(this).text($(this).text().length>10?$(this).text().slice(0, 10):$(this).text());
    });
    //detail 商品详情tab切换
    $(".detail_nine_aBox li").click(function(){
        utils.moduleChange(this,"detail_Highlight",".detail_nine_aBox",".detail_nine_bBox");
    });
    //detail 文本超出隐藏
    var detail_dislogFour=$(".detail_dialog_four");
    $(".detail_dialog_four").each(function(){

        });
    var detail_textCont=detail_dislogFour.text();
    var detail_textContSimple=detail_dislogFour.text().length>150?detail_dislogFour.text().slice(0, 150):detail_dislogFour.text();
    if(detail_textCont.length>150){
        detail_dislogFour.text(detail_textContSimple);
        console.log(detail_dislogFour);
        $(".detail_dialog_fiveBox").show();
        $(".detail_dialog_five").click(function (){
            if(detail_dislogFour.text().length<='150'){
                $(this).css({background: "url(./img/goodsDetail/detail_7b.png) 1.9rem 0.35rem no-repeat",backgroundSize: "0.5rem"});
                detail_dislogFour.text(detail_textCont);
            }else{
                $(this).css({background: "url(./img/goodsDetail/detail_7a.png) 1.9rem 0.35rem no-repeat",backgroundSize: "0.5rem"});
                detail_dislogFour.text(detail_textContSimple);
            }
        });
    }

    // detail 商品ban轮播
    (function () {
        function o() {
            fontSize(414);
            utils.detailCarousel();
        }
        var e = null;
        window.addEventListener("resize", function () {
            clearTimeout(e), e = setTimeout(o, 300)
        }, !1), o()
    })(window);

    // detail 显示弹框
    $(".detail_six_boxDialog").click(function (e){
        $(".detail_dialog_TC").addClass("detail_dialog_TCHighlight");
        $(".detail_dialog_box4").addClass("allShow");
        // e.preventDefault();
    });
    $(".detail_ten1_cDialog").click(function (){
        $(".detail_dialog_TC").addClass("detail_dialog_TCHighlight");
        $(".detail_dialog_box4").addClass("allShow");
    });
    // detail 关闭弹框
    $(".detail_dialog_box5").click(function () {
        $(".detail_dialog_TC").removeClass("detail_dialog_TCHighlight");
        $(".detail_dialog_box4").removeClass("allShow");
    });
    //detail 立即购买
    $(".detail_ten1_buyNowDialog").click(function (e){
        $(".detail_dialog_BUYNOW").addClass("detail_dialog_TCHighlight");
        $(".detail_dialog_boxBUYNOW").addClass("allShow");
        // e.preventDefault();
    });
    // detail 关闭弹框
    $(".detail_dialog_box5").click(function () {
        $(".detail_dialog_BUYNOW").removeClass("detail_dialog_TCHighlight");
        $(".detail_dialog_boxBUYNOW").removeClass("allShow");
    });
    // detail 选择套餐
    $(".detail_dialog_six li").click(function (){
        $(this).addClass("detail_dialog_sixHighLiang").siblings().removeClass("detail_dialog_sixHighLiang");
        $(".detail_six_selected").text($(this).text());
    });
    // detail 滚动到指定高度显示
    $(document).scroll(function() {
        if($(document.body).scrollTop()>500){
            $(".detail_ten_box").show();
        }else{
            $(".detail_ten_box").hide();
        }
        $(".detail_ten_box").click(function (){
            $(document.body).scrollTop(0);
        });
    });
    // shopCart 显示弹框隐藏弹框
    $(".shopCart_one_e").click(function (){
        $(".shopCart_dialog_box_bg").show();
    });
    $('.touch_stopMove').on('touchmove',function(e) {
        var _touch = e.originalEvent.targetTouches[0];
        var _x= _touch.pageX;
        e.preventDefault();
    });
    //shopCart 留言
    var textareaTag,entry_content,textarea_top;
    $(".shopCart_leaveWord_one").on("focus",function(e){
        textareaTag=e.target;
        textarea_top=$(document.body).scrollTop();
        $(".shop_b").addClass("allShow").siblings(".shop_a").removeClass("allShow");
        $(document.body).scrollTop(0);
        $(".remarks_leaveWord_one").val(textareaTag.value);
    });
    $(".remarks_two_box a").on("click",function () {
        entry_content=$(".remarks_leaveWord_one").val();
        $(".shop_a").addClass("allShow").siblings(".shop_b").removeClass("allShow");
        $(document.body).scrollTop(textarea_top);
        textareaTag.value=entry_content;
        $(".shopCart_textarea_heightAuto").txtaAutoHeight();
        $(".remarks_leaveWord_one").val('');
    });
    //shopcart 高度自适应
     utils.heightauto();
     $(".shopCart_textarea_heightAuto").txtaAutoHeight();
    //waitPayment 弹框
    $(".waitPayment_two_aQX").click(function () {
        $(".shopCart_dialog_box_bg").show();
    });
    //隐藏弹出框
    $(".shopCart_dialog_b li").click(function () {
        $(".shopCart_dialog_box_bg").hide(10);
    });

});

