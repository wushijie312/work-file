var utils = {
	timer: null,
	createDiv: function (childClass, imgSrc, text) {
		var div = `<div class='o_bg o_tanchu'><div class=` + childClass + `><img src=` + imgSrc + `><p>` + text + `</p></div></div>`;
		$("body").append(div);
	},
	tips: function (text, tip, btnOne, btnTwo, len, callback_a, callback_b) {
		if (len) {
			var div = `<div class='o_bg tanchuTS'>
			<div class="o_tanchuMark">
				<h3 class="o_tanchuMark_title">`+ tip + `</h3>
				<p class="o_tanchuMark_cont">`+ text + `</p>
				<ul class="o_tanchu_btn o_tanchu_btn_width">
					<li class="sure" id="sure_b">
						<a href="javascript:;">`+ btnOne + `</a>
					</li>
				</ul>
			</div>
		</div>`;
		} else {
			var div = `<div class='o_bg tanchuTS'>
			<div class="o_tanchuMark">
			<h3 class="o_tanchuMark_title">`+ tip + `</h3>
			<p class="o_tanchuMark_cont">`+ text + `</p>
				<ul class="o_tanchu_btn">
					<li class="o_quxiao" id="quxiao_a">`+ btnTwo + `</li>
					<li class="o_sure" id="sure_b">
						<a href="javascript:;">`+ btnOne + `</a>
					</li>
				</ul>
			</div>
		</div>`;
		}
		$("body").on("click", "#quxiao_a", function (e) {
			// 回调函数
			// callback_b();
			e.stopPropagation();
		});
		$("body").on("click", "#sure_b", function (e) {
			// 回调函数
			callback_a();
			$(".tanchuTS").remove();
			e.stopPropagation();
		});
		$("body").append(div);
	},
	error: function (text) {
		if ($(".o_tanchu")) {
			$(".o_tanchu").remove();
			clearTimeout(utils.timer);
			utils.timer = null;
		}
		utils.createDiv("o_error", "./fail.png", text || "信息错误");
		utils.timer = setTimeout(function () {
			$('.o_tanchu').remove();
		}, 1000);
	},
	success: function (text) {
		if ($(".o_tanchu")) {
			$(".o_tanchu").remove();
			clearTimeout(utils.timer);
			utils.timer = null;
		}
		utils.createDiv("o_success", "./success.png", text || "成功");
		utils.timer = setTimeout(function () {
			$('.o_tanchu').remove();
		}, 1000);
	},
	timerWarn: null,
	createDivWarn: function (classtype, text, warn) {
		var div = `<div class='o_defaultwarn ` + warn + `'>` + text + `</div>`;
		$(classtype).prepend(div);
	},
	errorWarn: function (classtype, text, warn) {
		if ($(".o_defaultwarn")) {
			$(".o_defaultwarn").remove();
			clearTimeout(utils.timer);
			utils.timer = null;
		}
		utils.createDivWarn(classtype, text || "信息错误", warn);
		utils.timer = setTimeout(function () {
			$(".o_defaultwarn").remove();
		}, 1000);
	},
	successWarn: function (classtype, text, warn) {
		if ($(".o_defaultwarn")) {
			$(".o_defaultwarn").remove();
			clearTimeout(utils.timer);
			utils.timer = null;
		}
		utils.createDivWarn(classtype, text || "信息错误", warn);
		utils.timer = setTimeout(function () {
			$('.o_defaultwarn').remove();
		}, 1000);
	},
	//验证手机号或者邮箱
	emailOrphone: function (self, siblingsClass, text) {
		var mobval = self.val();
		// mobval = mobval.replace(/[ ]/g, "");   //去掉所有空格
		var isPhone = /^[1-9]\d{7,}$/; //手机
		var regEmail = /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/;   //邮箱
		if (!(isPhone.test(mobval) || regEmail.test(mobval))) {
			utils.errorWarn(mobval, siblingsClass, text || "格式不正确", "warning");
			return false;
		} else {
			return true;
		}
		// self.val(mobval);
	},
	//验证手机号
	phone: function (self, siblingsClass, text) {
		var mobval = self.val();
		// mobval = mobval.replace(/[ ]/g, "");   //去掉所有空格
		var isPhone = /^[1-9]\d{7,}$/; //手机
		if (!(isPhone.test(mobval))) {
			utils.errorWarn(mobval, siblingsClass, text || "格式不正确", "warning");
			return false;
		} else {
			return true;
		}
		// self.val(mobval);
	},
	//验证邮箱
	email: function (self, siblingsClass, text) {
		var mobval = self.val();
		// mobval = mobval.replace(/[ ]/g, "");   //去掉所有空格
		var regEmail = /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/;  //邮箱
		if (!(regEmail.test(mobval))) {
			utils.errorWarn(mobval, siblingsClass, text || "格式不正确", "warning");
			return false;
		} else {
			return true;
		}
		// self.val(mobval);
	},
	//身份证验证
	idCard: function (self) {
		var mobval = $(self).val();
		// mobval = mobval.replace(/[ ]/g, "");   //去掉所有空格
		var is_id = /^(\d{18}$)|(^\d{17}(\d|X|x))$/;
		if (!(is_id.test(mobval))) {
			// utils.errorWarn(mobval, siblingsClass, text || "格式不正确", "warning");
			return false;
		} else {
			return true;
		}
		// self.val(mobval);
	},
	//护照
	idHuZhao: function (self, siblingsClass, text) {
		var mobval = $(self).val();
		// mobval = mobval.replace(/[ ]/g, "");   //去掉所有空格
		var is_id = /^[a-zA-Z0-9]{3,21}$/;
		if (!(is_id.test(mobval))) {
			// utils.errorWarn(mobval, siblingsClass, text || "格式不正确", "warning");
			return false;
		} else {
			return true;
		}
	},
	//驾照
	idJiaZhao: function (self, siblingsClass, text) {
		var mobval = $(self).val();
		// mobval = mobval.replace(/[ ]/g, "");   //去掉所有空格
		var is_id = /^(\d{15,18}$)|(^\d{14,17}(\d|X|x))$/;
		if (!(is_id.test(mobval))) {
			// utils.errorWarn(mobval, siblingsClass, text || "格式不正确", "warning");
			return false;
		} else {
			return true;
		}
		// self.val(mobval);
	},
	//军官证
	idJunGuan: function (self, siblingsClass, text) {
		var mobval = $(self).val();
		// mobval = mobval.replace(/[ ]/g, "");   //去掉所有空格
		var is_id = /^[a-zA-Z0-9]{7,21}$/;
		if (!(is_id.test(mobval))) {
			// utils.errorWarn(mobval, siblingsClass, text || "格式不正确", "warning");
			return false;
		} else {
			return true;
		}
		// self.val(mobval);
	},
	//只输入数字
	p_number:function (self) {
		var values = $(self).val();
		$(self).val(values.replace(/\D/g, ''))
	},
	//只能输入数字和点
	d_number:function(self) {
		var value = $(self).val();
		$(self).val(value.replace(/[^\d^\.]+/g, ''));
	},
	
	//倒计时
	timeCode:function (self){
		var send = $(self), timer = null, wait = 60;
		function countDown() {
			if (wait == 0) {
				send.prop("disabled", false);
				send.text("获取动态码");
				send.css({ background: "#9cc829" ,border:"none",lineHeihgt:"20px",color:"#fff",padding: "6px 10px",outline: "none",borderRadius: "30px"});
				clearTimeout(timer);
				timer = null;
				wait = 60;
			} else {
				send.prop("disabled", true);
				send.text("重新发送(" + wait + ")");
				send.css({ background: "#a5a5a5" ,border:"none",lineHeihgt:"20px",color:"#fff",padding: "6px 10px",outline: "none",borderRadius: "30px"});
				wait--;
				timer = setTimeout(countDown, 1000);
			}
		}
		countDown();
	},


}



// //只输入文字
// function c_words(self) {
// 	var regWords = /^[\u4e00-\u9fa5],{0,}$/, values = self.val(), regEnglish = /[a-zA-Z]/g, regPhone = /[0-9]/, empty = /[ ]/g;
// 	values = values.replace(empty, "");
// 	if (!regWords.test(values)) {
// 		values = values.replace(regEnglish, "");
// 		values = values.replace(regPhone, "");
// 		self.val(values);
// 		c_words(self);
// 	}
// 	self.val(values);
// }
//  //只输入字母
//  function e_words(self){
// 	var regWords=/[\u4e00-\u9fa5],{0,}/g,values=self.val(),regEnglish = /^[A-Za-z]+$/,regPhone=/[0-9]/g,empty=/[ ]/g;
// 	values=values.replace(empty,"");
// 	if(!regEnglish.test(values)){
// 	  values=values.replace(regWords,"");
// 	  values=values.replace(regPhone,"");
// 	  self.val(values);
// 	  e_words(self);
// 	}
// 	self.val(values);
// }

// 
$("body").on("click", ".tanchuTS,.o_quxiao", function () {
	$(".tanchuTS").remove();
});
$("body").on("click", ".o_tanchuMark", function (e) {
	e.stopPropagation();
});
