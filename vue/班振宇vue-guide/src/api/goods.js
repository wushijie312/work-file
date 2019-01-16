//导入网络层
import request from '../util/request.js';

/**
 * 商品模块逻辑层
 */
export default {
  
  /**
   * 商品列表
   */
  async list() {
    let body = await request.get('http://127.0.0.1:9001/goods/list');
    if(body.code === 0){
      //显示图片处理,新增一个字段用于显示封面图片
      body.data.map(item => item.cover = `https://cdn.bestseller.com.cn${item.gscMaincolPath}`)
    }
    return body;
  },
  
}