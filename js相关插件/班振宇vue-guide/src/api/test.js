//导入网络层
import request from '../util/request.js';

/**
 * 测试模块逻辑层
 */
export default {

  /**
   * 203请求
   */
  async _203() {
    let result = await request.get(`http://127.0.0.1:9001/test/203`);
    return result;
  },

  /**
  * 401请求
  */
  async _401() {
    let result = await request.get(`http://127.0.0.1:9001/test/401`);
    return result;
  },

  /**
  * 500请求
  */
  async _500() {
    let result = await request.get(`http://127.0.0.1:9001/test/500`);
    return result;
  },
  
}