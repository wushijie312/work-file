// 包含了n个接口请求的函数的模块
//函数返回值为具体的数值：data
import ajax from './ajax'

// const BASE_URL='http://localhost:4000'
const BASE_URL='/api'
//注册接口
export const reqRegister=(user)=>ajax(BASE_URL+'/register',user,'post')


//登录接口
export const reqLogin=({username,password})=>ajax('/login',{username,password},'post')


//更新用户接口
export const reqUpdateUser=(user)=>ajax('/updata',user,'post')


//获取用户信息
export const reqUser=()=>ajax(BASE_URL+'/user')


//获取用户列表
export const reqUserList=({type})=>ajax('/userlist',{type})

