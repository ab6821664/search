import vueRouter from 'vue-router'
import Vue from 'vue';

Vue.use(vueRouter)

const routes = [
    {
        path:'/',
        name:'home',
        component:()=>import('./../view/home.vue')
    }
]

 const router = new vueRouter({
     mode:'hash',
     routes:routes
})

router.afterEach((from,to,next)=>{

})

export default router