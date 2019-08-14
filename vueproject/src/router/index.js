import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/login'
import User from '@/components/users'
import Test from '@/components/test'
import Roles from '@/components/roles'
import Rights from '@/components/rights'
import Goods from '@/components/goods'
import {Message} from 'element-ui'
Vue.use(VueRouter)
const router = new VueRouter({
  // mode:'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login },
    { 
      path: '/home', component: Home, 
      children:[
        {path:'/users',component:User},
        {path:'/test',component:Test},
        {path:'/roles',component:Roles},
        {path:'/rights',component:Rights},
        {path:'/goods',component:Goods},

      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    var token = window.localStorage.getItem('token')
    
    if (!token) {
      
      router.push('/login')
      Message({
        message:'请先进行登录操作',
        type:'warning'
      })
    } else {
      next()
    }
  }else{
    next()
  }
  
  

})
export default router