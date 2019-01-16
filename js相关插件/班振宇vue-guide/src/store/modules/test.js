
import testApi from '../../api/test';

export default {
    state: {
    },
    getters: {
        // 类似计算属性...
    },
    mutations: {
        ['GET_HTTP_500_SUCCESS'](state, msg) {
            alert(msg);
        },
        ['GET_HTTP_500_FAIL'](state, msg) {
            alert(msg);
        },
        ['GET_HTTP_401_SUCCESS'](state, msg) {
            alert(msg);
        },
        ['GET_HTTP_401_FAIL'](state, msg) {
            alert(msg);
        },
        ['GET_HTTP_203_SUCCESS'](state, msg) {
            alert(msg);
        },
        ['GET_HTTP_203_FAIL'](state, msg) {
            alert(msg);
        },
    },
    actions: {

    //测试 http 500
    async get500Response({ commit }) {
        let result = await testApi._500();
        //下面代码不会执行,处理逻辑见httpcli的响应拦截器 vue-helloworld\src\util\request.js  line:16
        if (result.code === 0) {
            commit('GET_HTTP_500_SUCCESS', result.msg);
        } else {
            //登录失败
            commit('GET_HTTP_500_FAIL', result.msg);
        }
    },

    //测试 http 401
    async get401Response({ commit }) {
        let result = await testApi._401();
        //下面代码不会执行,处理逻辑见httpcli的响应拦截器 vue-helloworld\src\util\request.js  line:16
        if (result.code === 0) {
            commit('GET_HTTP_401_SUCCESS', result.msg);
        } else {
            //登录失败
            commit('GET_HTTP_401_FAIL', result.msg);
        }
    },

    //测试 http 203
    async get203Response({ commit }) {
        let result = await testApi._203();
        if (result.code === 0) {
            commit('GET_HTTP_203_SUCCESS', result.msg);
        } else {
            //登录失败
            commit('GET_HTTP_203_FAIL', result.msg);
        }
    }
    }
}