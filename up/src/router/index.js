import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/error'
        },
        {
            path: '/register',
            component: () => import('../components/register.vue'),
            name: 'register'
        },
        {
            path: '/error',
            component: () => import('../components/error.vue'),
            name: 'error'
        },
        {
            path: '/login',
            // redirect: '/',
            component: () => import('../components/login.vue'),
            name: 'login'
        },
        {
            path: "/index",
            component: () => import('../components/index.vue'), // 改为懒加载
            name: 'index',
            redirect: '/index/main',
            children: [
                {
                    path: 'main',
                    component: () => import('../components/main.vue'), // 改为懒加载
                    name: 'main'
                },
                {
                    path: 'weather',
                    component: () => import('../components/weather.vue'), // 改为懒加载
                    name: 'weather'
                }
            ]
        }
    ]
})
// router/index.js
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next();
  }
  
  // 检查 localStorage
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  
  // 增加实际的值检查
  if (username === 'admin' && password === '123456') {
    next();
  } else {
    next('/login');
  }
});
export default router