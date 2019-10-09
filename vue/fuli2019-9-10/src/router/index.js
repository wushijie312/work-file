import Vue from 'vue'
import Router from 'vue-router'
// import Register from '@/pages/register/register'
// import Pic from '@/pages/pic/pic'
// import Zujian from '@/pages/zujian/zujian'
const Register = () => import('@/pages/register/register')
const Pic = () => import('@/pages/pic/pic')
const Zujian = () => import('@/pages/zujian/zujian')
const Home = () => import('@/pages/home/home')
const Hunru = () => import('@/pages/hunru/hunru')

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'register',
            component: Register
        },{
            path: '/pic',
            name: 'pic',
            component: Pic
        },
        {
            path: '/zujian',
            name: 'zujian',
            component: Zujian
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/hunru',
            component: Hunru
        }
    ]
})
