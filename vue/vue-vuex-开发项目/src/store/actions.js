// import axios from 'axios';
import fetch from 'isomorphic-fetch';
// export const fun = ({commit})=>{
	
// 	setTimeout(() => {
// 		commit({
// 			type: 'getMsg',
// 			msg: "我是修改后的数据",
// 			count: '吴世界'
// 		})
// 	}, 1000)  
// }
export function fun({commit}){
	
	setTimeout(() => {
		commit({
			type: 'getMsg',
			msg: "我是修改后的数据",
			count: '吴世界'
		})
	}, 1000)  
}
export function fun1(commit) {
	var post ={
			username: "admin",
			password: "111111"
		};
	return fetch("http://127.0.0.1:7001/user/login",{
		        method: "POST",
		        headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
		        body:JSON.stringify(post)
		    }).then(req =>{
		        if(req.ok){
		            return req.json();
		        }else if(req.status==401){
		            // setTimeout(function(){window.location.href='/pcPage/PcPageLogin'},2000)
		            alert("您尚未登录或登录状态过期，请先登录！");
		        }
		        return {code:"1",message:req.message};
		    }).then(json=>{
		    	if(json.code==0){
		        alert('密码修改成功!');
		        
		    }else{
		        alert('密码修改失败,请重试!');
		        
		    }
	});

}
export const fun221 = ({ commit ,self}) => {
	self.$http({
		url: 'http://127.0.0.1:7001/user/login',
		 headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}, 
		data: {
			username: "admin",
			password: "111111"
		}
	}).then((response) => {
		// success callback
		commit({
			type: 'getMsg1',
			data:response.data
		})
		console.log(response.data);
	}).catch(function (response) {
		console.log(response);
	});

		

}