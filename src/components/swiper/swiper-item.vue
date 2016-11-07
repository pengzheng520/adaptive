<template>
    <div class="swiper-slide" v-if="zSrc">
        <img class="imgload" :src="zSrc" :alt="zAlt">
    </div>
</template>

<script>
    export default {
        props : ['zSrc','zAlt']
    }
</script>

<style lang="sass">
    @import "../../sass/_mixin.scss";
    html,body{
        width: 100%;
        height: 100%;
    }
    .swiper-container {
        width: 100%;
        height: 100%;
    }
    .swiper-slide{
        width:100%;
        height:100%;
        background: #fff;
    }
    .swiper-slide img{
        display:block;
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
    .swiper-pagination .swiper-pagination-bullet {
        width: px2rem(30px);
        height: px2rem(30px);
        opacity: .4;
    }
</style>