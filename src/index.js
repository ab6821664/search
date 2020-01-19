import Vue from 'vue'
import router from './route/router'
import app from './app.vue'
import store from './vuex/vuex'
import './style/index.less'

Vue.component('buttonCounter', {
   data: function () {
      return {
         count: 0
      }
   },
   template: '<h2>888</h2>'
})
Vue.component('blog-post', {
   props: ['title'],
   template: '<div><h3>{{ title }}<slot name="one"></slot></h3><slot name="two"></slot></div>'
})

let testPlugins = function (Vue) {
   Vue.prototype.test = function () {

   }
}
Vue.use(testPlugins)
new Vue({
   store,
   router: router,
   render:h => h(app)
}).$mount('#app')