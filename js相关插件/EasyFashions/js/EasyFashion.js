$(function(){
	// 导航切换
	$(".ey_nav li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	})
	//定制鼠标移入效果
	$(".ey_custom_list li").hover(function(){
		$(this).addClass("hover")
	},function(){
		$(this).removeClass("hover");
	});
	//箭头
    $(".page_a_an").click(function () {
        var windowHeight=$(window).height();
        windowHeight=windowHeight+"px";
        $("html,body").animate({scrollTop:windowHeight});
    });  
   //详情页切换图片  切换颜色  切换款式  切换尺码
   $(".ey_switch_list li,.ey_color_list li,.ey_size_list li,.ey_style_list li").click(function(){
   		$(this).addClass("selected").siblings().removeClass("selected");
   });
   //退出登录
   $(".ey_exit").click(function(){
   		$(this).parent(".ey_userinfo").hide().siblings(".ey_login_lk").show();
   });
   //购买数量++  ey_count_num
   $(".ey_count_add").click(function(){
   		var iCount = $(".ey_count_num").val();   		
   		$(".ey_count_num").val(++iCount);
   });
   //购买数量--
   $(".ey_count_reduce").click(function(){
   		var iCount = $(".ey_count_num").val(); 
   		if(iCount<=50){
   			return false;
   		}else{
   			$(".ey_count_num").val(--iCount);
   		}  
   });
});