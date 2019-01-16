
import cartApi from '../../api/cart';

export default {
    state: {
        //购物车列表
        cartList: [],
    },
    getters: {
        // 类似计算属性...
    },
    mutations: {
        ['RESET_CART_STATE'](state) {
            state.cartList = [];
        },
        ['GET_CART_LIST_SUCCESS'](state, cartList) {
            state.cartList = cartList;
        },
        ['DELETE_CART_SUCCESS'](state, msg) {
            alert(msg);
        },
        ['DELETE_CART_FAIL'](state, msg) {
            alert(msg);
        },
        ['ADD_CART_SUCCESS'](state, msg) {
            alert(msg);
        },
        ['ADD_CART_FAIL'](state, msg) {
            alert(msg);
        }
    },
    actions: {

        //获取购物车列表
        async getCartlist({ commit }) {
            let result = await cartApi.list();
            if (result.code === 0) {
                commit('GET_CART_LIST_SUCCESS', result.data);
            } else {
                //登录失败
                commit('GET_CART_LIST_FAIL', result);
            }
        },

        //获取购物车列表
        async addCart({ dispatch,commit }, goodsInfo) {
            let result = await cartApi.add(goodsInfo);
            if (result.code === 0) {
                commit('ADD_CART_SUCCESS', result.msg);

                //更新当前购物车列表
                await dispatch('getCartlist');
            } else {
                //登录失败
                commit('ADD_CART_FAIL', result);
            }
        },

        //删除购物车条目
        async deleteCartItem({ dispatch, commit }, id) {
            let result = await cartApi.delete(id);
            if (result.code === 0) {
                await dispatch('getCartlist'); //重新获取购物车列表
                commit('DELETE_CART_SUCCESS', result.msg);
            } else {
                //登录失败
                commit('DELETE_CART_FAIL', result);
            }
        },

    }
}