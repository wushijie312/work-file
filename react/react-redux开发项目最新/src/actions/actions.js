import fetch from "isomorphic-fetch";
import * as types from '../constants/actionTypes';
export function increase() {
  return {
    type: types.INCREASE
  }
}
export function decrease() {
  return {
    type: types.DECREASE
  }
}
// export function increase_async() {
  
//   const URL = types.URL_BASE + types.skuonoroffshelves;
//   var post = JSON.stringify({
//     username: "admin",
//     password: "111111"
//   });
//   return (dispatch) => {
//     fetch(URL, {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: post
//     }).then((req) => {
//       if (req.ok) {
//         return req.json();
//       } else if (req.status == 401) {
//         setTimeout(function () { window.location.href = '/pcPage/PcPageLogin' }, 2000)
//         //alert("您尚未登录或登录状态过期，请先登录！");
//       }
//     }).then(json => {
//       if (json.code == 0) {
//         return dispatch({
//           type: types.USER_LOGIN,
//           data: json.data,
//           tk: json.tk
//         });
//       } else {

//         alert('注册失败,请重试！');
//       }
//     });
//   }

// }
export function increase_async() {
  // return async ()=>{
  //  var post={
  //    username:"admin",
  //    password:"111111"
  //  }
  //     var func=json => {
  //         if(json.code==0){
  //             return  {
  //                 type:types.USER_LOGINSS,
  //                 data:json.data,
  //                 tk:json.tk
  //             }
  //         }else{

  //             alert('注册失败,请重试！');
  //         }
  //         return {
  //             type: json.id>0?types.URL_USER_INFORMATION_TIJIAO:"",
  //             data:json
  //         };
  //     };
  //     await fetchPostWithUrlFunc(types.URL_BASE+types.USER_LOGIN,{
  //         method: "POST",
  //         headers: {
  //                'Content-Type': 'application/json',
  //                'Accept': 'application/json'
  //            },
  //         body:JSON.stringify(post)
  //     },func,'');
  // }
  const URL = types.URL_BASE + types.USER_LOGIN;
  var post = JSON.stringify({
    username: "admin",
    password: "111111"
  });

  return (dispatch) => {
    fetch(URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: post
    }).then((req) => {
      if (req.ok) {
        return req.json();
      } else if (req.status == 401) {
        setTimeout(function () { window.location.href = '/pcPage/PcPageLogin' }, 2000)
        //alert("您尚未登录或登录状态过期，请先登录！");
      }
    }).then(json => {
      if (json.code == 0) {
        return dispatch({
          type: types.USER_LOGIN,
          data: json.data,
          tk: json.tk
        });
      } else {

        alert('注册失败,请重试！');
      }
    });
  }

}


function fetchWithUrlFunc(url, func) {
  return fetch(url + getTimeStampParam())
    .then(req => {
      if (req.ok) {
        return req.json();
      } else if (req.status == 401) {
        setTimeout(function () { window.location.href = '/pcPage/PcPageLogin' }, 2000)
        //alert("您尚未登录或登录状态过期，请先登录！");
      }
      return { code: "1", message: req.message };
    })
    .then(func);
}
function fetchPostWithUrlFunc(url, post, func, timestamp) {
  return fetch(url + timestamp, post)
    .then(req => {
      if (req.ok) {
        return req.json();
      } else if (req.status == 401) {
        setTimeout(function () { window.location.href = '/pcPage/PcPageLogin' }, 2000)
        //alert("您尚未登录或登录状态过期，请先登录！");
      }
      return { code: "1", message: req.message };
    })
    .then(func);
}
function getTimeStampParam() {
  return "&timestamp=" + (parseInt(getCookie('tsDer')) + parseInt(new Date().getTime() / 1000));
}

var token = "";

// export function GetQueryString(name)
// {
//     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     if(r!=null){
//         token=unescape(r[2]);
//         setCookie('tk',unescape(r[2]));
//     }else{
//         token=getCookie('tk');
//     }
//     return token;
// }

// /* 时间 */
// export function format(dateIN,format){
//     var date = {
//         "M+": dateIN.getMonth() + 1,
//         "d+": dateIN.getDate(),
//         "h+": dateIN.getHours(),
//         "m+": dateIN.getMinutes(),
//         "s+": dateIN.getSeconds(),
//         "q+": Math.floor((dateIN.getMonth() + 3) / 3),
//         "S+": dateIN.getMilliseconds()
//     };
//     if (/(y+)/i.test(format)) {
//         format = format.replace(RegExp.$1, (dateIN.getFullYear() + '').substr(4 - RegExp.$1.length));
//     }
//     for (var k in date) {
//         if (new RegExp("(" + k + ")").test(format)) {
//             format = format.replace(RegExp.$1, RegExp.$1.length == 1
//                 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
//         }
//     }
//     return format;
// }


// /* 用户登录cookie处理  */
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
export function setCookie(name, value) {
  var exp = new Date();
  exp.setTime(exp.getTime() + 1200 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
}
// export function setCookieWithoutExpire(name,value)
// {
//     document.cookie = name + "="+ escape (value)+"; path=/";
// }
// export function isNotUserLogined(id)
// {
//     return id==undefined&&(getCookie('tk')!=null&&getCookie('tk').length>=32&&getCookie('uid')!=null&&getCookie('uid').length>0);
// }