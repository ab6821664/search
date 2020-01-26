
// import mainHeader from './../components/mainHeader.vue'

import bannerFeel from './../assets/img/bannerFeel.jpg'
import {visitAdd} from   './../api/reptile'
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
            buyTimer:''
        }
    },
    name: "home",
    components:{

    },
    created() {
        let todayId = sessionStorage.getItem('id')
        if(!todayId){
            visitAdd()
        }
    },
    methods:{
        buySubmit(){
            let self=this;
            axios.get('http://tl.cyg.changyou.com/goods/char_detail?serial_num='+this.shoppingId+'&t='+new Date().getTime()).then(res=>{
                let result = res.data;
                this.shoppingMsg.id = this.shoppingId;
                if(result.indexOf("立即购买")>-1){
                    //this_.buy(this_.goods_serial_num,num_detai1.index);
                    this.shoppingMsg.msg = "此商品已经过了公式期，将会自动下单购买此账号.";
                    this.shoppingMsg.time=''
                    this.buy(this.shoppingId)
                }else{
                    var start=result.indexOf("weiboText:");
                    var over=result.indexOf("bdComment:");
                    var msg=result.substring(start+11,over);
                    var num_detai=new Object();
                    num_detai.detail=msg;
                    var time=result.indexOf("剩余时间");
                    var timeMsg=result.substr(time,520);
                    // alert(timeMsg)
                    var time_day=timeMsg.indexOf("天")>-1?timeMsg.substr(timeMsg.indexOf("天")-2,2)*86400000:0
                    var time_h=timeMsg.indexOf("小时")>-1?timeMsg.substr(timeMsg.indexOf("小时")-2,2)*3600000:0
                    var time_minute=timeMsg.indexOf("分钟")>-1?timeMsg.substr(timeMsg.indexOf("分钟")-2,2)*60000:0
                    var time_seco=timeMsg.indexOf("秒")>-1?timeMsg.substr(timeMsg.indexOf("秒")-2,2)*1000:0
                    var time_=new Date().getTime()+time_day+time_h+time_minute+time_seco;
                    //alert(time_day+'day'+time_h+'h'+time_minute+'m'+time_seco+'s')
                    var targetTime=new Date(time_);
                    num_detai.date_target=(targetTime.getMonth()+1)+'月'+targetTime.getDate()+"日"+targetTime.getHours()+"时"+targetTime.getMinutes()+"分"+targetTime.getSeconds()+"秒";
                    num_detai.targetTimeTall=time_;
                    this.setIntervalBuyTime = time_
                    this.shoppingMsg.msg = num_detai.detail;
                    this.shoppingMsg.time = num_detai.date_target;
                    if(this.buyTimer) clearInterval(this.buyTimer)
                    self.buyTimer = setInterval(function () {
                            let time = new Date().getTime()+500;
                            if(self.setIntervalBuyTime && time>self.setIntervalBuyTime){
                                console.log('启动')
                                self.buy(self.shoppingMsg.id);
                                clearInterval(self.buyTimer)
                            }
                        },500)
                }
            })
        },
        buy(num) {
            let item = {};
            let self = this
            // 获取图片base64
            function identify(num){
                //这是网上的一张图片链接
                var url="http://tl.cyg.changyou.com/transaction/captcha-image?goods_serial_num="+num+"&t="+(new Date().getTime());
                getBase64(url)
            }
            // 获取图片base64
            function getBase64(img){
                function getBase64Image(img,width,height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
                    var canvas = document.createElement("canvas");
                    canvas.width = width ? width : img.width;
                    canvas.height = height ? height : img.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    var dataURL = canvas.toDataURL();
                    item.img =  dataURL;
                    var dataURL_make=dataURL.substring(dataURL.indexOf(",")+1)
                    get_pass(dataURL_make);
                    return dataURL_make;
                }
                let image = new Image();
                image.crossOrigin = '';
                image.src = img;
                if(img){
                    image.onload =function (){
                        getBase64Image(image);//将base64传给done上传处理
                    }
                }
            }
            function get_pass(data) {
                axios.post(
                    "http://upload.chaojiying.net/Upload/Processing.php",
                    {
                        user:"a6821664",
                        pass2:"0c5ac1ca87c8a2d0c13afc632fa7ecb4",
                        softid:"898621",
                        codetype:"1902",
                        file_base64:data
                    },{

                    }
                ).then(function (res) {
                    var value=res.data.pic_str;
                    item.value = value;
                    sec_buy(value)
                }).catch(function (error) {
                    console.log(error)
                    identify(num);
                })
            }
            function sec_buy(value){
               axios.post('http://tl.cyg.changyou.com/transaction/buy',qs.stringify({"goods_serial_num":num,"captcha_code":value}),{
                   headers:{
                       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                   }
               }).then(res=>{
                   let result= res.data;
                   console.log(result)
                   if(result.indexOf('success')>-1){
                       item.result = '抢购成功，请自行支付。'
                       self.bugLog.push(JSON.parse(JSON.stringify(item)))
                   }else {
                       if(result.indexOf('captcha_error')>-1){
                           item.result = '账号未放出'
                           self.bugLog.push(JSON.parse(JSON.stringify(item)))
                           identify(num);
                       }else {
                           item.result = result;
                           self.bugLog.push(JSON.parse(JSON.stringify(item)))
                       }
                   }
               })
            }
            identify(num);
        }
    }
}
