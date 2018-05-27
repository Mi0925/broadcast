//显示input文字数量
$(document).on('keyup','#impcontent', function() { 
    $('.oneimp-count .countnew').html($('#impcontent').val().length);  
});
$(document).on('keyup','#imparea', function() {  
    $('.area-count .countnew').html($('#imparea').val().length);  
});


//转换、删除、预览
$(function() {
	$(document).on('click','.filedel-btn',function(event) {
        fileShow();
        $(this).parents('li').addClass('todel');
        //$(myDiv).toggle();
        $(document).one("click",
        function() { 
            $('.choose').hide();
            $('.filelist li').removeClass('todel');
        });
        event.stopPropagation(); 
    });
    
    $('.choose').click(function(event) {
        event.stopPropagation(); 
    });
});
function fileShow() {
	var x = event.clientX - event.offsetX;
	var y = event.clientY - event.offsetY;
	$('.choose').css({'display':'block','top':y-90,'left':x-130});
}

$(document).on('click','.cho-delete',function(){
	$('.choose').hide();
	$('.filelist li.todel').remove();
})
$(document).on('click','.cho-cancel',function(){
	$('.choose').hide();
	$('.filelist li').removeClass('todel');
})

$('.gb-main-item').scroll(function(){
	if($('.choose').is(':visible')){
		$('.choose').hide();
		$('.filelist li').removeClass('todel');
	}
})


// 本地上传
// $("body").on("change",".j-file",function(file) {
// 	var el = document.createElement('li');
// 	el.innerHTML = '<div class="filename"><i class="iconfont icon-1"></i><span class="thename">'+file.target.files[0].name+'</span></div>'+
// 				'<div class="filebtn">'+
// 				'	<input type="button" value="删除" class="filedel-btn"/>'+
// 				'	<input type="button" value="转换" class="fileconv-btn"/>'+
// 				'</div>';
// 	// $(".j-disabled").before(el);
// 	$(".filelist").append(el);
// });
// 文字转音频
$(document).on('click','.toswitch',function(){
	// $('.popwindow').show();
	// $('.toshift').show();
	// $('.matlist li ').eq(0).find('input').prop('checked',true);
	if($("#impcontent").val()!=""){
		if($("#imparea").val()!="请输入消息文本"){
			$.ajax({
			    url: portsrc+'/convertText',
			    type: 'post',
			    dataType: 'json',
			    data:{
			    	token:token,
			    	data:JSON.stringify({
			    		name:$("#impcontent").val(),text:$("#imparea").val()
			    	})
			    },
			    success: function(data) {
			    	if($('li.msg_audio').length==0){
				    	var el = document.createElement('li');
				    	el.classList.add('msg_audio');
				    	el.style.color="#5fb878";
						el.innerHTML = '<div class="filename"><i class="iconfont icon-1"></i><span class="thename">'+data.body.name+'</span></div>'+
									'<div class="filebtn">'+
									'	<input type="button" value="删除" class="filedel-btn"/>'+
									// '	<input type="button" value="转换" class="fileconv-btn"/>'+
									'</div>';
						// $(".j-disabled").before(el);
						$(".filelist").append(el);
					}
					layer.open({
			            title: '提示',
			            shadeClose:true,
			            content: '成功转换为：'+data.body.name
			        });

			    }
			});
		}else{
			layer.open({
	            title: '提示',
			    shadeClose:true,
	            content: '请输入消息文本'
	        });
		}
	}else{
		layer.open({
            title: '提示',
			shadeClose:true,
            content: '请输入事件名称'
        });
	}
})

$(document).on('click','.filepre-btn',function(){
	$('.popwindow').show();
	$('.unword').html($(this).parents('li').find('.thename').html());
	$('.unreason').show();
})

$(document).on('click','.fileconv-btn,.filetit-one',function(){
	$('.popwindow').show();
	$('.toshift').show();
	$('.matlist li ').eq(0).find('input').prop('checked',true);
})


//清空
$(document).on('click','.toemptybtn',function(){
	$('.imptxt').val('');
	$('.imparea').val('请输入消息文本');
	$('.imparea').css('color','#ccc');
	$('.countnew').html('0');
	$('.filelist').remove();
	$('.gb-form .layui-form-select .layui-input').val('');
	$('.layui-anim-upbit dd').removeClass('layui-this');

	$('.prtop .msgrank li input').prop('checked',false);

	$('.gb-form .layui-input-inline .layui-input').val('');
	$('.layui-laydate-content td').removeClass('layui-this laydate-selected laydate-day-next');
	$('.layui-laydate-content ol li').removeClass('layui-this');
	$('.layui-laydate-content ol li:first-child').addClass('layui-this');
	
	//newCyclePlan
	$('.datecho .repcho').html('每天');
	$('.weekcho .repcho').html('每周');
	$('.weeklist li').removeClass('weekact');
	$('.daytime .layui-input-inline').removeClass('layshow');
	$('.daytime .layui-input-inline').eq(0).addClass('layshow');
})



//编辑与保存
$(document).on('click','.toedit',function(){
	if($(this).hasClass('disable-edit')){
		$(this).removeClass('disable-edit');
		$(this).html('<i class="iconfont icon-bianji"></i>编辑');
		$('#tosave').hide();
		$('.settingone .tnoneimp input').attr('readonly',true);
		$('.settingone .tnoneimp input').css('color','#d8d8d8');
	}else{
		$(this).addClass('disable-edit');
		$(this).html('<i class="iconfont icon-baocun"></i>保存');//<i class="iconfont icon-weitongguo"></i>取消编辑
		$('#tosave').show();
		$('.settingone .tnoneimp input').attr('readonly',false);
		$('.settingone .tnoneimp input').css('color','#333');
	}
})
$(document).on('click','.tocreatbtn',function(){
	$('.toedit').removeClass('disable-edit');
	$('.toedit').html('<i class="iconfont icon-bianji"></i>编辑');
	$('#tosave').hide();
	$('.settingone .tnoneimp input').attr('readonly',true);
	$('.settingone .tnoneimp input').css('color','#d8d8d8');
})
