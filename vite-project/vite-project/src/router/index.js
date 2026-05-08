import { createRouter,createWebHistory} from 'vue-router'
const router = createRouter({
    history:createWebHistory(),
    routes:[
    {
        path:'/',
        redirect:'/login'
    }
        ,{
            path:'/login',
            component:()=>import('../components/login.vue'),
            name:'login'
        },
        {
            path:'/register',
            component:()=>import('../components/register.vue'),
            name:'register'
        },
        {
            path:'/index',
            component:()=>import('../components/index.vue'),
            name:'index',
            children:[
                {
                    path:'home',
                    component:()=>import('../components/home.vue'),
                },
                {
                    path:'about',
                    component:()=>import('../components/about.vue'),
                },
                {
                    path:'user',
                    component:()=>import('../components/user.vue'),
                }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    const whiteList = ['/login', '/register']
    if (whiteList.includes(to.path)) {
        next()
    } else {
        let token = localStorage.getItem('user') 
        if (token && token !== '') {
            next()
        } else {
            next('/login')
        }
    }
})

export default router