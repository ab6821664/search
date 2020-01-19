import vuex from 'vuex'
import Vue from 'vue'
Vue.use(vuex)

const state = {
     mode:'fast',
     price:8000
}

const mutations = {
    priceHigh:function (state,params) {
        state.price = state.price+params.price
        console.log(state.price)
    }
}

 const store = new vuex.Store({
   state:state,
     mutations,
 })



export default store