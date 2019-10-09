
import {
  reqRegister,
} from '../../api'

const state = {
   userInfo: "1111"
  };
  const mutations = {
    post_register(state, {user}) {
      state.userInfo = user
    }
  };
   
  const actions = {
      // 异步获取地址
    async getRegister({commit, state},userinfo) {
      // 发送异步ajax请求
    
      const result = await reqRegister(userinfo)
      // 提交一个mutation
      if (result.code === 0) {
        const data = result.data
        commit('post_register', {data});
      }
    }
  };
  const getters = {
   
  };
   
  // 不要忘记把state, mutations等暴露出去。
  export default {
    state,
    mutations,
    actions,
    getters
  }