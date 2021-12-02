// 第一，抽奖活动的状态比较多；第二，ios系统，app进入后台再返回展示，h5中的js是被禁止运行的（或者ios客户端提供一个监听app唤醒的方法），因此倒计时需要根据当前系统的时间进行计算；

// 状态
switch (code) {
    case 101:
        status = "抽奖活动不存在";
        break;
    case 102:
        status = "距抽奖活动报名开启还有：";
        break;
    case 103:
        status = "距本次抽奖活动开奖还有：";
        break;
    case 104:
        status = "距本轮抽奖活动截止还有：";
        break;
    case 105: // 已报名
        status = "距本次抽奖活动开奖还有：";
        break;
    case 106: // 未报名
        status = "距本次抽奖活动开奖还有：";
        break;
    case 107: // 未报名
        status = "活动已开奖：";
        break;
    default:
        status = "状态未统计";
        break;
}

// 时间处理 timeFormat 接口返回最后时间；flagTime 相关状态的剩余时间；currentTime 当前系统的时间；checkTime 理应倒计时时间；newCheckTime 统计上次倒计时时间
let newCheckTime = 0, timeFormat = data.lasttime;
function initTime() {
    let currentTime = Date.parse(new Date()) / 1000,
        flagTime,
        checkTime,
        result;
    if (status) {
        flagTime = flagTime.lasttime;
    }
    checkTime = flagTime - currentTime;
    newCheckTime === 0 ? result = newCheckTime : result = checkTime - newCheckTime; // 此处为时间校订，返回剩余时间
    return result;
}

if (_this.timer) {
    clearInterval(_this.timer)
}

_this.timer = setInterval(function () {
    let time = timeFormat + initTime();
    if (time >= 0) {
        // 页面显示倒计时
    } else {
        clearInterval(_this.timer);
        _this.fn(); // 再次调用本接口，查询下一个阶段倒计时
    }
}, 1000);
