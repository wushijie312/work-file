
import goodsApi from '../../api/goods';

export default {
    state: {
        //商品列表
        goodsList: [],
    },
    getters: {
        // 类似计算属性...
    },
    mutations: {
        ['RESET_GOODS_STATE'](state) {
            state.goodsList = [];
        },
        ['GET_GOODS_LIST_SUCCESS'](state, goodsList) {
            state.goodsList = goodsList;
        },
        ['GET_GOODS_LIST_FAIL'](state, msg) {
            alert(msg);
        },
    },
    actions: {
        //获取商品列表
        async getGoodslist({ commit }) {
            let result = await goodsApi.list();
            if (result.code === 0) {
                commit('GET_GOODS_LIST_SUCCESS', result.data);
            } else {
                //登录失败
                commit('GET_GOODS_LIST_FAIL', result.msg);
            }
        },
    }
}