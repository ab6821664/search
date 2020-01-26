import vueRouter from 'vue-router'
import Vue from 'vue';

Vue.use(vueRouter)

const routes = [
    {
        path:'/',
        redirect:'/main/home',
        name:'index',
    },
    {
        path:'/main',
        name:'main',
        component:()=>import('./../view/main/main.vue'),
        children:[
            {
                path:'home',
                name:'home',
                component:()=>import('./../view/home.vue'),
            },
            {
                path:'register',
                name:'register',
                component:()=>import('./../view/register/register.vue'),
            },
            {
                path:'login',
                name:'login',
                component:()=>import('./../view/login/login.vue'),
            },
            {
                path:'pay',
                name:'pay',
                component:()=>import('./../view/pay/pay.vue'),
            },
            {
                path:'help',
                name:'help',
                component:()=>import('./../view/help/help.vue'),
            },
        ]
    }
]

 const router = new vueRouter({
     mode:'hash',
     routes:routes
})

router.afterEach((from,to,next)=>{

})

export default router