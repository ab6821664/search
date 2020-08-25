<template>
    <div class="register">
        <div v-if="!loginUser">
        <div class="item">
            <label>用户名</label> <input type="text" v-model.trim="user" @focus="errorLogin=false"/>
        </div>
        <div class="item">
            <label>密码</label> <input type="text" v-model.trim="password" @focus="errorLogin=false"/>
        </div>
            <div class="item" v-show="errorLogin" style="color: red">
                <p>登录失败，账号或者密码错误</p>
            </div>
        <div class="item">
            <button class="mainBtn" @click="submit">登录</button>
        </div>
        </div>
        <div v-if="loginUser">
            <div class="item">
                <span style="display: inline-block;width: 160px;text-align: left">用户名:</span> <span>{{loginUser}}</span>
            </div>
            <div class="item">
                <span style="display: inline-block;width: 160px;text-align: left">题分:</span> <span>{{score}}</span>
            </div>
            <div class="item">
            <span style="display: inline-block;width: 160px;text-align: left">到期时间:</span> <span>{{time | date}}</span>
            </div>
            <div class="item">
                <span style="display: inline-block;width: 160px;text-align: left">卡密:</span> <span><input v-model="passCard" @focus="chargeMsgShow=false" placeholder="微信13715549992购卡或者自助购卡"/></span>
            </div>
            <div class="item"  style="color: red">
                <p v-show="chargeMsgShow">{{chargeMsg}}</p>
            </div>
            <div style="margin-top: 40px;display: flex;justify-content: space-around">
                <button class="plainBtn" @click="layout">退出登录</button>
                <button class="plainBtn" @click="toBuy">自助购卡</button>
                <button class="plainBtn" @click="charge">充值</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {login} from './../../api/reptile'
    import {queryUser} from './../../api/reptile'
    import {recharge} from './../../api/service'
    import md5 from 'md5'
    export default {
        name: "login",
        data(){
            return{
                user:'',
                password:'',
                passCard:'',
                loginUser:'',
                errorLogin:false,
                chargeMsgShow:false,
                chargeMsg:''
            }

        },
        computed:{
            score(){
                return this.$store.state.score
            },
            time(){
                return this.$store.state.time
            },
        },
        created(){
            this.loginUser = localStorage.getItem('user')
            if(this.loginUser){
                this.query(this.loginUser)
            }
        },
        filters:{
            date(value){
                if(value==0){
                    return '未充值'
                }else {
                    let time= new Date(value);
                    let year = time.getFullYear();
                    let month = time.getMonth()+1;
                    let day = time.getDate();
                    let h = time.getHours();
                    let m= time.getMinutes();
                    let s = time.getSeconds();
                    return year+"-"+month+"-"+day+" "+h+":"+m+":"+s
                }
            }
        },
        methods:{
            submit(){
                login({user:this.user,password:md5(this.password)}).then(res=>{
                    if(res.data==1){
                        localStorage.setItem('user',this.user)
                        this.loginUser=this.user
                        this.query(this.user)
                    }else {
                        this.errorLogin=true;
                    }
                })
            },
            query(user){
                queryUser({user:user}).then(res=>{
                    let data =res.data[0];
                    this.$store.commit('setScore',data.score)
                    this.$store.commit('setTime',data.time)
                    this.$store.commit('setUser',data.user)
                })
            },
            layout(){
                localStorage.removeItem('user');
                this.loginUser = '';
                this.$store.commit('setScore','')
                this.$store.commit('setTime',0)
                this.$store.commit('setUser',0)
            },
            charge(){
                if(this.passCard.length==0){
                    this.chargeMsg = '卡密不能为空';
                    this.chargeMsgShow = true;
                    return
                }
                recharge({id:this.passCard,type:new Date().getTime(),used:this.loginUser}).then(res=> {
                    this.chargeMsg = res.data;
                    this.chargeMsgShow = true;
                    if('充值成功'==res.data){
                        this.query(this.loginUser);
                    }
                })
            },
            toBuy(){
                this.$router.push('/main/pay')
            }
        }
    }
</script>

<style scoped>

</style>