//导入网络层
import request from '../util/request.js';

/**
 * 用户模块逻辑层
 */
export default {

  /**
   * 登录接口
   * @param {用户名} username 
   * @param {密码} password 
   */
  async login(username, password) {
    let body = await request.post('http://127.0.0.1:9001/login', { username, password });
    if(body.code === 0){
      localStorage.setItem('token',body.data.token);
      localStorage.setItem('id',body.data.id);
    }
    return body;
  },

  /**
   * 注销登录接口
   * @param {用户名} username 
   * @param {密码} password 
   */
  async logout(username, password) {
    let body = await request.delete('http://127.0.0.1:9001/logout', { username, password });
    if(body.code === 0){
      localStorage.clear(); //清除本地的数据
    }
    return body;
  },

  /**
   * 获取用户信息
   * @param {用户id} id 
   */
  async getUserInfo(id = localStorage.getItem('id')) {
    let body = await request.get(`http://127.0.0.1:9001/users/${id}`);
    if(body.code === 0){
      localStorage.setItem('userInfo',JSON.stringify(body.data));
    }
    return body;
  },
}