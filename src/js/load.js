// $(".gb-main-item").load("components/index.html");//首页


// 页面切换
function gbMainContent(url,RoundaboutSet) {
	clearInterval(RoundaboutSet)
	$(".gb-main-item").load(url,function(){
		// clearInterval(RoundaboutSet);//清除首页轮播定时器
	});

}





