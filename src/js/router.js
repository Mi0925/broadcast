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
Router.route('/EditHandoverRecord', function() {
  gbMainContent('components/EditHandoverRecord.html', RoundaboutSet);
});

/*首页*/
Router.route("/index", function() {
  gbMainContent('components/index.html', RoundaboutSet);
});
/*实时监控*/
Router.route('/monitoring', function() {
  gbMainContent('components/monitoring.html', RoundaboutSet);
});

/*调度指挥 start*/
//任务消息
Router.route('/taskMsg', function() {
  gbMainContent('components/taskMsg.html', RoundaboutSet);
});
//新建任务消息
Router.route('/newTaskMsg', function() {
  gbMainContent('components/newTaskMsg.html', RoundaboutSet);
});
// 编辑
Router.route('/newTaskMsgEdit', function() {
  gbMainContent('components/newTaskMsgEdit.html', RoundaboutSet);
});
//发布策略
Router.route('/releasePolicy', function() {
  gbMainContent('components/releasePolicy.html', RoundaboutSet);
});
/*调度指挥 end*/

/*资源管理 start*/
//节目资源管理
Router.route('/programResources', function() {
  gbMainContent('components/programResources.html', RoundaboutSet);
});
//新建节目资源
Router.route('/newProgResources', function() {
  gbMainContent('components/newProgResources.html', RoundaboutSet);
});
/*资源管理 end*/

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
/*//新建运维日志
Router.route('/newHandoverRecord', function() {
  gbMainContent('components/newHandoverRecord.html', RoundaboutSet);
});
//数据联动日志
Router.route('/newHandoverRecord', function() {
  gbMainContent('components/newHandoverRecord.html', RoundaboutSet);
});*/
/*日志管理模块 end*/

/*系统管理 start*/
//值班管理
Router.route('/watch', function() {
  gbMainContent('components/watch.html', RoundaboutSet);
});
/*系统管理 end*/

Router.route('/round2', function() {
  gbMainContent('components/round2.html', RoundaboutSet);
});
Router.route('/round3', function() {
  gbMainContent('components/round3.html', RoundaboutSet);
});
