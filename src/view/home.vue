<template>
    <div class="tlbbMain">
           <div class="bannerWrap">
              <div class="banner1" :style="{backgroundImage:'url(' + bannerFeel + ')' }">
                  <p class="tips">
                       免输验证码，一键抢购心仪账号
                  </p>
                  <p class="tips" style="right:450px;top:110px">
                      解放双手
                  </p>
                  <p class="tips" style="right:400px;top:180px">
                      <button>免费体验</button>
                  </p>
              </div>
           </div>
           <div class="buySection">
               <div class="title" title="在输入框输入需要抢购的商品号，点击确认即可自动抢购">
                   公示区秒杀
               </div>
               <div class="shoppingIdWrap">
                     <label>商品号</label><input type="text" v-model="shoppingId" class="shoppingId"></input><button @click="buySubmit">确认抢购</button>
               </div>
               <div>
                   <div style="margin-top: 20px;color:red">
                       {{shoppingMsg.id}}
                   </div>
                   <div>
                       {{shoppingMsg.msg}}<span style="color: red">{{shoppingMsg.time}}</span><span v-show="shoppingMsg.time">将会自动下单</span>
                   </div>
               </div>
               <div style="height: 250px;overflow: scroll">
                   <table class="bugLog">
                       <tr>
                           <td>验证码图片</td>
                           <td>识别结果</td>
                           <td>秒杀日志</td>
                       </tr>
                       <tr v-for="item in bugLog">
                           <td>
                               <img :src="item.img"/>
                           </td>
                           <td>
                               {{item.value}}
                           </td>
                           <td>
                               {{item.result}}
                           </td>
                       </tr>

                   </table>
               </div>

           </div>
    </div>
</template>

<script src="./home.js"></script>


