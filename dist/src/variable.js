// 全局变量
var user_name=sessionStorage.getItem('name');//用户名
var token=sessionStorage.getItem('token');//token，接口必传值

var portsrc="http://47.104.84.17";
// var portsrc="http://127.0.0.1:8080";
// var portsrc="http://192.168.3.130";
var portVar={};
var blist = [];
var districtLoading = 0;
var drawBoundary=null;
var allbmap=null;//全事件地图
var unitybmap=null;//单一事件地图
// var bmap=null;
var legendSucceed=[];
var legendProcess=[];
var legendFailure=[];
// var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';// 飞机图标
var planePath = 'image://src/images/map-red2.png';// 飞机图标

var handleIcon='M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z';//区域手柄图

var jurisdictionData = [{
    name: "任务消息管理",
    open: true,
    children: [{
        key:'newTask',
        name: "新建任务消息",
    },{
        key:'editTask',
        name: "编辑任务消息（包括停播、取消、重播）",
    },{
        key:'auditTask',
        name: "审核任务消息（包括停播、取消、重播）",
    },{
        key:'checkTask',
        name: "查看任务消息",
    },{
        key:'deleteTask',
        name: "删除任务消息",
    }]
},{
    name: "效果评估",
    open: true,
    children: [{
        key:'checkPreview',
        name: "查看效果评估",
    }]
},{
    name: "应急演练",
    open: true,
    children: [{
        key:'checkPracticeResult',
        name: "查看演练效果",
    },{
        key:'newEditPractice',
        name: "新建演练计划（编辑演练计划）",
    },{
        key:'deletePractice',
        name: "删除演练计划",
    }]
},{
    name: "消息接入",
    open: true,
    children: [{
        key:'newEditMsgPlatform',
        name: "新建消息接入（编辑消息接入）",
    },{
        key:'deleteMsgPlatform',
        name: "删除消息接入",
    }]
},{
    name: "资源管理",
    open: true,
    children: [{
        key:'checkResource',
        name: "查看资源",
    },{
        key:'newEditResource',
        name: "新增资源（编辑资源）",
    },{
        key:'deleteEditResource',
        name: "删除资源（编辑资源）",
    },{
        key:'downloadResource',
        name: "下载音频资源",
    }]
},{
    name: "安全证书",
    open: true,
    children: [{
        key:'uploadEditCert',
        name: "上传证书（编辑证书）",
    },{
        key:'deleteEditCert',
        name: "删除证书（编辑证书）",
    }]
},{
    name: "日志管理",
    open: true,
    children: [{
        key:'checkLog',
        name: "查看日子管理",
    },{
        key:'deleteLog',
        name: "删除日志管理",
    }]
},{
    name: "用户管理",
    open: true,
    children: [{
        key:'newEditUser',
        name: "新建用户（编辑用户）",
    },{
        key:'activeEditUser',
        name: "停用/启用用户（编辑用户）",
    },{
        key:'deleteEditUser',
        name: "删除用户（编辑用户）",
    }]
}];