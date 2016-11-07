<template>
    <div style="position: relative;width: 100%;height: 100%;">
        <z-love z-audio-url="../static/video/yezi.mp3"
                :z-img="['http://img15.3lian.com/2015/f2/50/d/71.jpg','http://img15.3lian.com/2015/f2/50/d/77.jpg']"></z-love>
    </div>
</template>
<script>
    import ZLove from '../components/love/love.vue';
    export default{
        components:{
            'z-love': ZLove
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