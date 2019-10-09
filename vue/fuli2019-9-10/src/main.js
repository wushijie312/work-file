import Vue from 'vue'
import App from './App.vue'
import store  from './store'
import router from './router'
// ui组件start
import {Button,Skeleton,Alert} from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
Vue.config.productionTip = false
Vue.component(Button.name, Button);
// console.log(Skeleton.name);
Vue.component(Skeleton.name, Skeleton);
Vue.component(Alert.name, Alert);
//ui 组件end


//图片延迟加载 start
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('@/assets/img/loading_error.png'),   //请求失败后显示的图片
  loading: require('@/assets/img/loading.gif'),   //加载的loading过渡图片
  attempt: 1     // 加载图片数量
})
//图片延迟加载 end

//公共样式
import './assets/css/reset.css'
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
