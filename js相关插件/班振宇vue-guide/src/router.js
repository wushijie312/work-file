import Login from "./page/login/Login.vue"; //登录
import Cart from "./page/cart/Cart.vue"; //购物车
import Laboratory from "./page/laboratory/Laboratory.vue"; //实验室
import Goods from "./page/goods/Goods.vue"; //商品列表
import GoodsDetail from "./page/goods/GoodsDetail.vue"; //商品详情
import Me from "./page/me/Me.vue"; //个人中心
import GameRole from "./page/game/GameRole.vue"; //游戏角色详情页
import GameCenter from "./page/game/GameCenter.vue"; //游戏中心
import Axios from "./page/http/Axios.vue"; //HTTP 客户端-axios


// 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '', redirect: '/goods' }, // 当路由为空时重定向到主页
  { path: '/laboratory', component: Laboratory },
  { path: '/login', component: Login },
  { path: '/cart', component: Cart },
  { path: '/me', component: Me },
  { path: '/goods', component: Goods },
  { path: '/goods/detail', component: GoodsDetail },
  { path: '/game/role', component: GameRole },
  { path: '/game/center', component: GameCenter },
  { path: '/http/axios', component: Axios },
];

export default routes;