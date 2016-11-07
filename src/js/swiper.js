/**
 * Created by zhengpeng on 2016/11/4.
 */
import Vue from 'vue';
import App from './swiper.vue';


$.ajax({
    type: 'get',
    url: '/contract-type-backend/v1/typecontract/contracts',
    contentType:'text/plain',
    success: function(data){
       console.log(data)
    }
})

const app = new Vue({
    ...App
});
app.$mount('#app');