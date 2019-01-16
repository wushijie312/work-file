
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
         moduleChange1: function (self,type1,type3,type4) {
            var index=$(self).index();
            $(self).addClass(type1).siblings().removeClass(type1);
            var mall_box=$(self).parent(type3).siblings(type4);

            mall_box.children().eq(index).addClass("allShow").siblings().removeClass("allShow");
            $(self).siblings().children("p").removeClass("goods_border");
            $(self).prev().children("p").addClass("goods_border");
        },
        moduleChange2: function (self,type1,type3,type4) {
            var index=$(self).index();
            $(self).addClass(type1).siblings().removeClass(type1);
            var mall_box=$(self).parent(type3).next(type4);
            mall_box.children().eq(index).addClass("allShow").siblings().removeClass("allShow");
        },
        heightauto:function (){
            //jQuery实现textarea高度根据内容自适应
            $.fn.extend({
                txtaAutoHeight: function () {
                    return this.each(function () {
                        var $this = $(this);
                        if (!$this.attr('initAttrH')) {
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
        tishi: function(content,url) {
            var html = '<div class="detail_msg_aBox" id="msg"><p class="detail_msg_a"></p></div>';
            $(document.body).append(html);
            $("#msg").show();
            $(".detail_msg_a").html(content);
            if(url){
                window.setTimeout("location.href='"+url+"'", 1500);
            }else{
                setTimeout('$("#msg").remove()', 1500);
            }
        },
        getSingle :function( fn ){
            var result;
            return function(){
                return result || ( result = fn .apply(this, arguments ) );
            }
        },
        createDiv :function(){
            var div = '<div class="paySuccess_box_bg" id="msg"><p class="paySuccess_box_main"></p></div>';
            $(document.body).append(div);
            $("#msg").show();
            $(".paySuccess_box_main").html(arguments[0]);
            var url=arguments[1];
            if(url){
                window.setTimeout("location.href='"+url+"'", 1500);
            }else{
                setTimeout('$("#msg").remove()', 1500);
            }
            return div;
        },
        twoWay_Kbit:function(s,seg){
            var seg = seg || "";
            if(typeof s === "number"){
                s += "";
                return s.replace(/(?=(?!\b)(\d{3})+$)/g,seg);
            }else{
                return s.replace(/,/g, "");
            }
        },
        inputChecked:function (a1,a2){
            //全选
            $(a2).click(function(){
                if($(this).prop("checked")){
                    $(a1).prop("checked",true);
                    $(a2).prop("checked",true);

                }else{
                    $(a1).prop("checked",false);
                    $(a2).prop("checked",false);
                }
            })
            //单选
            $(a1).click(function(){
                var flag = 1; //默认全选状态
                $(a1).each(function(){
                    if(!$(this).prop("checked")){
                        flag = 0;
                    }
                })
                if(flag){
                    $(a2).prop("checked",true);
                }else{
                    $(a2).prop("checked",false);
                }
            });
        },
        dialogBox: function(content,anniuOne,anniuTwo,label) {
               var html = '<div class="shopCart_dialog_box_bg touch_stopMove allHide" id="dialog_msg"><div class="shopCart_dialog_box"><div class="shopCart_dialog_a dialog_msg_a">确定要删除该地址吗?</div><ul class="shopCart_dialog_b clearfix"><li class="shopCart_dialog_bCloseQx dialog_msg_anniuOne">取消</li><li class="shopCart_dialog_bCloseSc dialog_msg_anniuTwo">确认</li></ul></div></div>';
            $(document.body).append(html);
            $("#dialog_msg").show();
            $(".dialog_msg_a").html(content);
            $(".dialog_msg_anniuOne").html(anniuOne);
            $(".dialog_msg_anniuTwo").html(anniuTwo);
            $(".dialog_msg_anniuOne").click(function(){
                $(".shopCart_dialog_box_bg").remove();
                $(label).css({overflow:'auto'});
            });
            $(".dialog_msg_anniuTwo").click(function(){
                $(".shopCart_dialog_box_bg").remove();
                $(label).css({overflow:'auto'});
            });
        },
        getWidth:function () {
            var banWidth=$(".detail_two_aBox").width(),len=$(".detail_two_a").attr("item");
            len=len?len:0;
            $(".detail_two_a").animate({left:-len*banWidth},0);
        },
        detailCarousel: function () {
            var i=0;
            //判断左右滑动切换
            $('.detail_two_a').on("touchstart", function(e) {
                startX = e.originalEvent.changedTouches[0].pageX;
            });
            $('.detail_two_a').on("touchend", function(e) {
                moveEndX = e.originalEvent.changedTouches[0].pageX,
                    X = moveEndX - startX;
                if ( X > 0 ) {
                    if (i>0) {
                        i--;
                        $(this).attr('item',i);
                        $(this).stop().animate({left:-i*$(".detail_two_aBox").width()},300);
                        $('.detail_two_b span').text(1+i);
                    }
                }else if ( X < 0 ) {
                    if(i<$('.detail_two_a li').length-1){
                        i++;
                        $(this).attr('item',i);
                        $(this).stop().animate({left:-i*$(".detail_two_aBox").width()},300);
                        $('.detail_two_b span').text(1+i);
                    }
                }
                return false;
            });
        },
        displaychange:function(self,url1,url2){
            var typepassword = $(self).prev("input").attr("type");
            if (typepassword == "password") {
                $(self).prev("input").attr("type", "text");
                $(self).attr('src', url1);
            } else {
                $(self).prev("input").attr("type", "password");
                $(self).attr('src', url2);
            }
        }
    };
    //index 商品列表tab切换
    $(".goods_listBox_a li").click(function(){
        utils.moduleChange1(this,"goods_footHighlight",".goods_listBox_a",".goods_listBox_b");
    });
    //shopCart 购物车选择
    function selectWork() {
        var total=0,len;
        len=$(".shopCart_one_c2").length;
        $(".shopCart_one_c2").each(function (index,row) {
            var num=$(this).val(),price=$(".shopCart_unitPrice").eq(index).text();
            num=parseInt(utils.twoWay_Kbit(num));
            total+=num*price;

        });
        shopCart_total=Math.round(total*100)/100;
        $(".shopCart_allTotal").text(total);
        $(".shopCart_allNum").text(len);
    }
    function inputChecked(a1,a2){
        //全选
        $(a2).click(function(){
            if($(this).prop("checked")){
                $(a1).prop("checked",true);
                $(a2).prop("checked",true);
                selectWork();
            }else{
                $(a1).prop("checked",false);
                $(a2).prop("checked",false);
                $(".shopCart_allTotal").text(0.00);
                $(".shopCart_allNum").text(0);
            }
        })
        //单选
        $(a1).click(function(){
            var flag = 1;shopCart_total=0,len=0; //默认全选状态
            $(a1).each(function(index,row){
                if(!$(this).prop("checked")){
                    flag = 0;
                }else{
                    len+=1;
                    var num=$(".shopCart_one_c2").eq(index).val(),price=$(".shopCart_unitPrice").eq(index).text();
                    num=parseInt(utils.twoWay_Kbit(num));
                    shopCart_total+=num*price;
                }
                $(".shopCart_allTotal").text(shopCart_total);
                $(".shopCart_allNum").text(len);
            });
            if(flag){
                $(a2).prop("checked",true);
            }else{
                $(a2).prop("checked",false);
            }
        });
    }
    inputChecked('.shopCart_checkOne','.shopCart_checkAll');
    //shopCart 基数的增减
    function selectWork1() {
        var shopCart_total=0,len=0; //默认全选状态
        $(".shopCart_checkOne").each(function(index,row){
            if($(this).prop("checked")){
                len+=1;
                var nums=$(".shopCart_one_c2").eq(index).val(),price=$(".shopCart_unitPrice").eq(index).text();
                nums=parseInt(utils.twoWay_Kbit(nums));
                shopCart_total+=nums*price;
            }
            shopCart_total=Math.round(shopCart_total*100)/100;
            $(".shopCart_allTotal").text(shopCart_total);
            $(".shopCart_allNum").text(len);
        });
    }
    $(".shopCart_one_c1").each(function (index,row) {
        $(this).click(function (e) {
            if(e.target.tagName=='SPAN'){
                var num=$(this).next().val();
                num=parseInt(utils.twoWay_Kbit(num));
                if(num<=100000){
                    num=100000;
                    num=utils.twoWay_Kbit(num,',');
                    $(this).next().val(num);
                }else if(num<1000000000){
                    num-=1000;
                    num=utils.twoWay_Kbit(num,',');
                    $(this).next().val(num);

                }
                selectWork1();
            }
        });
    });

    $(".shopCart_one_c2").bind('input propertychange', function() {
        var num=$(this).val() || 1;
        num=parseInt(utils.twoWay_Kbit(num));
        if(num==0 || num=="NaN"){
            num=1;
        }
        if(num>=1000000000){
            num=1000000000;
        }
        num=utils.twoWay_Kbit(num,',');
        $(this).val(num);
        selectWork1();
        // $(this).valueOf()
    });
    $(".shopCart_one_c3").each(function (index,row) {
        $(this).click(function (e) {
            if(e.target.tagName=='SPAN'){
                var num=$(this).prev().val();
                // var SingsPrice=$('.shopCart_unitPrice').text();
                num=parseInt(utils.twoWay_Kbit(num));
                if(num<1000000000) {
                    num += 1000;
                    // var singsTotal = num * SingsPrice;
                    // console.log(singsTotal);
                    num = utils.twoWay_Kbit(num, ',');
                    $(this).prev().val(num);
                }else{
                    num=1000000000;
                }
                selectWork1();
            }
        });
    });


    // //goods 商品列表多余不显示
    $(".goods_listBox_a li").click(function(){
        $(".goods_information").scrollTop(0);
    });
    // $(".goods_information_a li a").each(function(index,ele){
    //     $(this).text($(this).text().length>10?$(this).text().slice(0, 10):$(this).text());
    // });
    
    //区间价格表
    // $(".detail_priceRange_Anniu").click(function () {
    //     $(".detail_dialog_PRICERANGE").addClass("detail_dialog_TCHighlight");
    //     $(".detail_dialog_bg").addClass("allShow");
    // });
    
    
    // // detail 关闭弹框
    // $(".detail_dialog_box5").click(function () {
    //     $(".detail_dialog_BUYNOW").removeClass("detail_dialog_TCHighlight");
    //     $(".detail_dialog_boxBUYNOW").removeClass("allShow");
    // });
    // $(".detail_twoBox .detail_dialog_box3").bind("touchmove",function (e) {
    //     $(".detail_twoBox").bind( "touchmove", function (e) {
    //         return false;
    //     });
    //
    // });
    // $(".detail_twoBox").bind("touchmove",function (e) {
    //     $(".detail_twoBox").unbind();
    // });
    // detail 选择套餐
    // $(".detail_dialog_six").each(function(index,row){
    //     var detail_select_li=$(this).children(),len;
    //     detail_select_li.click(function (){
    //         len= $(this).index();
    //         $(".detail_six_selected").text($(this).text());
    //         $(".detail_dialog_six").each(function(index,row){
    //             var detail_allSelect_li=$(this).children();
    //             detail_allSelect_li.eq(len).addClass("detail_dialog_sixHighLiang").siblings().removeClass("detail_dialog_sixHighLiang");
    //         })
    //     });
    // });
    //detail 加入购物车成功
    // $(".detailIntoShopCart_success").click(function () {
    //     var selectText=$(".detail_six_selected").text();
    //     if(selectText.substring(0,3)!="请选择"){
    //         utils.tishi('加入成功');
    //         $(".detail_dialog_TC").removeClass("detail_dialog_TCHighlight");
    //         $(".detail_dialog_bg").removeClass("detail_dialog_TCHighlight1");
    //         $(".detail_dialog_bg").removeClass("allShow");
    //         $(".detail_dialog_BUYNOW").removeClass("detail_dialog_TCHighlight");
    //         $(".detail_dialog_boxBUYNOW").removeClass("allShow");
    //         $(".detail_dialog_box4").removeClass("allShow");
    //     }else{
    //         utils.tishi('请选择参数！');
    //     }
    // });
    //newsAddress 加入购物车成功
    $(".new_two_aBoxSAVE").click(function () {
        var selectText1=$(".news_one_inputCont1").val(),selectText2=$(".news_one_inputCont2").val(),selectText3=$(".news_one_inputCont3").val();
        if(selectText1 && selectText2 && selectText3){
            utils.tishi('加入成功');
            setTimeout(function(){
                window.open('adminAddress.html','_self');
            },500);
        }else{
            utils.tishi('请填完整信息再保存！');
        }

    });
    //modifyUserName 加入购物车成功
    $(".modifyUM_thr_box").click(function () {
        var modifyUM_input1=$(".modifyUM_one_input1")[0].value;
        if(modifyUM_input1){
            utils.tishi('加入成功');
            setTimeout(function(){
                window.open('accountSettings.html','_self');
            },500);
        }else{
            utils.tishi('用户名不能为空！');
        }

    });
    //detail 立即购买
    // $(".detailIntoBuyNow_success").click(function () {
    //     var selectText=$(".detail_six_selected").text();
    //     if(selectText.substring(0,3)!="请选择"){
    //         window.open("paymentInterflow.html",'_self');
    //     }else{
    //         utils.tishi('请选择参数！');
    //     }
    // });
    //购买流程示意
    $(".detail_eight_box").click(function () {

    });
    //waitPayment 弹框
    $(".waitPayment_two_aQX").each(function (index,row) {
        $(this).click(function (e) {
           if(e.target.tagName=='A'){
               utils.dialogBox('您是否确认取消此订单！','确认','返回');
           }
        });
    });
    // editAddress 显示弹框隐藏弹框
    $(".shopCart_one_eDEL").each(function (index,row) {
        $(this).click(function (e) {
            if(e.target.tagName=='SPAN'){
                utils.dialogBox('是否要在购物车中删除此商品?','取消','删除','.shop_box_autoMove');
                $(".shop_box_autoMove").css({overflow:'hidden'});
            }
        });
    });
    // shopCart 显示弹框隐藏弹框
    $(".editAddress_thr_aDELADDRESS").each(function (index,row) {
        $(this).click(function (e) {
            if(e.target.tagName=='SPAN'){
                utils.dialogBox('确定要删除该地址吗?','取消','确定');
            }
        });
    });
    // adminAddress 显示弹框隐藏弹框
    $(".adminAddress_one_bDEL").each(function (index,row) {
        $(this).click(function (e) {
            if(e.target.tagName=='A'){
                utils.dialogBox('确定要删除该地址吗?','取消','确定',".addAddress_box_autoMove");
                $(".addAddress_box_autoMove").css({overflow:'hidden'});
            }
        });
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

     // login 显示隐藏
     $(".login_password_change").click(function () {
        utils.displaychange(this,"./img/login/login_pass_hide.png","./img/login/login_pass_show.png"); 
    });
     // index
     $(".h_tab li").click(function(){
        utils.moduleChange2(this,"highlight",".h_tab",".h_main");
     });

     // find
     $(".home_search_find").click(function(){
        $(".all_bomb_bg").addClass("allShow");
        $(".all_bomb_cont").css({right:"15%"});
         $(window).unbind("scroll");
         return false;
     });
     $(".classify_two_d_submit").click(function(){
        $(".home_bomb_bg").removeClass("allShow");
        $(".home_bomb_cont").css({right:'200%'});
     });
     $(".all_bomb_cont").click(function (e) {
            return false;
     });
     $(".classify_two li a").click(function(e){
        $(window).bind("scroll");
        e.stopPropagation()
     });
    $(document).click(function (e) {
        $(".all_bomb_bg").removeClass("allShow");
        $(".paySuccess_box_bg").remove();
        $(".all_bomb_cont").css({right:'200%'});
        $(window).bind("scroll");
    });

    //index
    $(window).scroll(function () {
        var sHeight=$(window).scrollTop();
        if(sHeight>200){
            $(".h_find").hide();
            $(".home_one_box").show();
        }else{
            $(".h_find").show();
            $(".home_one_box").hide();
        }
    });
});

