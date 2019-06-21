import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);
import basic from './modules/basic';
import goods from './modules/goods';
import layout from './modules/layout';
import themeColor from './modules/themeColor';
import user from './modules/user';
import index from './modules/index';
export default new Vuex.Store({
    modules:{
        basic:basic,//基础模块
        goods:goods,//商品列表
        user:user,
        index:index,
        layout:layout,
        themeColor:themeColor,
    },
    state :{
        //根state
    },
    mutations : {
        //根mutations
    },
    actions :{
        //根actions
    },
    getters : {
        //根getters
    },
    
});