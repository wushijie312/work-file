import Vue from 'vue';
import Router from 'vue-router';
// import Login from '@/page/Login';
// import Home from '@/page/Home';
// import Index from '@/page/Index';
// import BasicContainer from '@/page/BasicContainer';
// import GoodsList from '@/page/GoodsList';
// import FormCheckbox from '@/page/FormCheckbox';
// import FormRadio from '@/page/FormRadio';
// import SetUp from '@/page/SetUp';
// import ThemeColor from '@/page/ThemeColor';
// import Language from '@/page/Language';
// const Login = () => import('@/page/Login')
const Home = () => import('@/page/Home')
const Index = () => import('@/page/Index')
const BasicContainer = () => import('@/page/BasicContainer')
const GoodsList = () => import('@/page/GoodsList')
const FormCheckbox = () => import('@/page/FormCheckbox')
const FormRadio = () => import('@/page/FormRadio')
const SetUp = () => import('@/page/SetUp')
const ThemeColor = () => import('@/page/ThemeColor')
const Language = () => import('@/page/Language')
Vue.use(Router);
var routes=[

    {
        path:'/',
        component:Home,
        children:[
            {
                path:'/',
                component:Index
            },
            {
                path:'index',
                component:Index
            },
            {
                path:'/formradio',
                component:FormRadio
            }
            ,
            {
                path:'/formcheckbox',
                component:FormCheckbox
            }
            ,
            {
                path:'/goodslist',
                name:'goodslist',
                component:GoodsList
            }
            ,
            {
                path:'/basicontainer',
                component:BasicContainer
            }
        ]
    },
    {
        path:'/setup',
        component:SetUp,
        children:[
            {
                path:'/',
                component:Language
            },
            {
                path:'language',
                component:Language
            },
            {
                path:'themecolor',
                component:ThemeColor
            },
        ]
    },
    
   
];
const routers=new Router({
    mode:'hash',
    routes:routes
});

//路由哨兵班振宇的
// router.beforeEach((to, from, next) => {
//     const isLogin = !!localStorage.getItem("userInfo");
//     if (isLogin) {
//       next();
//     } else {
//       if (to.path === '/login') {
//         next();
//       } else {
//         next('/login');
//       }
//     }
//   });

// //网上 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// routers.beforeEach((to, from, next) => {
// //   if (to.path === '/login') {
// //     next();
// //   } else {
//     let token = localStorage.getItem('token');
 
//     if (token === 'null' || token === '') {
//       next('/login');
//     } else {
//       next();
//     }
// //   }
// });

export default routers;