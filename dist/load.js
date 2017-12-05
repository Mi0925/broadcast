$(".gb-left-nav").load("nav-left.html");//左侧导航
$(".gb-main-content").load("round.html");//首页


// 页面切换
function gbMainContent(url) {
	// for(var i = 1; i < 100; i++) {
	// 	clearInterval(i);
	// }
	$(".gb-main-content").load(url);//首页
}





