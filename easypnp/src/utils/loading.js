// import axios from 'axios';

import { Loading } from 'element-ui';

// import Cookies from 'js-cookie';

// import router from '@/router/index'

let loading        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}
export {startLoading,endLoading}