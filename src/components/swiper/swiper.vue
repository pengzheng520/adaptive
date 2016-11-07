<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from './swiper-3.3.1.min.js';
    export default {
        components: {},
        mounted () {
            var mySwiper = new Swiper('.swiper-container', {
                direction : 'vertical',
                loop: true,
                pagination: '.swiper-pagination',
                paginationClickable :true
            });
        }
    }
</script>
<style>
    @import "swiper-3.3.1.min.css";
</style>
