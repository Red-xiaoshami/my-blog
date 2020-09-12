// 根据封面图的大小，对视频进行优化。
// 视频：安卓微信浏览器一般没有问题，重点是ios，因为微信浏览器自带一个header，故视频展示区域要比原视频高度小，因此需要对整个视频scale进行放大;
// 封面图： 阿里云短视频默认cover，但是针对假如高度仅有屏幕三分之一大小的视频，进行cover的话就会失真；因此三种短视频情况 高度小于宽度、短视频宽度等于屏幕宽度，短视频高度同比例缩放的后的高度-屏幕可视区域高度<70(ios手机的header50多70内，安卓基本相等)、视频高度远远大于可视屏幕高度
optimizeVideo(CoverURL) {
    let _this = this,
        videoScaleH,
        _coverImg = new Image();
    _coverImg.src = CoverURL;
    _coverImg.onload = function () {
        videoScaleH = (1-(_coverImg.width-window.screen.width)/_coverImg.width)* _coverImg.height;
        if(Math.abs(videoScaleH - window.innerHeight) < 70) {
            let scale = videoScaleH/window.innerHeight;
            _this.$refs.video.childNodes[14].style.setProperty("background-size","cover","important");
            _this.$refs.video.childNodes[0].style.setProperty("transform","translate(-50% , -50%) scale(" + (scale>1?scale: 2 -scale) + ")","important");
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