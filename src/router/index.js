import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/LoginNew.vue'
import HomePage from '../views/HomePage/HomePage.vue'
import UserList from '../views/usersNew/usersNew.vue'
import RoleList from '../views/rolesNew/roleNews.vue'
import RightsList from '../views/rightsNew/RightNew.vue'

Vue.use(VueRouter)
// Vue.use(Login)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/home',
    component: HomePage,
    children: [
      {
        path: '/users',
        component: UserList
      },
      {
        path: '/roles',
        component: RoleList
      },
      {
        path: '/rights',
        component: RightsList
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 导航守卫，是一个拦截器，只要常是改变地址栏发生都会触发这个函数
// router.beforeEach((to, from, next) => {
//   if (to.path === '/') {
//     next()
//   } else {
//     // next()
//     // 没有token，直接跳转到登录界面
//     var userinfo = JSON.parse(localStorage.getItem('userinfo'))
//     if (!userinfo) {
//       // this.$router.push('/')
//       next('/')
//     } else {
//       next()
//     }
//   }
// })
router.beforeEach((to, from, next) => {
  // 如果你访问的是登录页面，直接放行，允许跳转
  if (to.path === '/') {
    next()
  } else {
    // 没有token ， 直接跳转到登录界面
    var userinfo = JSON.parse(localStorage.getItem('userinfo'))
    if (!userinfo) {
      next('/')
    } else {
      // 有token，直接放行
      next()
    }
  }
})

export default router
