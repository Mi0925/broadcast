// 调度方案
var scheduleTable;
Mock.mock('http://47.104.84.17:8080/schedule/allItem', function(optins){
    scheduleTable=Mock.mock({
        'body|10':[{
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
                '@cname()方案'
            ],
            "department|1": [
                "杭州市西湖区应急广播中心",
                "温州市应急广播中心",
                "上海市应急广播中心"
            ],
            "dutyPerson|1": [
                '@cname'
            ],
            "time": '@datetime("yyyy-MM-dd HH:mm:ss")'
        }]
    });
    return scheduleTable
});

// 调度方案删除接口
Mock.mock('http://47.104.84.17:8080/schedule/deleteItem',function(options){
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
});
// 任务消息删除接口
Mock.mock('http://47.104.84.17:8080/msg/deleteMsg',function(options){
});
// 重播接口
Mock.mock('http://47.104.84.17:8080/msg/taskMsg/reSend',function(options){
});
// 事件类别接口
var eventTypeData;
Mock.mock('http://47.104.84.17:8080/eventType',function(options){
    console.log(options)
    eventTypeData=Mock.mock({
        'body':[
            {
                code:'10000',
                name:'突发事件'
            },
            {
                code:'11A00',
                name:'水旱灾害'
            },
            {
                code:'11A02',
                name:'洪水'
            },
            {
                code:'10000',
                name:'内涝'
            },
            {
                code:'11A03',
                name:'水库重大险情'
            },
            {
                code:'11A04',
                name:'堤防重大险情'
            },
            {
                code:'11A05',
                name:'凌汛灾害'
            },
            {
                code:'11A51',
                name:'山洪灾害事件'
            }
        ]
    });
    return eventTypeData
});

// 所有地区
Mock.mock('http://47.104.84.17:8080/allArea',function(options){
    return Mock.mock({
        'body':[
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
        ]
    });
});
// 选择地区
var areaStruct;
Mock.mock('http://47.104.84.17:8080/areaSelect',function(options){
    areaStruct=Mock.mock({
        'body':
        [{
            areaStruct:{
                areaName:"浙江省-杭州市", //地区名
                'population|1-100': 100, //人口
                'area|1-100':120//面积
            },
            resourceData:[{
                'name|1': [
                    "浙江省",
                ],
                open: true,
                children: [{
                    name: "杭州市资源",
                }]
            }]
        },{
            areaStruct:{
                areaName:"安徽省-温州市", //地区名
                'population|1-100': 100, //人口
                'area|1-100':120//面积
            },
            resourceData:[{
                'name|1': [
                    "安徽省"
                ],
                open: true,
                children: [{
                    name: "合肥市资源",
                }]
            }]
        }]
            // areaStruct:[{
            //     'name|1': [
            //         "四川省",
            //         "浙江省",
            //         "安徽省"
            //     ],
            //     open: true,
            //     'population|1-100': 100,
            //     'area|1-100': 100,
            //     children: [{
            //         name: "杭州市资源",
            //         population: 100,
            //         area: 100,
            //     },{
            //         name: "宁波市资源",
            //         population: 100,
            //         area: 100,
            //     },{
            //         name: "温州市资源",
            //         population: 100,
            //         area: 100,
            //     }]
            // }]
    });
    return areaStruct;
});

// 创建调度方案
Mock.mock('http://47.104.84.17:8080/schedule/addItem', function(optins){
    console.log(optins)
    return Mock.mock({
        'body':{
            "name": '创建成功',
        }
    });
});
// 编辑调度方案
Mock.mock('http://47.104.84.17:8080/schedule/getItem', function(optins){
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
            level:'橙色',
            name:'xiaoxu',
            department:'杭州市广播中心',
            dutyPerson:'橙子',
            time:'2018-05-14 00:00:00 - 2018-05-23 00:00:00',
            message:'我是一段消息',
            peopleAffect:1000,
            direct:'yes',
            coverArea:100,
            listMP3:['audio1.mp3','audio2.mp3','audio3.mp3'],
            area:[
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
            areaSel:[{
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
            resource:[{
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
            resourceSel:[{
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

// 创建任务消息
Mock.mock('http://47.104.84.17:8080/msg/addMsg', function(optins){
    console.log(optins)
    return Mock.mock({
        'body':{
            "name": '创建成功',
        }
    });
});
// 编辑任务消息
Mock.mock('http://47.104.84.17:8080/msg/getMsg', function(optins){
    return Mock.mock({
        'body':{
            'name':'任务',
            'schedule_id':'2'
        }
    });
});


// 登录
Mock.mock('http://47.104.84.17:8080/login/user', function(options) {
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
Mock.mock('http://47.104.84.17:8080/peopleArrange/all', function(optins){
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
// 任务消息
var taskTable;
Mock.mock('http://47.104.84.17:8080/msg/allMsg', function(optins){
    taskTable=Mock.mock({
        'body|100':[{
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
// 预警消息
Mock.mock('http://47.104.84.17:8080/msg/allMsgs', function(optins){
    return Mock.mock({
        'body|100':[{
            "id|+1": 0,
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
        }]
    });
});
// 资源信息--平台资源
Mock.mock('http://47.104.84.17:8080/res/platform/all', function(optins){
    return Mock.mock({
        'body|100':[{
            "id|+1": 0,
            'code':'000A',
            "state|1": [
                "正常",
                "不在线",
            ],
            'platformType':'上级平台',
            'systemType':'系统类型',
            "name|1": [
                "节目资源名称",
            ],
            "src|1": [
                "211.98.45.255",
            ],
            "area|1": [
                '地区'
            ],
            "time": '@datetime("yyyy-MM-dd HH:mm:ss")',
        }]
    });
});
// 资源信息--下级终端
Mock.mock('http://47.104.84.17:8080/res/sub/all', function(optins){
    return Mock.mock({
        'body|100':[{
            "id|+1": 0,
            'code':'000A',
            "state|1": [
                "正常",
                "不在线",
            ],
            "name|1": [
                "设备类型设备类型",
            ],
            'model':'型号',
            'port':'终端物理地址',
            "src|1": [
                "211.98.45.255",
            ],
            "area|1": [
                '地区'
            ],
            "msg|1": [
                '在线信息'
            ],
        }]
    });
});
// 资源信息--发射台
Mock.mock('http://47.104.84.17:8080/res/station/all', function(optins){
    return Mock.mock({
        'body|100':[{
            "id|+1": 0,
            'code':'000A',
            "state|1": [
                "正常",
                "不在线",
            ],
            "name|1": [
                "设备类型设备类型",
            ],
            'port':'物理地址',
            "src|1": [
                "211.98.45.255",
            ],
            "area|1": [
                '地区'
            ],
            "msg|1": [
                '在线信息'
            ],
        }]
    });
});
// 节目资源
Mock.mock('http://47.104.84.17:8080/res/program/all', function(optins){
    return Mock.mock({
        'body|100':[{
            "id|+1": 0,
            "auditState|1": [
                "排队中",
                "审核未通过",
                "审核中",
                "发布中",
                "创建中",
                "停发中"
            ],
            "lineState|1": [
                "在线",
                "不在线",
            ],
            "name|1": [
                "节目资源名称",
            ],
            "remarks|1": [
                "备注内容备注内容备注内容",
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
            }
        }]
    });
});
// 文字语音
Mock.mock('http://47.104.84.17:8080/res/textAudio/all', function(optins){
    return Mock.mock({
        'body|100':[{
            "id|+1": 0,
            "state|1": [
                "排队中",
                "审核未通过",
                "审核中",
                "发布中",
                "创建中",
                "停发中"
            ],
            "type|1": [
                "音频",
            ],
            "name|1": [
                "节目资源名称",
            ],
            "department|1": [
                "备注内容备注内容备注内容",
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
            }
        }]
    });
});
// 任务消息
Mock.mock('http://47.104.84.17:8080/practice/all', function(optins){
    return Mock.mock({
        'body|100':[{
            "id|+1": 0,
            "state|1": [
                "播放中",
                "审核未通过",
                "审核中",
                "发布中",
                "创建中",
                "停发中"
            ],
            "type|1": [
                "周期",
                "手动"
            ],
            "level|1": [
                "红色",
                "橙色",
                "绿色",
                "蓝色",
                "黄色"
            ],
            "name|1": [
                "西湖区演练计划",
                "滨江区演练计划"
            ],
            "department|1": [
                "杭州市应急广播中心",
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
});

// 消息接入
var msgTable;
Mock.mock('http://47.104.84.17:8080/msg/Platform/all', function(optins){
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
// 消息接入协议
Mock.mock('http://47.104.84.17:8080/protocol', function(optins){
    return Mock.mock({
        'body':['协议1','协议2','协议3']
    });
});
// 消息接入地区
Mock.mock('http://47.104.84.17:8080/area', function(optins){
    return Mock.mock({
        'body':['地区1','地区2','地区3']
    });
});
// 获取消息接入
Mock.mock('http://47.104.84.17:8080/msg/Platform/get', function(optins){
    return Mock.mock({
        'body':{
            "name":'@word()',
            "type":'上级平台',
            "localPort":'1.1.1.1',
            "peerPort":'2.2.2.2',
            "protocol":'协议2',
            "privateKey":'dgasjdgasd',
            "area":'地区2',
        }
    });
});
// 文字转音频
Mock.mock('http://47.104.84.17:8080/convertText', function(optins){
    console.log(optins)
    return Mock.mock({
        'body':{
            "name":'@word().mp3',
        }
    });
});

// 文件转音频
Mock.mock('http://47.104.84.17:8080/convertFile', function(optins){
    console.log(optins)
    return Mock.mock({
        'body':{
            "name": '@word().mp3',
        }
    });
}).setup({ timeout: '10' });







































// 效果评估-事件发布
Mock.mock('http://47.104.84.17:8080/incidentChart', {
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
// 事件级别发布
Mock.mock('http://47.104.84.17:8080/incidentRankChart', {
    'body':[
        {
            value: 20,
            name: '红色事件',
            itemStyle: {
                normal: {
                    color: "#f75c53"
                }
            },
        }, {
            value: 25,
            name: '橙色事件',
            itemStyle: {
                normal: {
                    color: "#fea41e"
                }
            },
        }, {
            value: 27,
            name: '黄色事件',
            itemStyle: {
                normal: {
                    color: "#fada00"
                }
            },
        }, {
            value: 30,
            name: '蓝色事件',
            itemStyle: {
                normal: {
                    color: "#4579d8"
                }
            },
        }, {
            value: 33,
            name: '绿色事件',
            itemStyle: {
                normal: {
                    color: "#14ae8f"
                }
            },
        }
    ]
});
// 任务数量
Mock.mock('http://47.104.84.17:8080/taskNumChart', {
    'body':[
        {
            value: 20,
            itemStyle: {
                normal: {
                    color: "#41cefb"
                }
            },
        }, {
            value: 50,
            itemStyle: {
                normal: {
                    color: "#00aaff"
                }
            },
        }, {
            value: 40,
            itemStyle: {
                normal: {
                    color: "#1ba5dd"
                }
            },
        }, {
            value: 150,
            itemStyle: {
                normal: {
                    color: "#4579d8"
                }
            },
        }
    ]
});
// 事件类型统计数据
Mock.mock('http://47.104.84.17:8080/incidentTypeChart', {
    'body': [{
        type:'金属与非金属矿金属与非金属矿1',
        value: 20,
    },{
        type:'金属与非金属矿金属与非金属矿1',
        value: 20,
    },{
        type:'金属与非金属矿金属与非金属矿1',
        value: 20,
    },{
        type:'金属与非金属矿金属与非金属矿1',
        value: 20,
    },{
        type:'金属与非金属矿金属与非金属矿1',
        value: 20,
    },{
        type:'金属与非金属矿金属与非金属矿1',
        value: 20,
    },{
        type:'金属与非金属矿金属与非金属矿1',
        value: 20,
    },{
        type:'金属与非金属矿金属与非金属矿1',
        value: 20,
    }],
});
// 全部事件-地图
Mock.mock('http://47.104.84.17:8080/mapAllChart', {
    'body': {
        out:'杭州',//出发点
        center:[120.166085,30.279006],//地图中心
        divideMap:["杭州","平阳县","宁波","嘉兴","绍兴","台州","温州"],//地图划分区域地点
        geoCoordMap: { //迁徙终点
            '杭州': [120.166085, 30.279006],
            '宁波': [121.558386, 29.884993],
            '嘉兴': [120.762703, 30.750911],
            '湖州': [120.105, 30.905714],
            '淳安': [119.022147, 29.622863],
            '临安': [119.723544, 30.245816],
            '余杭': [120.301046, 30.4266],
            '上海': [121.4648, 31.2891],
        },
        addDistrict: [ //地图需要高亮的省份
            '杭州',
            '平阳县',
            '宁波',
            '嘉兴',
            '绍兴',
            '台州',
            '温州'
        ],
        BJData: [ //迁徙数据
            [{
                name: '杭州' //出发点
            }, {
                name: '宁波', //到达点
                incident: 'red', //事件颜色
                incident_data: [{
                        color: "red",
                        incident_name: "宁波雷暴事件"
                    }, {
                        color: "orange",
                        incident_name: "宁波雾霾事件"
                    }, {
                        color: "yellow",
                        incident_name: "宁波暴雨事件"
                    }, {
                        color: "blue",
                        incident_name: "宁波台风事件"
                    }, {
                        color: "green",
                        incident_name: "宁波龙卷风事件"
                    }, ] //具体事件
            }],
            [{
                name: '杭州'
            }, {
                name: '嘉兴',
                incident: 'orange',
                incident_data: [{
                    color: "red",
                    incident_name: "雷暴事件"
                }, {
                    color: "orange",
                    incident_name: "雾霾事件"
                }, {
                    color: "yellow",
                    incident_name: "暴雨事件"
                }, {
                    color: "blue",
                    incident_name: "台风事件"
                }, {
                    color: "green",
                    incident_name: "龙卷风事件"
                }, ]
            }]
        ],
        startData: [ //迁徙起点数据
            {
                color: "red",
                incident_name: "雷暴事件"
            }, {
                color: "orange",
                incident_name: "雾霾事件"
            }, {
                color: "yellow",
                incident_name: "暴雨事件"
            }, {
                color: "blue",
                incident_name: "台风事件"
            }, {
                color: "green",
                incident_name: "龙卷风事件"
            },
        ]
    }
});
// 全部事件-表格
Mock.mock('http://47.104.84.17:8080/allEvents', function(optins){
    msgTable=Mock.mock({
        'body|100':[{
            "id|+1": 0,
            "state|1": [
                "发布中",
            ],
            "level|1": [
                "RED",
            ],
            "name|1": [
                "杭州西湖区雷暴红色警报消息",
            ],
            "area|1": [
                "72万kem2",
            ],
            'population|1-100':0,
            "department|1": [
                "杭州市西湖区应急广播中心",
                "温州市应急广播中心",
                "上海市应急广播中心"
            ],
            'dutyPerson':'@cname',
            "time": '@datetime("yyyy-MM-dd HH:mm:ss")',
        }]
    });
    return msgTable
});
//覆盖人口
Mock.mock('http://47.104.84.17:8080/populationChart', {
    'body':{
        xAxis:['0', '5:00', '5:20', '5:40', '6:00', '6:20', '6:40', '6:45', '6:50', '6:55', '7:40', '8:40'],
        data:[
            {value:120,percent:15},
            {value:130,percent:15},
            {value:140,percent:15},
            {value:150,percent:15},
            {value:160,percent:15},
            {value:160,percent:15},
            {value:160,percent:15},
            {value:160,percent:15},
            {value:120,percent:15},
            {value:180,percent:15},
            {value:160,percent:15},
            {value:260,percent:15},
        ]
    }
});
//覆盖区域
Mock.mock('http://47.104.84.17:8080/districtChart', {
    'body':{
        xAxis:['0', '5:00', '5:20', '5:40', '6:00', '6:20', '6:40', '6:45', '6:50', '6:55', '7:40', '8:40'],
        data:[
            {value:120,percent:15},
            {value:130,percent:15},
            {value:140,percent:15},
            {value:150,percent:15},
            {value:160,percent:15},
            {value:160,percent:15},
            {value:160,percent:15},
            {value:160,percent:15},
            {value:120,percent:15},
            {value:180,percent:15},
            {value:160,percent:15},
            {value:260,percent:15},
        ]
    }
});
// 单一事件-地图
Mock.mock('http://47.104.84.17:8080/mapUnityChart', {
    'body': {
        center:[120.166085,30.279006],//地图中心
        divideMap:[
            {
                name:'杭州',
                color:'#ff5b57'
            },
            {
                name:'龙游县',
                color:'#ff5b57'
            },
            {
                name:'宁波',
                color:'#ff5b57'
            },
            {
                name:'嘉兴',
                color:'#fada00'
            },
            {
                name:'绍兴',
                color:'#14ae8f'
            },
            {
                name:'台州',
                color:'#14ae8f'
            },
            {
                name:'温州',
                color:'#ff5b57'
            }
        ],//地图划分区域地点,#ff5b57代表未覆盖，#14ae8f代表已覆盖，#fada00代表未完全覆盖
    }
});
// 单一事件-表格
Mock.mock('http://47.104.84.17:8080/unityMonitoring', function(optins){
    msgTable=Mock.mock({
        'body|100':[{
            "id|+1": 0,
            "level|1": [
                "RED",
            ],
            "name|1": [
                "杭州西湖区雷暴红色警报消息",
            ],
            "department|1": [
                "杭州市西湖区应急广播中心",
                "温州市应急广播中心",
                "上海市应急广播中心"
            ],
            'dutyPerson':'@cname',
            "time": '@datetime("yyyy-MM-dd HH:mm:ss")',
        }]
    });
    return msgTable
});
// 单一事件-表格
Mock.mock('http://47.104.84.17:8080/unityMessage', function(optins){
    msgTable=Mock.mock({
        'body|100':[{
            "id|+1": 0,
            'area':'区域名区域名1',
            'conver':'区域名区域名1',
            'receipts':'接受回执接受回执1',
            'feedback':'播发反馈播发反馈1',
            "receiptstime": '@datetime("yyyy-MM-dd HH:mm:ss")',
            "feedbacktime": '@datetime("yyyy-MM-dd HH:mm:ss")',
        }]
    });
    return msgTable
});
