import vuex from 'vuex'
import Vue from 'vue'
Vue.use(vuex)

const state = {
     score:0,
     user:'',
     time:0,
}

const mutations = {
    setScore (state, score) {
        console.log('rrrr',score)
        state.score =score
    },
    setTime:function (state,time) {
        state.time = time
    },
    setUser:function (state,user) {
        state.user = user;
    }
}

 const store = new vuex.Store({
   state:state,
     mutations,
 })



export default store