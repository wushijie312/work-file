/************正则验证数据合法性***************************/
//用户名
function validateUsername(value) {
    var regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var regex2 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var regex3 = /^\w+$/;
    return value.match(regex) == null && value.match(regex2) == null && value.match(regex3) == null;
}

//手机号
function validatePhone(value) {
    var regex = /^(1[2|3|4|5|6|7|8])\d{9}$/;
    return value.match(regex) == null; 
}

//邮箱
function validateEmail(value) {
    var regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return value.match(regex) == null;
}

//密码
function validatePwd(value) {
    var regex = /^(?![0-9_]+$)(?![a-zA-Z_]+$)[0-9a-zA-Z_]{6,20}$/;
    return value.match(regex) == null;
}
//判断浏览器
function checkFirefoxOrIE(){
    userAgent=window.navigator.userAgent.toLowerCase();
    if(userAgent.indexOf("firefox")>=1){
        return 1;
    }
    else if(userAgent.indexOf("chrome")>=1)
    {
        return 2;
    }
    else {
        var name=navigator.appName;
        if(name=="Microsoft Internet Explorer"){
            return 0;
        }
    }
    return -1;
}
//判断浏览器版本号****************************************
function myBrowser(){
    var userAgent =window.navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
    var isChrome=userAgent.indexOf("Chrome") > -1;//判断是否Chrome浏览器
    
    if (isIE) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = IE9 = IE10 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        IE9 = fIEVersion == 9.0;
        IE10 = fIEVersion == 10.0;
        if (IE55) {
            return "NotSupport";
        }
        if (IE6) {
            return "NotSupport";
        }
        if (IE7) {
            return "NotSupport";
        }
        if (IE8) {
            return "IE8";
        }
        if (IE9) {
            return "IE9";
        }
        if (IE10) {
            return "IE10";
        }
    }//isIE end
    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
    if(isSafari)
    {
        return "Safari";
    }
    if(isChrome)
    {
        return "Chrome";
    }
    return "Other";
}
//*******************************************************

/************文本框输入字符限制***************************/
//获取选中的文字
function getSelectionText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange().text;
    }
    return '';
}

//只允许输入数字
function numberInput(input, maxlength) {
    input.keypress(function (event) {
     
        //IE 中 Event 对象使用 keyCode 获得键入字符的 Unicode 编码  
        //DOM 中 Event 对象 使用 charCode 获得键入字符的 Unicode 编码  
        var char_code = event.charCode ? event.charCode : event.keyCode;
        if((char_code>=37 && char_code<=40) || char_code==118)//允许上下左右和ctrl+v（118）
        {
            return true;
        }
        var isselected = getSelectionText().length > 0; //如果文本被选中，则不需要判断字符个数。因为选中文本后再输入必然会覆盖选中文本
        if(checkFirefoxOrIE()==1)
        {
            isselected=true;//火狐里不限制位数
        }
        if (($(this).val().length < maxlength || isselected) || char_code == 8) {
            //Unicode 编码中， 0~9 的编码的十进制 是 48~57 之间 ， 0为 48， 9 为57  
            if ((char_code < 48 || char_code > 57) && char_code != 8) {
                return false;
            }
            else {
                if ($(this).val() == "" && char_code == 48)
                {
         
                    return false;
                }
                else
                    return true;
            }
        } else {
            return false;
        }
    }).bind("paste", function (e) { 
        var pastedText = undefined;
        if (window.clipboardData && window.clipboardData.getData) { // IE
            pastedText = window.clipboardData.getData('Text');
          } else {
            pastedText = e.originalEvent.clipboardData.getData('Text');//e.clipboardData.getData('text/plain');
          }
        var phoneVal=pastedText;
        phoneVal = phoneVal.replace(/[^0-9]*/g, ""); //替换非数字字符为空格
        $(this).val(phoneVal); 
        return false;
  }).css("ime-mode", "disabled");

}


//允许输入小数
function numberDecimal(input, maxlength) {
    input.keypress(function (event) {
        //IE 中 Event 对象使用 keyCode 获得键入字符的 Unicode 编码  
        //DOM 中 Event 对象 使用 charCode 获得键入字符的 Unicode 编码  
        var char_code = event.charCode ? event.charCode : event.keyCode;
        if(char_code>=37 && char_code<=40)//允许上下左右
        {
            return true;
        }
        var isselected = getSelectionText().length > 0; //如果文本被选中，则不需要判断字符个数。因为选中文本后再输入必然会覆盖选中文本
        if (($(this).val().length < maxlength || isselected) || char_code == 8 || char_code == 46) {
            //Unicode 编码中， 0~9 的编码的十进制 是 48~57 之间 ， 0为 48， 9 为57  
            if ((char_code < 48 || char_code > 57) && char_code != 8 && char_code != 46) {
                return false;
            }
            else {
                if ($(this).val() == "" && char_code == 46)
                    return false;
                else if ($(this).val() != "" && char_code == 46 && $(this).val().indexOf(".") > 0)
                    return false;
                else
                    return true;
            }
        } else {
            return false;
        }
    }).bind("paste", function () {
        return false;
    }).css("ime-mode", "disabled");
}

//不允许输入空格
function cannotspace(input) {
    input.keypress(function (event) {
        //IE 中 Event 对象使用 keyCode 获得键入字符的 Unicode 编码  
        //DOM 中 Event 对象 使用 charCode 获得键入字符的 Unicode 编码  
        var char_code = event.charCode ? event.charCode : event.keyCode;
        //        console.log(char_code + "," + (!(char_code >= 48 && char_code <= 57) && !(char_code >= 65 && char_code <= 90) && !(char_code >= 97 && char_code <= 122) && char_code != 64 && char_code != 46 && char_code != 95));
        //数字：48-57
        //大写字母：65-90
        //小写字母：97-122
        //@：64
        //.：46
        //_：95
        if (char_code == 32) {//空格不允许
            return false;
        }
        //        else if (!(char_code >= 48 && char_code <= 57) && !(char_code >= 65 && char_code <= 90) && !(char_code >= 97 && char_code <= 122) && char_code != 64 && char_code != 46 && char_code != 95) {
        //            return false;
        //        }
        else {
            return true;
        }
    })
}

//仅允许输入汉字、数字和·-/
//{ 
//object:input,
//length:10,
//regex:/\D|^0/g
//}
function inputLimitRegex(data)
{
    if (data.regex == undefined)
    {
        if(data.object.attr("isemail")!=undefined && data.object.attr("isemail")=="1")
            data.regex=/([^0-9a-zA-Z@._-]+)/g;//邮箱允许输入@_.-
        else
            data.regex=/([^0-9a-zA-Z\u4E00-\u9FA5/-]+)/g;//默认不允许输入特殊字符
    }
}
function inputLimit(data) {
    data.object.keypress(function (event) {
        if (data.length != undefined && data.length > 0) {//如果设置了长度限制
            if ($(this).val().length >= data.length) {
                return false;
            }
        } 
        var char_code = event.charCode ? event.charCode : event.keyCode;
        if (data.notspace != undefined) {//是否允许输入空格
            if (data.notspace && char_code == 32) {//空格不允许
                return false;
            }
        }
    }).keyup(function (event) {
        var char_code = event.charCode ? event.charCode : event.keyCode;
        if(char_code>=37 && char_code<=40)//屏蔽上下左右
        {
            return false;
        }

        inputLimitRegex(data);//实时设置所使用的正则表达式
        var tmptxt = $(this).val();
        if (data.regex != undefined && data.regex.test(tmptxt)) {//如果设置了正则，且符合正则验证才替换
            $(this).val(tmptxt.replace(data.regex, ''));
        }
        if (data.length != undefined && data.length > 0) {//如果设置了长度限制
            if ($(this).val().length > data.length) {
                $(this).val($(this).val().substring(0, data.length));
            }
        }
    }).bind("paste", function () {
        inputLimitRegex(data);//实时设置所使用的正则表达式
        var tmptxt = $(this).val();
        if (data.regex != undefined && data.regex.test(tmptxt)) {//如果设置了正则，且符合正则验证才替换
            $(this).val(tmptxt.replace(data.regex, ''));
        }
        if (data.length != undefined && data.length > 0) {//如果设置了长度限制
            if ($(this).val().length > data.length) {
                $(this).val($(this).val().substring(0, data.length));
            }
        }
    })
}

//判断是否pc端
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}






//检查密码强度
//测试某个字符是属于哪一类.
function CharMode(iN) {
    if (iN >= 48 && iN <= 57) //数字
        return 1;
    if (iN >= 65 && iN <= 90) //大写字母
        return 2;
    if (iN >= 97 && iN <= 122) //小写
        return 4;
    else return 8; //特殊字符
}
//bitTotal函数
//计算出当前密码当中一共有多少种模式
function bitTotal(num) {
    modes = 0;
    for (i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}
//checkStrong函数
//返回密码的强度级别
function checkStrong(sPW) {
    if (sPW.length <= 6) return 0; //密码太短
    Modes = 0;
    for (i = 0; i < sPW.length; i++) {
        //测试每一个字符的类别并统计一共有多少种模式.
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}