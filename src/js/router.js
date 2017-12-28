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
/*首页*/
Router.route("/index", function() {
  gbMainContent('components/index.html', RoundaboutSet);
});
/*实时监控*/
Router.route('/monitoring', function() {
  gbMainContent('components/monitoring.html', RoundaboutSet);
});
/*任务消息*/
Router.route('/taskMsg', function() {
  gbMainContent('components/taskMsg.html', RoundaboutSet);
});
/*新建任务消息*/
Router.route('/newTaskMsg', function() {
  gbMainContent('components/newTaskMsg.html', RoundaboutSet);
});
/*发布策略*/
Router.route('/releasePolicy', function() {
  gbMainContent('components/releasePolicy.html', RoundaboutSet);
});
Router.route('/round2', function() {
  gbMainContent('components/round2.html', RoundaboutSet);
});
Router.route('/round3', function() {
  gbMainContent('components/round3.html', RoundaboutSet);
});