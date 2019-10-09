import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
// 引入register 模块
import register from "./register"
 
export default new Vuex.Store({
  // 通过modules属性引入login 模块。
  modules: {
    register: register
  },
  state :{
    //根state
    // job: "web"
  },
  mutations : {
      //根mutations
  },
  actions :{
      //根actions
  },
  getters : {
      //根getters
      // jobTitle (state){
      //   return state.job + "developer"
      // }
  },
})