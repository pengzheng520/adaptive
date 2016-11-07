<template>
    <div style="position: relative;width: 100%;height: 100%;">
      <z-swiper>
          <z-swiper-item z-src="../static/images/1.png"></z-swiper-item>
          <z-swiper-item z-src="../static/images/2.png"></z-swiper-item>
          <z-swiper-item z-src="../static/images/3.png"></z-swiper-item>
          <z-swiper-item z-src="../static/images/4.png"></z-swiper-item>
      </z-swiper>
    </div>
</template>
<script>
    import {Swiper,SwiperItem} from '../components/swiper';
    export default{
        components:{
            'z-swiper' : Swiper,
            'z-swiper-item' : SwiperItem

        },
        data(){
            return{
                msg:'this is demo'
            }
        }
    }
</script>
<style lang="sass">
    @import "../sass/_mixin.scss";
    @import "../sass/_reset.scss";
    .demo {
        width: px2rem(120px);
        height: px2rem(120px);
        background: red;
        @include font-dpr(32px);
    }
</style>