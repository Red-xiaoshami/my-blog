// 根据封面图的大小，对视频进行优化。
// 视频：安卓微信浏览器一般没有问题，重点是ios，因为微信浏览器自带一个header，故视频展示区域要比原视频高度小，因此需要对整个视频scale进行放大;
// 封面图： 阿里云短视频默认cover，但是针对高度仅有屏幕三分之一大小的视频，进行cover的话就会失真；因此三种情况高度小于宽度、|视频高宽比-可视区域的高度比| < 0.3（略小于可是区域也进行放大，UI美观，毕竟还有其他组件，自行设定）、视频高度远远大于可视屏幕高度
optimizeVideo(CoverURL) {
    let _this = this,
        screenScale = window.innerHeight/window.screen.width,
        videoScale,
        _coverImg = new Image();

    _coverImg.src = CoverURL;
    _coverImg.onload = function () {
        videoScale = _coverImg.height/_coverImg.width;
        if(Math.abs(videoScale - screenScale) < 0.3) {
            _this.$refs.video.childNodes[14].style.setProperty("background-size","cover","important");
            _this.$refs.video.childNodes[0].style.setProperty("transform","translate(-50% , -50%) scale(" + (Math.abs(videoScale - screenScale)+1) + ")","important");
        } else {
            _this.$refs.video.childNodes[0].style.maxHeight = window.screen.height + 'px';
        }
    }
}

// css 根据设计图优化，封面图contain，然后js动态修改；

// <style>
// .prism-player .prism-cover {
//     background-size: contain!important;
//     overflow: hidden;
// }
// </style>