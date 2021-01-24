<template>
  <div>
    <h2>生成卡密</h2>
    <div>
    <label>卡号</label>
    <input v-model="accound"/>
    </div>
    <div class="days">
     <label>天数</label>
    <input v-model="days"/>
        </div>
        <div class="days">
     <button @click="charge">确认</button>
        </div>
  </div>
  
</template>

<script>
import {recharge} from './../api/service'
export default {
    name:'charge',
    data:function(){
        return {
            accound:'',
            days:1
        }
    },
    methods:{
       charge(){
           recharge({accound:this.accound,days:this.days}).then(res=>{
               let {data} = res
               if(data.success==1){
                   alert('生成卡密成功')
               }
           })
       } 
    }
}
</script>

<style scoped>
    h2{
        text-align: center;
        margin-top:120px
    }
    div{
        text-align: center;
    }
    .days{
        margin-top: 40px;
    }
    .days button{
        width: 150px;
        text-align: center;
        height: 44px;
        background-color: rgb(91, 100, 153);
        color:white;
        font-size:18px
    }
</style>