
import userApi from '../../api/user';

export default {
    state: {
        //登录信息
        userInfo: null,
    },
    getters: {
        // 类似计算属性...
    },
    mutations: {
        ['RESET_USER_STATE'](state) {
            state.userInfo = null; //登录信息
        },
        ['USER_LOGIN_SUCCESS'](state, userInfo) {
            state.userInfo = userInfo;
        },
        ['USER_LOGIN_FAIL'](state, msg) {
            alert(msg);
        },
        ['USER_LOGOUT_SUCCESS'](state) {
            state.userInfo = null;
        },
        ['USER_LOGOUT_FAIL'](state, msg) {
            alert(msg);
        },
        ['GET_USER_INFO_SUCCESS'](state, userInfo) {
            state.userInfo = userInfo;
        },
        ['GET_USER_INFO_FAIL'](state, msg) {
            alert(msg);
        },
    },
    actions: {
        //登录事件
        async login({ commit }, loginInfo) {
            let { username, password, $router } = loginInfo;
            if (username && password) {
                let result = await userApi.login(username, password);
                if (result.code === 0) {
                    //登录成功
                    let userInfoResult = await userApi.getUserInfo();
                    commit('USER_LOGIN_SUCCESS', userInfoResult.data);
                    $router.push('goods');
                } else {
                    //登录失败
                    commit('USER_LOGIN_FAIL', result.msg);
                }
            } else {
                //登录失败
                commit('USER_LOGIN_FAIL', '请输入用户名或密码');
            }

        },

        //获取购物车列表
        async getUserInfo({ commit }) {
            let result = await userApi.getUserInfo();
            if (result.code === 0) {
                commit('GET_USER_INFO_SUCCESS', result.data);
            } else {
                commit('GET_USER_INFO_FAIL', result.data);
            }
        },

        //注销登录事件
        async logout({ commit }, router) {
            try{
                await userApi.logout();
            }catch(e){
                // 此接口不管成功与否都让用户退出
            }
            commit('RESET_USER_STATE');
            commit('RESET_GOODS_STATE');
            commit('RESET_CART_STATE');
            
            //注销登录成功
            router.push('login');
        },

    }
}