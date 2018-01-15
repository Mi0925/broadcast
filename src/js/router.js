// 注册路由
function Router() {
  this.routes = {};
  this.currentUrl = '';
}
Router.prototype.route = function(path, callback) {
  this.routes[path] = callback || function() {};
};
Router.prototype.refresh = function() {
  this.currentUrl = location.hash.slice(1) || '/';
  if(this.routes[this.currentUrl]!=undefined){
    this.routes[this.currentUrl]();
  }
};
Router.prototype.init = function() {
  // window.addEventListener('load', this.refresh.bind(this), false);
  // window.addEventListener('hashchange', this.refresh.bind(this), false);
  
  $(window).bind('load', this.refresh.bind(this));
  $(window).bind('hashchange', this.refresh.bind(this));
}
window.Router = new Router();
window.Router.init();
/*个人设置*/
Router.route('/personalSetting', function() {
  gbMainContent('components/personalSetting.html', RoundaboutSet);
});
/*交接班记录*/
Router.route('/recordOfSuccession', function() {
  gbMainContent('components/recordOfSuccession.html', RoundaboutSet);
});
/*新建交接记录*/
Router.route('/newHandoverRecord', function() {
  gbMainContent('components/newHandoverRecord.html', RoundaboutSet);
});
/*编辑交接记录*/
Router.route('/editHandoverRecord', function() {
  gbMainContent('components/editHandoverRecord.html', RoundaboutSet);
});

/*演练效果*/
Router.route('/manoeuvre', function() {
  gbMainContent('components/manoeuvre.html', RoundaboutSet);
});

/*首页*/
Router.route("/index", function() {
  gbMainContent('components/index.html', RoundaboutSet);
});
/*实时监控*/
Router.route('/monitoring', function() {
  gbMainContent('components/monitoring.html', RoundaboutSet);
});

/*调度指挥模块 start*/
//任务消息
Router.route('/taskMsg', function() {
  gbMainContent('components/taskMsg.html', RoundaboutSet);
});
//新建任务消息
Router.route('/newTaskMsg', function() {
  gbMainContent('components/newTaskMsg.html', RoundaboutSet);
});
//编辑任务消息
Router.route('/newTaskMsgEdit', function() {
  gbMainContent('components/newTaskMsgEdit.html', RoundaboutSet);
});
//发布策略
Router.route('/releasePolicy', function() {
  gbMainContent('components/releasePolicy.html', RoundaboutSet);
});
//报表导出
Router.route('/exportAReport', function() {
  gbMainContent('components/exportAReport.html', RoundaboutSet);
});
/*调度指挥模块 end*/

/*资源管理模块 start*/
//资源信息管理
Router.route('/resourceInformation', function() {
  gbMainContent('components/resourceInformation.html', RoundaboutSet);
});
//新建平台资源信息
Router.route('/newPlatResoInfo', function() {
  gbMainContent('components/newPlatResoInfo.html', RoundaboutSet);
});
//编辑平台资源信息
Router.route('/editPlatResoInfo', function() {
  gbMainContent('components/editPlatResoInfo.html', RoundaboutSet);
});
//新建下级终端
Router.route('/newJuniorTerminal', function() {
  gbMainContent('components/newJuniorTerminal.html', RoundaboutSet);
});
//编辑下级终端
Router.route('/editJuniorTerminal', function() {
  gbMainContent('components/editJuniorTerminal.html', RoundaboutSet);
});
//新建台站资源信息
Router.route('/newStationResoInfo', function() {
  gbMainContent('components/newStationResoInfo.html', RoundaboutSet);
});
//编辑台站资源信息
Router.route('/editStationResoInfo', function() {
  gbMainContent('components/editStationResoInfo.html', RoundaboutSet);
});

//节目资源管理
Router.route('/programResources', function() {
  gbMainContent('components/programResources.html', RoundaboutSet);
});
//新建节目资源
Router.route('/newProgResources', function() {
  gbMainContent('components/newProgResources.html', RoundaboutSet);
});
//文字语音管理
Router.route('/characterVoice', function() {
  gbMainContent('components/characterVoice.html', RoundaboutSet);
});
//上传文字语音
Router.route('/uploadingCharVoice', function() {
  gbMainContent('components/uploadingCharVoice.html', RoundaboutSet);
});
//编辑文字语音
Router.route('/editCharVoice', function() {
  gbMainContent('components/editCharVoice.html', RoundaboutSet);
});
/*资源管理模块 end*/

/*日志管理模块 start*/
//系统登录日志
Router.route('/systemLoginLog', function() {
  gbMainContent('components/systemLoginLog.html', RoundaboutSet);
});
//用户操作日志
Router.route('/userOperationLog', function() {
  gbMainContent('components/userOperationLog.html', RoundaboutSet);
});
//系统运维日志
Router.route('/systemOperLog', function() {
  gbMainContent('components/systemOperLog.html', RoundaboutSet);
});
//新建运维日志
Router.route('/newOperLog', function() {
  gbMainContent('components/newOperLog.html', RoundaboutSet);
});
//编辑运维日志
Router.route('/editOperLog', function() {
  gbMainContent('components/editOperLog.html', RoundaboutSet);
});
//数据联动日志
Router.route('/dataLinkageLog', function() {
  gbMainContent('components/dataLinkageLog.html', RoundaboutSet);
});
/*日志管理模块 end*/

/*系统管理模块 start*/
//值班管理
Router.route('/watch', function() {
  gbMainContent('components/watch.html', RoundaboutSet);
});
//值班日志
Router.route('/onDuty', function() {
  gbMainContent('components/onDuty.html', RoundaboutSet);
});
//用户管理
Router.route('/userManage', function() {
  gbMainContent('components/userManage.html', RoundaboutSet);
});
/*系统管理模块 end*/
