
// import userApi from '../../api/user';
import { get } from '@/utils/request';
import { URL } from '@/utils/const';
import { Message } from 'element-ui';
// import { endLoading } from '@/utils/loading';

export default {
    state: {
        //登录信息
        userInfo: {},
    },
    getters: {
        // 类似计算属性...
    },
    mutations: {
        // 获取用户信息
        ['GET_USER_INF_SUCCESS'](state, userInfo) {
            state.userInfo = userInfo;
            console.log(userInfo);
            // Message({
            //     showClose: true,
            //     message: val,
            //     type: 'success'
            // });

        },
        ['NORMAL_FAIL'](state, msg) {
            Message({
                showClose: true,
                message: msg,
                type: 'error'
            });
        },
    },
    actions: {

        async  getUserInf({ commit },) {
            let result={"name":"测试","tenantId":"533","userId":"165302","userName":"bbb"};
            commit('GET_USER_INF_SUCCESS', result);

            // let result = await get(URL.URL_GET_USER_INF);
         
            // if (result) {
            //     result=JSON.parse(result);
            //     commit('GET_USER_INF_SUCCESS', result);
            //     // const easypnp_access = commit('getCookie', 'easypnp_access');
            //     // console.log(easypnp_access);

            //     // localStorage.setItem('userinf',result);
               
            // } else {
            //     commit('NORMAL_FAIL', result.Message);
            // }
        },


    }
}