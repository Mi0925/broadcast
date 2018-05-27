// 调度方案
var scheduleTable;
Mock.mock('http://127.0.0.1/schedule/allItem', function(optins){
    scheduleTable=Mock.mock({
        'body|100':[{
            "id|+1": 0,
            // "num|0-5": 0,
            "type|1": [
                "类别1",
                "类别2",
                "类别3",
                "类别4",
                "类别5"
            ],
            "level|1": [
                "红色",
                "橙色",
                "绿色",
                "蓝色",
                "黄色"
            ],
            "name|1": [
                "杭州市4级地震",
                "杭州市5级地震",
                "杭州市6级地震",
                "杭州市7级地震",
                "杭州市8级地震"
            ],
            "department|1": [
                "杭州市西湖区应急广播中心",
                "温州市应急广播中心",
                "上海市应急广播中心"
            ],
            "people|1": [
                '@cname'
            ],
            "time": '@datetime("yyyy-MM-dd HH:mm:ss")'
        }]
    });
    return scheduleTable
});

// 调度方案删除接口
Mock.mock('http://127.0.0.1/schedule/deleteItem',function(options){
    var index;
    scheduleTableB=scheduleTable.body;
    for (var i = 0; i < options.body.split("&").length; i++) {
        var id = parseInt(options.body.split("&")[i].split("=")[1])//获取删除的id
        for(var j in scheduleTableB){
            if(scheduleTableB[j].id===id){//在数组arr里找到这个id
                index=j
                break;
            }
        }
        scheduleTableB.splice(index,1)//把这个id对应的对象从数组里删除
    }
    return scheduleTableB;//返回这个数组,也就是返回处理后的假数据
})

// 事件类别接口
var eventTypeData;
Mock.mock('http://127.0.0.1/schedule/eventType',function(options){
    eventTypeData=Mock.mock({
        'body':{
            "type": [
                {
                    num:'10000',
                    name:'突发事件'
                },
                {
                    num:'11A00',
                    name:'水旱灾害'
                },
                {
                    num:'11A02',
                    name:'洪水'
                },
                {
                    num:'10000',
                    name:'内涝'
                },
                {
                    num:'11A03',
                    name:'水库重大险情'
                },
                {
                    num:'11A04',
                    name:'堤防重大险情'
                },
                {
                    num:'11A05',
                    name:'凌汛灾害'
                },
                {
                    num:'11A51',
                    name:'山洪灾害事件'
                }
            ],
            areaData:[{
                name: "浙江省",
                open: true,
                population: 100,
                area: 100,
                children: [{
                    name: "杭州市",
                    population: 100,
                    area: 100,
                },{
                    name: "宁波市",
                    population: 100,
                    area: 100,
                },{
                    name: "温州市",
                    population: 100,
                    area: 100,
                }]
            },{
                name: "安徽省",
                open: true,
                children: [{
                    name: "合肥市"
                },{
                    name: "安庆市"
                },{
                    name: "黄山市"
                }]
            },{
                name: "四川省",
                open: true,
                children: [{
                    name: "成都市"
                }]
            }]
        }
    });
    return eventTypeData
});

// 创建调度方案
Mock.mock('http://127.0.0.1/schedule/addItem', function(optins){
    console.log(optins)
    return Mock.mock({
        'body':{
            "name": '创建成功',
        }
    });
});

// 编辑调度方案
Mock.mock('http://127.0.0.1/schedule/editItem', function(optins){
    return Mock.mock({
        'body':{
            "type": [
                {
                    num:'10000',
                    name:'突发事件'
                },
                {
                    num:'11A00',
                    name:'水旱灾害',
                    selected:true,
                },
                {
                    num:'11A02',
                    name:'洪水'
                },
                {
                    num:'10000',
                    name:'内涝'
                },
                {
                    num:'11A03',
                    name:'水库重大险情'
                },
                {
                    num:'11A04',
                    name:'堤防重大险情'
                },
                {
                    num:'11A05',
                    name:'凌汛灾害'
                },
                {
                    num:'11A51',
                    name:'山洪灾害事件'
                }
            ],
            name:'xiaoxu',
            level:'橙色',
            msgTxt:'我是一段消息',
            audio:['audio1.mp3','audio2.mp3','audio3.mp3'],
            release:'yes',
            population:1000,
            area:100,
            department:'杭州市广播中心',
            popName:'橙子',
            time:'2018-05-14 00:00:00 - 2018-05-23 00:00:00',
            areaData:[
                {
                    name: "浙江省",
                    open: true,
                    population: 100,
                    area: 100,
                    checked:true,
                    children: [{
                        name: "杭州市",
                        population: 100,
                        area: 100,
                    },{
                        name: "宁波市",
                        population: 100,
                        area: 100,
                    },{
                        name: "温州市",
                        population: 100,
                        area: 100,
                    }]
                },{
                    name: "安徽省",
                    open: true,
                    children: [{
                        name: "合肥市"
                    },{
                        name: "安庆市"
                    },{
                        name: "黄山市"
                    }]
                },{
                    name: "四川省",
                    open: true,
                    children: [{
                        name: "成都市"
                    }]
                }
            ],//全部地区
            areaSelData:[{
                name: "浙江省",
                open: true,
                checked:true,
                population: 100,
                area: 100,
                children: [{
                    name: "杭州市",
                    population: 100,
                    area: 100,
                },{
                    name: "宁波市",
                    population: 100,
                    area: 100,
                },{
                    name: "温州市",
                    population: 100,
                    area: 100,
                }]
            }],//选择地区
            resourceData:[{
                'name|1': [
                    "四川省",
                    "浙江省",
                    "安徽省"
                ],
                open: true,
                'population|1-100': 100,
                'area|1-100': 100,
                children: [{
                    name: "杭州市资源",
                    population: 100,
                    area: 100,
                },{
                    name: "宁波市资源",
                    population: 100,
                    area: 100,
                },{
                    name: "温州市资源",
                    population: 100,
                    area: 100,
                }]
            }],//全部资源
            resourceSelData:[{
                'name|1': [
                    "四川省",
                    "浙江省",
                    "安徽省"
                ],
                open: true,
                'population|1-100': 100,
                'area|1-100': 100,
                children: [{
                    name: "杭州市资源",
                    population: 100,
                    area: 100,
                },{
                    name: "宁波市资源",
                    population: 100,
                    area: 100,
                },{
                    name: "温州市资源",
                    population: 100,
                    area: 100,
                }]
            }]//选择资源
        }
    });
});

// 地区
var areaStruct;
Mock.mock('http://127.0.0.1/areaSelect',function(options){
    areaStruct=Mock.mock({
        'body':{
            areaStruct:[{
                'name|1': [
                    "四川省",
                    "浙江省",
                    "安徽省"
                ],
                open: true,
                'population|1-100': 100,
                'area|1-100': 100,
                children: [{
                    name: "杭州市资源",
                    population: 100,
                    area: 100,
                },{
                    name: "宁波市资源",
                    population: 100,
                    area: 100,
                },{
                    name: "温州市资源",
                    population: 100,
                    area: 100,
                }]
            }]
            // areaStruct:{
            //     areaName:"浙江省-杭州市", //地区名
            //     'population|1-100': 100, //人口
            //     'area|1-100':120//面积
            // },
            // resourceData:[{
            //     name: "浙江省资源",
            //     open: true,
            //     children: [{
            //         name: "杭州市资源",
            //     },{
            //         name: "宁波市资源",
            //     },{
            //         name: "温州市资源",
            //     }]
            // }]
        }
    });
    return areaStruct;
});

// 登录
Mock.mock('http://127.0.0.1/login/user', function(options) {
    // alert(options.body.split("&")[0].split("=")[1]);
    return Mock.mock({
        "body":{
            'name': '@cname',
            'token': '@guid'
        }
    });
});

// 值班管理--日历
var calendarData;
Mock.mock('http://127.0.0.1/calendar', function(optins){
    calendarData=Mock.mock({
        'body|10':[{
            'id|+1':1,
            "title|1-5": '@cname ',
            'start': '@datetime("2018-05-dd HH:mm:ss")',
            end: function(argument) {
                // console.log(argument)
                var now = new Date(argument.context.currentContext.start);
                var sub = now;
                sub.setTime(sub.getTime() + 3000);
                var year = sub.getFullYear() < 10 ? '0' + sub.getFullYear() : sub.getFullYear();
                var month = sub.getMonth() + 1 < 10 ? '0' + (sub.getMonth()+1) : (sub.getMonth()+1);
                var day = sub.getDate() < 10 ? '0' + (sub.getDate()+1) : (sub.getDate())+1;
                return year + '-' + month + '-' + day +' 12:35:00';
            }
            // 'end': '@datetime("2018-05-dd HH:mm:ss")'
            // "start": '@now',
            // "end": '@now',
        }]
    });
    return calendarData
});

// 效果评估-事件发布
Mock.mock('http://127.0.0.1/incidentChartData', {
    'body':[{
        "value|10-30": 0,
        "name":'气象局',
        itemStyle: {
            normal: {
                color: "#6e6fe6"
            }
         }
    },{
        "value|10-30": 0,
        "name":'水利',
        itemStyle: {
            normal: {
                color: "#9ca6ff"
            }
        }
    },{
        "value|10-30": 0,
        "name":'国家应急广播平台',
        itemStyle: {
            normal: {
                color: "#1ba5dd"
            }
        }
    },{
        "value|10-30": 0,
        "name":'应急办',
        itemStyle: {
            normal: {
                color: "#41cefb"
            }
        }
    }]
});



// 任务消息
var taskTable;
Mock.mock('http://127.0.0.1/msg/allMsg', function(optins){
    taskTable=Mock.mock({
        'body|10':[{
            "id|+1": 0,
            "state|1": [
                "排队中",
                "审核未通过",
                "审核中",
                "发布中",
                "创建中",
                "停发中"
            ],
            "level|1": [
                "红色",
                "橙色",
                "绿色",
                "蓝色",
                "黄色"
            ],
            "name|1": [
                "杭州西湖区2017年09月09日晚台",
                "杭州西湖区2017年09月09日晚台",
                "杭州西湖区2017年09月09日晚台",
                "杭州西湖区2017年09月09日晚台",
                "杭州西湖区2017年09月09日晚台"
            ],
            "department|1": [
                "杭州市西湖区应急广播中心",
                "温州市应急广播中心",
                "上海市应急广播中心"
            ],
            "people|1": [
                '@cname'
            ],
            "time": '@datetime("yyyy-MM-dd HH:mm:ss")',
            audit:{
                'boolean|1-2':true,
                'state|1': [
                    "审核",
                    "未通过"
                ]
            },
            send:{
                'boolean|1-2':true,
                'state|1': [
                    "续发",
                    "停发"
                ]
            }
        }]
    });
    return taskTable
});


// 消息接入
var msgTable;
Mock.mock('http://127.0.0.1/msg/Platform/all', function(optins){
    msgTable=Mock.mock({
        'body|1000':[{
            "id|+1": 0,
            "interfacesType|1": [
                "上级平台",
                "下级平台"
            ],
            "interfacesName|1": [
                "接口名称1",
                "接口名称2"
            ],
            "prot|1": [
                "8080",
                "80",
                "90",
            ],
            "prot2|1": [
                "8080",
                "80",
                "90",
            ],
            "protocol|1": [
                '协议1',
                '协议2',
                '协议3',
            ],
            'key|1': [
                '秘钥1',
                '秘钥2',
                '秘钥3',
            ],
            'area|1': [
                '地区1',
                '地区2',
                '地区3',
            ],
            "time": '@datetime("yyyy-MM-dd HH:mm:ss")',
            'number|1-500':100
        }]
    });
    return msgTable
});


// 文字转音频
Mock.mock('http://127.0.0.1/convertText', function(optins){
    console.log(optins)
    return Mock.mock({
        'body':{
            "name":'@word().mp3',
        }
    });
});

// 文件转音频
Mock.mock('http://127.0.0.1/convertFile', function(optins){
    console.log(optins)
    return Mock.mock({
        'body':{
            "name": '@word().mp3',
        }
    });
}).setup({ timeout: '10' });