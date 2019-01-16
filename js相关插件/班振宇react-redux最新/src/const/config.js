const RELEASE_DOMAIN = 'http://www.xxx.com/cn/' //生产环境主机地址
const DEV_DOMAIN = 'http://127.0.0.1:7001/'     //测试环境主机地址

//当前主机地址
const domain = process.env.NODE_ENV === 'production' ? RELEASE_DOMAIN : DEV_DOMAIN;
exports.URL = {

    //用户登录
    USER_LOGIN:`${domain}user/login?`,

    //用户登录
    USER_LOGOUT:`${domain}user/logout?`,

    //新增用户
    USER_ADD:`${domain}user/add?`,

    //编辑用户信息
    USER_EDIT:`${domain}user/edit?`,

    //删除用户
    USER_REMOVE:`${domain}user/remove?`,

    //用户列表
    USER_ALL:`${domain}user/all?`,

    //任务列表
    QUEUE_LIST:`${domain}queue/list?`,

    //移除任务
    QUEUE_REMOVE:`${domain}queue/remove?`,

    //重新入列任务
    QUEUE_ENQUEUE:`${domain}queue/enqueue?`,

    //全部重新入列
    QUEUE_ENQUEUE_ALL:`${domain}queue/enqueueAll?`,

    //登录失效测试
    USER_TEST: `${domain}user/test?`,
    
}