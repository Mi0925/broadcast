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
  window.addEventListener('load', this.refresh.bind(this), false);
  window.addEventListener('hashchange', this.refresh.bind(this), false);
}
window.Router = new Router();
window.Router.init();
Router.route("/index", function() {
  gbMainContent('components/index.html', RoundaboutSet);
});
Router.route('/round2', function() {
  gbMainContent('components/round2.html', RoundaboutSet);
});
Router.route('/round3', function() {
  gbMainContent('components/round3.html', RoundaboutSet);
});