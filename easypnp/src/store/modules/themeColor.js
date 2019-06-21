// import { skuHandleClose,skuHandleEdit,handleSizeChange,handleCurrentChange } from '@/mutation_types';
// import { list } from '@/api/layout';
// import {post} from '@/utils/request.js';
// import {URL} from '@/utils/const.js';
const state = {
    change_bg_type: 5,
    change_bg_color:"#6a59cc",
    change_head_color:'#473c8b'
}

const mutations = {
    // dialog 弹框
    ['chnageSystemColor'](state, value) {
        state.change_bg_type = value;
        if(value==1){
            state.change_bg_color = "#f90";
            state.change_head_color = "#f8b600";
        }else if(value==2){
            state.change_bg_color = "#2c8ce6";
            state.change_head_color = "#1363ad";
        }else if(value==3){
            state.change_bg_color = "#6bc484";
            state.change_head_color = "#4a945f";
        }else if(value==4){
            state.change_bg_color = "#d32441";
            state.change_head_color = "#ad1c34";
        }else if(value==5){
            state.change_bg_color = "#6a59cc";
            state.change_head_color = "#473c8b";
        }else if(value==6){
            state.change_bg_color = "#2f201b";
            state.change_head_color = "#000";
        }else if(value==7){
            state.change_bg_color = "#666";
            state.change_head_color = "#333";
        }
    },
}

const actions = {
    
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

}
const getters = {

}

export default {
    // namespaced:true,
    state,
    mutations,
    actions,
    getters
}