<template>
    <div class="register">
        <div class="item">
            <label>用户名</label> <input type="text" v-model.trim="user" @focus="userWarn=false"/>
        </div>
        <p v-show="userWarn">用户名不能为空</p>
        <div class="item">
            <label>密码</label> <input type="text" v-model.trim="password" @focus="passwordWarn=false"/>
        </div>
        <p v-show="passwordWarn">密码不能少于6位数</p>
        <div class="item">
            <label>重复密码</label> <input type="text" v-model.trim="repassword" @focus="repasswordWarn=false"/>
        </div>
        <p v-show="repasswordWarn">两次密码不一致</p>
        <p v-show="registerResult">{{registerMsg}}</p>
        <div class="item">
          <button class="mainBtn" @click="register">注册</button>

        </div>
    </div>
</template>

<script>
    import {regist} from './../../api/reptile.js'
    import md5 from 'md5'
    export default {
        name: "register",
        data(){
            return {
                user:'',
                password:'',
                repassword:'',
                userWarn:false,
                passwordWarn:false,
                repasswordWarn:false,
                registerResult:false,
                registerMsg:''
            }
        },
        methods:{
            register(){
               if(this.user.length==0){
                   this.userWarn = true;
                   return
               }
                if(this.password.length<6){
                    this.passwordWarn = true;
                    return
                }
                if(this.password!=this.repassword){
                    this.repasswordWarn = true;
                    return
                }
                regist({user:this.user,password:md5(this.password)}).then(res=>{
                    this.registerResult = true;
                    if(res.data==1){
                        this.registerMsg = '注册成功，2秒后即将跳转首页';
                        localStorage.setItem("user",this.user);
                        this.$store.commit('setUser',this.user)
                        let self = this;
                        setTimeout(function () {
                            self.$router.push('/main/home')
                        },2000)

                    }else {
                        this.registerMsg = '注册失败，用户名已经被占用';
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>