import Vue from 'vue'
import App from './App'
import router from './router'
// add start
   //状态管理
import store from './store/store'
   //多语言
   import i18n from '@/assets/lang/i18n'
   //第三方组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
    //数据请求
    import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);
    //美化页面
// import NormailizeCss from 'normalize.css'
// import 'vue-awesome/icons'
// import Icon from 'vue-awesome/components/Icon'
import 'font-awesome/css/font-awesome.css'
import './assets/css/reset.css'
// Vue.component('icon', Icon)
  //charts地图插件
import VCharts from 'v-charts'
Vue.use(VCharts)
// add end

// 获取cookie start
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
// 获取cookie end

// 图片放大插件 start
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
// 图片放大插件 end

Vue.config.productionTip = false

window.vm=new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
