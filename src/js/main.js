// JavaScript Document
$(document).ready(function(){
	// 收起、展开导航栏
	$(".gb-packUp-leftNav").click(function(){
		var $this=$(this);
		$(".gb-wrap").toggleClass("gb-packUp");
		if($this.find("i").hasClass('icon-packUp-left')){
			$this.find("i").removeClass("icon-packUp-left").addClass("icon-packUp-right");
			$this.find('span').html("展开导航栏");
		}else{
			$this.find("i").removeClass("icon-packUp-right").addClass("icon-packUp-left");
			$this.find('span').html("收起导航栏");
		}


	});

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

//解决IE10以下不支持bind方法
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {},
            fBound = function() {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}


// 点击链接加载对应页面
$("body").on("click",".add_tab",function(){
	// gbMainContent($(this).attr("url"),RoundaboutSet);
	sessionStorage.setItem('tab_default_name',$(this).attr("name"));
	sessionStorage.setItem('tab_default_url',$(this).attr("url"));
	var nav_text=$(this).attr("name");
	var url=$(this).attr("url");
	add_tab(nav_text,url);
});
function add_tab(nav_text,url) {
	$(".gb-tab .swiper-slide").removeClass('cur');
	var blo=false;
	$(".gb-tab .swiper-slide").each(function(){
		if($(this).find("span").text()==nav_text){
			$(".gb-tab .swiper-slide").eq($(this).index()).addClass("cur");
			tabSwiper.swipeTo($(this).index());
			blo=true;
			return;
		}
	})
	if(blo==true){
		return;
	}
	var tabSlideHtml='<a href="#'+url.slice(10,-5)+'" url="'+url+'" name="'+nav_text+'"><span>'+nav_text+
						'</span>' +
					'</a><i class="iconfont icon-guanbi close-tab"></i>';
	tabSwiper.appendSlide(tabSlideHtml);
	tabActive=$(".gb-tab .swiper-slide").length-1;
	tabSwiper.swipeTo(tabActive);
	$(".gb-tab .swiper-slide:last-child").addClass("cur");
};







