<template>
    <div style="width: 980px;margin: 0 auto">
        <p style="text-align: center;margin: 20px 0">点击下列问题，获取帮助！</p>
        <div v-for="(item,index) in questioanList">
       <p class="question" @click="showAnswer(index)" style="cursor: pointer">
           {{index+1+','}} {{item.question}}
       </p>
        <p class="answer" style="line-height: 30px;text-indent: 20px" v-show="item.answer.show">
            <span v-html="item.answer.text"></span>
            <span v-if="item.answer.img">
                  <br/>

                <img  v-for='val in item.answer.img ' :src="val"/>
            </span>
        </p>
        </div>
    </div>
</template>

<script>
    import chrom from './../../assets/img/chrome.png'
    import fox from './../../assets/img/fox.png'
    export default {
        name: "help",
        data(){
           return{
               questioanList:[
                   {
                       question:'sid是什么，怎么获取？',
                        answer:{
                           show:false,
                            text:'当我们登陆天龙八部畅易阁官方网站后，服务器会返回一个唯一的ID，比如 “6f5a6fa1-43a9-48d5-978a-6e27d8696657”！只要填入这个值就可以用当前登陆的账号去秒杀了，'+
                                 '这个值存储在浏览器的cookie，具体获取方法见下图, 是谷歌浏览器和火狐浏览器的例子，其它浏览器类似操作。登陆后，首先按下<span style="color:red">F12</span>。<br/>',
                            img:[chrom,fox],

                        }
                   },
                   {
                       question:'秒杀后，怎么知道是我下的订单。',
                       answer:{
                           show:false,
                           img:'',
                           text:'当我们设置好浏览器后，就可以开始启动秒杀了，但是之前，我们需要准备sid，与我们所登陆的畅易阁账号唯一对应。'

                       }
                   },
                   {
                       question:'使用这个，一定可以帮助我抢到心仪的账号吗？',
                       answer:{
                           show:false,
                           img:'',
                           text:'很抱歉，目前来说，客观得讲，暂时还是不能保证100%成功率，因为还有其它的一些辅助的存在，或者因为' +
                               '网速，电脑配置等待差异，一秒的下单次数3到10次不等，更多的是运气，如果都使用辅助。但是平均200ms，完成输入验证码' +
                               '，下单，绝对比手速快很多。'
                       }
                   },
                   {
                       question:'我想先体验下，可以吗？',
                       answer:{
                           show:false,
                           img:'',
                           text:'可以的，不需要注册，登录，就可以体验，根据帮助，可以体验免输验证码，下单的全流程了，但是体验不支持公示区抢号，只可以添加交易区的账号。'
                       }
                   },
                   {
                       question:'登录后的题分有什么作用？',
                       answer:{
                           show:false,
                           img:'',
                           text:'记录所消耗的验证码识别数，为零的时候不能使用了，不过基本够用，除非大量共享给其它人使用。'
                       }
                   },
                   {
                       question:'这里提供秒杀功能是免费还是收费的？',
                       answer:{
                           show:false,
                           img:'',
                           text:'由于服务器费用，验证码识别服务费用，目前会象征性收费，相对某宝来说，便宜很多。'
                       }
                   },
                   {
                       question:'目前支持哪些平台抢购网游账号？',
                       answer:{
                           show:false,
                           img:'',
                           text:'目前支持的有：畅易阁新天龙八部'
                       }
                   }



               ]
           }
        },
        methods:{
            showAnswer(index){
                this.questioanList.map(item=>{
                    item.answer.show = false;
                })
                this.questioanList[index].answer.show=true;
            }
        }
    }
</script>

<style scoped>

</style>