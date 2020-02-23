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
                <img :src="item.answer.img"/>
            </span>
        </p>
        </div>
    </div>
</template>

<script>
    import chrom from './../../assets/img/setChrom.png'
    export default {
        name: "help",
        data(){
           return{
               questioanList:[
                   {
                       question:'秒杀前，需要做哪些准备工作呢? 必看！',
                        answer:{
                           show:false,
                            img:chrom,
                            text:'第一步，如果没有安装谷歌浏览器，我们需要先下载，官方下载链接为<a href="https://www.google.cn/chrome/" target="_blank">https://www.google.cn/chrome/</a></br>' +
                                '第二步，下载安装后，我们在C盘新建文件夹，命名为temp，并且复制 <span style="color:red">--disable-web-security --user-data-dir=C:\\temp</span> 这行，右击浏览器图标-选择属性- ' +
                                '快捷方式-目标，在目标这行末尾（原本有的不要动），添加空格，然后粘贴刚刚复制的，就设置完成了，如下图。'
                        }
                   },
                   {
                       question:'秒杀后，怎么知道是我下的订单。',
                       answer:{
                           show:false,
                           img:'',
                           text:'当我们设置好浏览器后，就可以开始启动秒杀了，但是之前，我们需要在浏览器的同一个窗口打开另外一个页签，打开畅易阁' +
                               '登录我们的账号，所登录的账号，即是我们下订单的账号。'

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
                           text:'可以的，不需要注册，登录，就可以体验，根据帮助，设置好谷歌浏览器，就可以体验免输验证码，下单的全流程了，但是体验不支持公示区抢号，只可以添加过了公示区的账号。'
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