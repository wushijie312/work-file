
import { post, get } from '@/utils/request';
import { URL } from '@/utils/const';
import { Message } from 'element-ui';
import { endLoading } from '@/utils/loading';
export default {
    state: {
        //消息列表
        newsList: [],
        // 弹框消息列表
        newsDetails: [],
        // pagination分页
        currentPage: 1,
        sizePage: 10,
        // 详情弹框
        newsOpen: false
    },
    getters: {
        // 类似计算属性...
    },
    mutations: {
        // 消息列表  
        ['GET_NEWS_LIST_SUCCESS'](state, { sizePage, currentPage, newsList }) {
            state.newsList = newsList;
            state.sizePage = sizePage;
            state.currentPage = currentPage;
        },
       
        // ['getNewsDetails'](state, newsDetails) {
        //     state.newsDetails = newsDetails;
        //     state.newsOpen = true;
        // },
         // 消息详情弹框
        
        ['newsHandleClose'](state) {
            state.newsOpen = false;
        },
         //消息详情弹框
        ['NEWS_SETREADMSG_SUCCESS'](state, newsDetails) {
            state.newsDetails = newsDetails;
            state.newsOpen = true;
        },
        // 错误弹框
        ['NORMAL_FAIL'](state, msg) {
            Message({
                showClose: true,
                message: msg,
                type: 'error'
            });
        },

    },
    actions: {

        //  2获取消息列表
        async getNewsList({ commit }, { sizePage, currentPage, userId, sourceId }) {
            let result = await post(URL.URL_GET_USER_NEWS, JSON.stringify({
                searchList: [{ key: 'TenantId', value: '78', singleCondition: null }],
                orderBy: '',
                pagesize: sizePage || '10',
                pageindex: currentPage || '1',
                userId: userId,
                sourceId: sourceId
            }));
            // 关闭加载中loading
            endLoading();
            if (result.Success) {
                commit('GET_NEWS_LIST_SUCCESS', { sizePage, currentPage, newsList: JSON.parse(result.Data) });
            } else {
                commit('NORMAL_FAIL', result.Message);
            }

        },
        async getNewsDetails({ commit }, { newsinfo, userId }) {
            let result = await post(URL.URL_NEWS_SETREADMSG, JSON.stringify({
                msgId:newsinfo.ID,
                msgType:1,
                userId: userId,
            }));
            // 关闭加载中loading
            endLoading();
            if (result) {
                commit('NEWS_SETREADMSG_SUCCESS');
            } else {
                commit('NORMAL_FAIL', '系统问题请联系管理员');
            }

        },

    }
}