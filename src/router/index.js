import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/run',
    },
    {
      path: '/test',
      component: (resolve) => {
        require(['../components/Test'], resolve)
      }
    },
    {
      path: '/run',
      name: 'run',
      component: (resolve) => {
        require(['../components/Run'], resolve)
      }
    },
    {
      path: '/equipment',
      name: 'Equipment',
      component: (resolve) => {
        require(['../components/Equipment'], resolve)
      }
    },
    {
      path: '/performance',
      name: 'Performance',
      component: (resolve) => {
        require(['../components/Performance'], resolve)
      }
    },

    ]
})

// 需要登录才能进入的页面可以增加一个meta属性
// meta: {
//     requireAuth: true
// },

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 判断是否需要登录权限
    if (localStorage.getItem('Ticket')) {
      // 判断是否登录
      next()
    } else {
      // 没登录则跳转到登录界面
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router
