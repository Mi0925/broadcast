// JavaScript Document
$(document).ready(function(){
	// 左边一级导航
	$(".gb-left-nav").on("click",".nav-tit",function(){
		var $this=$(this).parents("li");
		$this.find(".left-sub-nav").slideToggle();
		$this.siblings('li').find('.left-sub-nav').slideUp();
		$this.addClass("cur").siblings("li").removeClass("cur");
		$this.siblings('li').find(".arrow").removeClass("icon-arrow-bottom").addClass("icon-arrow-right")
		if($this.find(".arrow").hasClass('icon-arrow-right')){
			$this.find(".arrow").removeClass("icon-arrow-right").addClass("icon-arrow-bottom")
		}else{
			$this.find(".arrow").removeClass("icon-arrow-bottom").addClass("icon-arrow-right")
		}
	})
	// 左边二级导航
	$(".gb-left-nav").on("click",".left-sub-nav a",function(){
		$(this).addClass("cur").siblings("a").removeClass('cur');
		$(this).parents("li").siblings("li").find("a").removeClass('cur');
	})
})