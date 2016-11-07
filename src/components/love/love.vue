<template>
    <div class="z-canvas">
        <audio v-if="zAudioUrl" id="myAudio" autoplay preload controls loop>
            <source :src="zAudioUrl" type="audio/mpeg">
        </audio>
        <div v-show="imgOne" id="imgOne">
            <img :src="zImg[0]"/>
        </div>
        <div v-show="imgTwo" id="imgTwo">
            <img :src="zImg[1]"/>
        </div>
        <canvas id="canvas" width="1170" height="520"></canvas>
        <canvas id="canvas1" width="1170" height="520"></canvas>
    </div>
</template>

<script>
    export default{
        data () {
            return {
                imgOne: false,
                imgTwo: false
            }
        },
        props: {
            zAudioUrl: {
                default: function () {
                    return  false ;
                }
            },
            zImg: {
                type: Array,
                default: function () {
                    return {};
                }
                //没查出来这个属性的意义
                /* validator : function(value){
                 var dataImg = { },
                 imgName = ['imgOne','imgTwo'];
                 for(let i in value){
                 dataImg[imgName[i]] = value[i];
                 }
                 return dataImg
                 }*/
            }
        },
        //挂载到实例上去之后调用该钩子
        mounted (){
            this.heartCanvas();
            this.pointCanvas();
            this.windowOnResize();
            this.windowOnResize();
            window.onresize=function(){
                this.windowOnResize();
            }.bind(this)
        },
        //methods 将被混入到 Vue 实例中
        methods: {
            //窗口大小改变
            windowOnResize : function(){
                let  $zCanvas = $(".z-canvas");
                var radio =  $zCanvas.parent().width()/1170;
                $zCanvas.css('transform','scale('+radio+')')
            },

            heartCanvas: function () {
                var _this = this;

                //获取canvas元素
                var canvas = document.getElementById('canvas');
                //获取到canvas中的绘图环境
                var ctx = canvas.getContext('2d');

                var radian = Math.PI,                          //画小实心的圆的起始位置
                        ra = 2*Math.PI,                        //第一个大心的起始位置
                        ra2 = Math.PI,                         //第二个大心的起始位置
                        heartNum = 77,                         //一个大心画多个小心
                        radianDecrement = Math.PI / 180,       //小心的弧度
                        raDecrement = Math.PI / heartNum * 2,  //大心的弧度
                        r = 1,                                 //小心半经
                        i = 0,                                 // 第一个心执行次数
                        ii = 0,                                // 第二个心执行次数
                        xx, yy;                                // 画心坐标

                var setTime = setInterval(function () {

                    if (i < heartNum) {
                        xx = getrX(300, ra);
                        yy = getrY(300, ra);
                        ra += raDecrement;
                        drawHeart(xx, yy);
                    }
                    i++;
                    if (i > heartNum) {
                        window.clearInterval(setTime);
                        _this.imgOne = true;
                        var setTime1 = setInterval(function () {
                            if (ii < heartNum) {
                                xx = getrX(560, ra2);
                                yy = getrY(200, ra2);
                                ra2 += raDecrement;
                                drawHeart(xx, yy);
                            }
                            ii++;
                            if (ii > heartNum) {
                                window.clearInterval(setTime1);
                                _this.imgTwo = true;
                            }
                        }, 100);
                    }
                }, 100);

                //生成随机颜色值
                function getRandomColor() {
                    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
                }

                //实心
                function drawHeart(x, y) {
                    ctx.beginPath();
                    ctx.fillStyle = getRandomColor();
                    ctx.moveTo(getX(x, radian), getY(y, radian));
                    for (var i = 0; i < 360; i++) {
                        radian += radianDecrement;
                        ctx.lineTo(getX(x, radian), getY(y, radian));
                    }
                    ctx.fill();
                }

                //由弧度得到 X 坐标
                function getX(x, t) {
                    return x + r * (16 * Math.pow(Math.sin(t), 3));
                }

                //由弧度得到 Y 坐标
                function getY(y, t) {
                    return y - r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                }

                //由弧度得到 X 坐标
                function getrX(x, t) {
                    return x + 12 * (16 * Math.pow(Math.sin(t), 3));
                }

                //由弧度得到 Y 坐标
                function getrY(y, t) {
                    return y - 12 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                }

            },
            pointCanvas: function () {
                //获取canvas元素
                var canvas1 = document.getElementById('canvas1');
                //获取到canvas中的绘图环境
                var ctx1 = canvas1.getContext('2d');
                let circles = [];
                //生成2000个点
                for (var x = 0; x < 2000; x++) {
                    var c = new Circle();
                    circles.push(c);
                }

                //无限重画
                animate();
                function animate() {
                    ctx1.clearRect(0, 0, 1170, 520);
                    for (var i in circles) {
                        circles[i].draw();
                    }
                    requestAnimationFrame(animate);
                }

                //生成圆
                function Circle() {
                    var _this = this;
                    // constructor
                    (function () {
                        _this.pos = {};
                        init();
                    })();
                    function init() {
                        _this.pos.x = Math.random() * 1170;
                        _this.pos.y = 520 + Math.random() * 100;
                        _this.alpha = 0.1 + Math.random() * 0.3;
                        _this.scale = 0.1 + Math.random() * 0.3;
                        _this.velocity = Math.random();
                    }

                    this.draw = function () {
                        if (_this.alpha <= 0) {
                            init();
                        }
                        _this.pos.y -= _this.velocity;
                        _this.alpha -= 0.0005;
                        ctx1.beginPath();
                        ctx1.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
                        ctx1.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
                        ctx1.fill();
                    };
                }
            }
        }
//      也没看出来这个函数的意义
//      ready () {
//          console.log('zImg')
//      }
    }
</script>

<style>
    .z-canvas {
        position: absolute;
        width: 1170px;
        height: 520px;
        left: 0;
        top: 0;
        background: rgba(255, 0, 0, 0.5);
        transform-origin: left top;
    }

    canvas {
        width: 100%;
        height: 100%;
    }

    #myAudio {
        position: absolute;
    }

    #canvas1 {
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none;
    }

    #imgOne {
        position: absolute;
        left: 210px;
        top: 240px;
    }

    #imgTwo {
        position: absolute;
        left: 500px;
        top: 140px;
    }

    #imgOne > img, #imgTwo > img {
        border-radius: 100%;
        max-height: 180px;
        max-width: 180px;
    }

    #imgTwo > img {
        animation: fly 5s linear infinite;
    }

    #imgOne > img {
        animation-name: mymove;
        animation-duration: 5s;
        animation-iteration-count: infinite;
    }

    @keyframes mymove {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg)
        }
    }

    @keyframes fly {
        0% {
            opacity: 0;
            transform: translateY(-10px) rotateZ(15deg);
        }
        25% {
            opacity: .5;
            transform: scale(1.5) translateY(-20px) rotateZ(-15deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) translateY(-30px) rotateZ(15deg);
        }
        75% {
            opacity: .5;
            transform: scale(1.5) translateY(-20px) rotateZ(-15deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0px) rotateZ(0deg);
        }
    }
</style>