import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
Vue.use(VueRouter);

//导入全局状态(驱动应用的数据源)
import store from './store/';
//导入路由
import routes from './router';

Vue.config.productionTip = false

// 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});

//路由哨兵
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.getItem("userInfo");
  if (isLogin) {
    next();
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  }
});

//全局实例对象
new Vue({
  router: router,// 把 router 对象提供给 router 选项，这可以把 router 的实例注入所有的子组件
  store: store, // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  render: h => h(App)
}).$mount('#app')
