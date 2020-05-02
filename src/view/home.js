
// import mainHeader from './../components/mainHeader.vue'

import bannerFeel from './../assets/img/bannerFeel.jpg'
import {visitAdd,spend} from   './../api/reptile'
import {getTime,submitBuy} from './../api/service.js'
import qs from 'qs'
import axios from 'axios'
//import Cookies from 'js-cookie'


export default {
    data:function(){
        return {
            bannerFeel:bannerFeel,
            shoppingId:'',  // 商品ID
            shoppingMsg:{
                id:'',
                msg:'',
                time:''
            },
            timesSatus:false,   //  公示区false  购买去 true
            bugLog:[],
            setIntervalBuyTime:'',
            buyTimer:'',
            buyTipsShow:false,
            buyTips:'',
            buyBtnTimer:true,
            sid:'',
            buyLog: '秒杀信息展示：'
        }
    },
    name: "home",
    created() {
        let todayId = sessionStorage.getItem('id')
        if(!todayId){
            visitAdd()
        }
        class baowei{
            constructor(){
                this.name = 'test';
                this.age=18;
            }
            add(){
                this.age++
            }
        }
        let me = new baowei();
        class xudong extends baowei {
            constructor(){
               super()
                let array1 = [1,2,3,3,2,6]
                let array2 = [3,4,9,9,7,1]
                let array3 = [...array1,...array2]
                let deal = new Set(array3)
                let result = [...deal].reduce((pre,next)=>{return pre+next})
                this.result = result;
            }
        }
        console.log(new xudong())
    },
    methods:{
        buySubmit(){
            let self=this;
            this.buyLog='秒杀信息展示：'
            if(this.shoppingId.length<15 ||this.shoppingId.length>22 ){
                this.buyTips = '请输入正确的商品号'
                this.buyTipsShow = true;
                this.shoppingMsg.id =''
                this.shoppingMsg.msg=''
                return
            }
            if(this.sid.length<22 || this.sid.split('-').length!==5 ){
                this.buyTips = '请输入正确的sid'
                this.buyTipsShow = true;
                this.shoppingMsg.msg=''
                return
            }
                getTime(this.shoppingId).then(res=>{
                let result = res.data;
                this.shoppingMsg.id = this.shoppingId;
                this.bugLog=[];
                if(result.expire && result.success){
                    //this_.buy(this_.goods_serial_num,num_detai1.index);
                    this.shoppingMsg.msg = "此商品已经过了公式期，将会自动下单购买此账号.";
                    this.shoppingMsg.time=''
                    let user = localStorage.getItem('user');
                    if(user){
                        this.buy(self.shoppingId,self.sid);
                    }else {
                        let testTime = localStorage.getItem('testTime');
                        if(testTime) testTime=Number(testTime)
                        if(testTime && testTime>6){
                            this.buyTipsShow =true;
                            this.buyTips = '体验次数已经用完！'
                            this.shoppingMsg.id =''
                            this.shoppingMsg.msg=''
                            return;
                        }
                        this.buy(this.shoppingId,this.sid);
                        let saveTime = testTime? ++testTime : 1;
                        localStorage.setItem('testTime',saveTime)
                    }
                }else{
                    if(!result.success){
                        this.buyTipsShow =true;
                        this.buyTips = '请检查商品号是否输入正确'
                        this.shoppingMsg.id =''
                        this.shoppingMsg.msg=''
                        return
                    }
                    let userScore = this.$store.state.score;
                    let userTime = this.$store.state.time;
                    if(userScore<1 || userTime<new Date().getTime()){
                        this.buyTipsShow =true;
                        this.buyTips = '账号未注册或者已经过期'
                        this.shoppingMsg.id =''
                        this.shoppingMsg.msg=''
                        return
                    }
                    var msg=result.msg;
                    var num_detai=new Object();
                    num_detai.detail=msg;
                    var timeMsg=result.time;
                    // alert(timeMsg)
                    var time_day=timeMsg.indexOf("天")>-1?timeMsg.substr(timeMsg.indexOf("天")-2,2)*86400000:0
                    var time_h=timeMsg.indexOf("小时")>-1?timeMsg.substr(timeMsg.indexOf("小时")-2,2)*3600000:0
                    var time_minute=timeMsg.indexOf("分钟")>-1?timeMsg.substr(timeMsg.indexOf("分钟")-2,2)*60000:0
                    var time_seco=timeMsg.indexOf("秒")>-1?timeMsg.substr(timeMsg.indexOf("秒")-2,2)*1000:0
                    var time_=new Date().getTime()+time_day+time_h+time_minute+time_seco;
                    //alert(time_day+'day'+time_h+'h'+time_minute+'m'+time_seco+'s')
                    num_detai.date_target=timeMsg;
                    num_detai.targetTimeTall=time_;
                    this.setIntervalBuyTime = time_
                    this.shoppingMsg.msg = num_detai.detail;
                    this.shoppingMsg.time = num_detai.date_target;
                    if(this.buyTimer) clearInterval(this.buyTimer)
                    self.buyTimer = setInterval(function () {
                            let time = new Date().getTime()+500;
                            if(self.setIntervalBuyTime && time>self.setIntervalBuyTime){
                                console.log('start')
                                self.buy(self.shoppingId,self.sid);
                                clearInterval(self.buyTimer)
                            }
                        },500)
                }
            }).catch(
                error=>{
                    console.log(error)
                    this.buyTipsShow =true;
                    this.buyTips = '网络故障，稍后重试！'
                    this.shoppingMsg.id =''
                    this.shoppingMsg.msg=''
                }
            )
        },
        buy(id,sid){
            let params =  {
                acoundId:id,
                cookId:sid
            }
            submitBuy(params).then(res=>{
                this.buyLog='秒杀信息展示：'+res.data.msg;
                if(localStorage.getItem('user')) spend({user:localStorage.getItem('user'),score:5})
            })
        },
        goHelp(){
            this.$router.push('./help')
        },
        freeTest(){
            alert('阅读帮助，设置好浏览器，即可免费体验！')
        }
    }
}
