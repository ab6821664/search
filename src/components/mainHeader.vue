<template>
    <div class="mainHeader">
       <div class="menuWrap">
           <div class="leftMenu">
               <div @click="home">首页</div>
           </div>
           <div class="rightMenu">
                <div @click="help">帮助</div>
                <div @click="login">{{user?'个人中心':'登录'}}</div>
                 <div @click="register">注册</div>
           </div>
       </div>
    </div>
</template>

<script>
    import {queryUser} from './../api/reptile.js'
    export default {
        name: "mainHeader",
        data(){
          return{
              user:''
          }
        },
        methods:{
            register(){
                this.$router.push('/main/register')
            },
            login(){
                this.$router.push('/main/login')
            },
            home(){
                this.$router.push('/main/home')
            },
            help(){
                this.$router.push('/main/help')
            }
        },
        created(){
           this.user = localStorage.getItem('user');
           if(this.user){
               queryUser({user:this.user}).then(res=>{
                   let data =res.data[0];
                   this.$store.commit('setUser',data.user)
                   this.$store.commit('setScore',data.score)
                   this.$store.commit('setUser',data.user)
               })
           }
        }
    }
</script>

<style scoped>

</style>