// import { skuHandleClose,skuHandleEdit,handleSizeChange,handleCurrentChange } from '@/mutation_types';
// import { list } from '@/api/layout';
// import {post} from '@/utils/request.js';
// import {URL} from '@/utils/const.js';
const state = {
    // dialog
    // skuOpen: false,
    // skuList: [],
    // // pagination分页
    // currentPage: 1,
    // demo http
    //jsontext
}

const mutations = {
    // dialog 弹框
    // ['skuHandleEdit'](state, row) {
    //     state.skuOpen = true;
    //     state.skuList = row;
    // },
    // ['skuHandleClose'](state) {
    //     state.skuOpen = false;
    // },
    // // 分页
    // ['handleSizeChange'](state, val) {
    //     state.currentPage = val;
    // },
    // ['handleCurrentChange'](state, val) {
    //     state.currentPage = val;
    // },
    //demo http 
    ['GET_CART_LIST_SUCCESS'](state, infoList) {
        state.infoList = infoList;
    },
    ['DELETE_CART_FAIL'](state, msg) {
        alert(msg);
    }
    ,
    GET_CART_LIST_FAIL(state,msg){
        alert(msg)
    }
}

const actions = {
    // getCartlist2({commit}) {
    //     let result ;
    //     result= post(URL.URL_LOGO,{
    //         "username":"admin",
    //         "password":"111111"
    //       });
    //     console.log(result);
    //     result.then(function(data){
    //         if (data) {
    //             commit('GET_CART_LIST_SUCCESS', data);
    //         } else {
    //             //登录失败
    //             commit('GET_CART_LIST_FAIL', data);
    //         }
    //     });
    //     console.log(result);
    // },
    // getCartlist({commit}) {
    //     let result ;
    //     result= post(URL.URL_LOGO,{
    //         "username":"admin",
    //         "password":"111111"
    //       });
    //     console.log(result);
    //     result.then(function(data){
    //         if (data) {
    //                         commit('GET_CART_LIST_SUCCESS', data);
    //                     } else {
    //                         //登录失败
    //                         commit('GET_CART_LIST_FAIL', data);
    //                     }
    //     });

    //     console.log(result);
       
    // },
    // // //获取购物车列表
    // getCartlist({ commit }) {
    //     let result = post(URL.URL_LOGO,{
    //         "username":"admin",
    //         "password":"111111"
    //       });
    //     result.then(function(data){
    //         if (data) {
    //             commit('GET_CART_LIST_SUCCESS', data);
    //         } else {
    //             //登录失败
    //             commit('GET_CART_LIST_FAIL', data);
    //         }
    //     });
    // },

    // async getCartlist({ commit }) {
    //     let result = await post(URL.URL_LOGO,{
    //         "username":"admin",
    //         "password":"111111"
    //       });
    //     console.log(result);
    //     if (result) {
    //         commit('GET_CART_LIST_SUCCESS', result);
    //     } else {
    //         //登录失败
    //         commit('DELETE_CART_FAIL', result.msg);
    //     }
    // },
}

const getters = {
    // localJobTitle(state,getters,rootState,rootGetters){
    //     return rootGetters.jobTitle+rootState.job;
    // }
}


export default {
    // namespaced:true,
    state,
    mutations,
    actions,
    getters
}