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
	})

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