//导入网络层
import request from '../util/request.js';

/**
 * 购物车模块逻辑层
 */
export default {

  /**
   * 购物车列表
   */
  async list() {
    let body = await request.get('http://127.0.0.1:9001/cart/list');
    if (body.code === 0) {
      //显示图片处理,新增一个字段用于显示封面图片(服务器返回的图片是绝对路径)
      body.data.map(item => item.cover = `https://cdn.bestseller.com.cn${item.gscPicmainPath}`)
    }
    return body;
  },

  /**
   * 删除购物车条目
   * @param {购物车id} id 
   */
  async delete(id) {
    let body = await request.delete(`http://127.0.0.1:9001/cart/${id}`);
    return body;
  },
  
  /**
   * 加入购物车
   * @param {商品信息} goodsInfo 
   */
  async add(goodsInfo) {
    goodsInfo.gscPicmainPath = goodsInfo.gscMaincolPath;
    let body = await request.put(`http://127.0.0.1:9001/cart/add`, goodsInfo);
    return body;
  },
  
}