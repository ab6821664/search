<template>
    <div>
        <mainHeader></mainHeader>
        首页11
        <img :src="logo" style="width: 200px">
        <blog-post title="Why Vue is so fun"><template v-slot:one>77</template><template v-slot:two>qq</template></blog-post>
        <p id="demo">点击这个按钮，获得您的坐标：</p>
        <button @click="getLocation">试一下</button>
    </div>
</template>


<script>
  // import mainHeader from './../components/mainHeader.vue'
  import mainHeader from 'components/mainHeader'
 // import logo from './../assets/img/logo.png'


    export default {
       data:function(){
         return {
             logo:logo
         }
       },
        name: "home",
        components:{
            mainHeader,
        },
        created() {
            this.test()
            this.$store.commit('priceHigh',{price:100})
        },
        methods:{
     getLocation:function(){
      let x=document.getElementById("demo");
      if (navigator.geolocation)
      {
          navigator.geolocation.getCurrentPosition(this.showPosition);
      }
      else{x.innerHTML="Geolocation is not supported by this browser.";}
     },
     showPosition:function(position)
      {
      x.innerHTML="Latitude: " + position.coords.latitude +
          "<br />Longitude: " + position.coords.longitude;
       }
        }
    }
</script>

<style scoped>

</style>