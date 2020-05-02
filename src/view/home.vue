<template>
    <div class="tlbbMain">
           <div class="bannerWrap">
              <div class="banner1" >
                  <h2>使用说明<span style="display: inline-block;font-size: 16px;margin-left: 15px">--速度超乎你的想象</span></h2>
                  <p>
                      1:天龙八部畅易阁商品在公示期内无法下单，公示期结束的时间不固定，刷新网页会有2秒左右的随机偏移。
                  </p>
                  <p>
                      2:识别验证码，执行勾选购买操作，一共耗时200毫秒左右，远超手动，
                  </p>
                  <p>
                      3:公示期结束前2秒，就会开始反复执行购买操作，直到抢购成功或者失败。
                  </p>
                  <p>
                      4:如果失败，请查看账号名下是否已经有未付款账号，或者账号被锁定，或者其它。
                  </p>
                  <p>
                      5:游客可以不登录，即可<span style="color: red">体验</span>账号抢购功能，只要输入正确的sid和商品号，仅限<span style="color: red">交易区</span>！
                  </p>
              </div>
           </div>
           <div class="buySection">
               <div class="title" title="在输入框输入需要抢购的商品号，点击确认即可自动抢购">
                   公示区秒杀
               </div>
               <div class="shoppingIdWrap">
                   <div>
                   <label >天龙账号sid</label>
                       <input type="text" title="sid的有效期为半小时" placeholder='请输入畅易阁登录的天龙账号对应的sid' v-model.trim="sid" @focus="buyTipsShow=false" class="shoppingId"></input>
                       <span style="color: #4b54ff;cursor: pointer" title="sid怎么得到，点击获取帮助" @click="goHelp">怎么获取sid？</span>
                   </div>
                   <div style="margin-top: 30px">
                     <label style="padding-right: 44px">商品号</label><input type="text" placeholder="请输入需要抢购的角色的商品号" v-model.trim="shoppingId" @focus="buyTipsShow=false" class="shoppingId"></input><button @click="buySubmit">确认抢购</button>
                   </div>
                     <p style="color:red;font-size: 14px" v-if="buyTipsShow">{{buyTips}}</p>
               </div>
               <div v-show="!buyTipsShow">
                   <div style="margin-top: 20px;color:red">
                       {{shoppingMsg.id}}
                   </div>
                   <div>
                       {{shoppingMsg.msg}}<span style="color: red">{{shoppingMsg.time}}</span><span v-show="shoppingMsg.time">，时间到了后将会自动下单，抢购成功后，将会在你输入的sid对应的登录畅易阁的天龙账号名下！</span>
                   </div>
               </div>
               <div style="height: 250px;overflow: scroll">
                   <table class="bugLog">
                       <tr>

                           <td style="padding: 10px 5px">秒杀日志</td>
                       </tr>
                       <tr>
                           <td style="border-top:solid 1px #4b54ff;padding: 10px 5px;text-align: left">
                               {{buyLog}}
                           </td>
                       </tr>

                   </table>
               </div>

           </div>
           <div style="width: 100%;text-align:center;margin: 40px 0">
               备案号：<a href="http://beian.miit.gov.cn/" style="color: grey;display: inline-block;margin: 0 auto">湘ICP备17018348号</a>
           </div>
    </div>
</template>

<script src="./home.js"></script>


