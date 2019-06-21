// import { skuHandleClose,skuHandleEdit,handleSizeChange,handleCurrentChange } from '@/mutation_types';
// import { get } from '@/utils/request';
// import { URL } from '@/utils/const';
// import { Message } from 'element-ui';
// import { endLoading } from '@/utils/loading';
const state={
    // 全局左侧导航精简与否
    isCollapse:false,
    //切换中英文
    change_zh_en:true,
    //登录,
    // login_true:false,
    //fullscreenLoading  loading 加载中
    // fullscreenLoading:false
}

const mutations={
    //左侧精简显示
    ['change_collapse']:function(state){
        state.isCollapse=!state.isCollapse;
    },
    //改变左侧宽度
    ['change_width']:function(state,is_true){
        state.isCollapse=is_true;
    },
    //切换中英文
    ['setChange_zh_en']:function(state,val){
        state.change_zh_en=val;
    },
    // 登录成功 goOut
    
    // ['login_success']:function(state){
    //     state.login_true=true;
    // },
    ['back_home']:function(state,router){
        router.push('/');
    },
    // 去登陆
    ['goOut']:function(state,router){
        window.location.href='https://passport.yangguangqicai.com/home/LoginOut';
    },
    
}

const actions={
    // ['login_success_actions']:function({commit},loginInfo){
    //     let {  $router } = loginInfo;
    //     console.log($router);
    //     commit('login_success');
    //     $router.push('/');
    // },
    
}

const getters={
    // localJobTitle(state,getters,rootState,rootGetters){
    //     return rootGetters.jobTitle+rootState.job;
    // }
}


export default{
    // namespaced:true,
    state,
    mutations,
    actions,
    getters
}