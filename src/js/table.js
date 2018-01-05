jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "html-percent-pre": function (a) {
    	//console.log($(a).attr('vel'));
        var x = $(a).attr('vel');
        return parseFloat(x);
    },

    "html-percent-asc": function (a, b) {                //正序排序引用方法
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "html-percent-desc": function (a, b) {                //倒序排序引用方法
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});



var oLanguage={ //国际语言转化
    "oAria": {
        "sSortAscending": " - click/return to sort ascending",
        "sSortDescending": " - click/return to sort descending"
    },
    "sLengthMenu": " _MENU_ 条",
    "sZeroRecords": "对不起，查询不到任何相关数据",
    "sEmptyTable": "未有相关数据",
    "sLoadingRecords": "正在加载数据-请等待...",
    "sInfo": "共 _TOTAL_ 条 ", //当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录。
    "sInfoEmpty": "当前显示0到0条，共0条记录",
    "sInfoFiltered": "（数据库中共为 _MAX_ 条记录）",
    "sProcessing": "正在加载数据...",
    "sSearch": "模糊查询：",
    "sUrl": "",
    //多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
    "oPaginate": {
        // "sFirst": "首页",
        "sPrevious": " <i class='iconfont icon-zuo'></i> ",
        "sNext": " <i class='iconfont icon-you-copy'></i> ",
        // "sLast": " 尾页 "
    }
}

// 自定义显示数量
function tabot($this) {
    var tabot = $('<div class="botdiv"></div>');    
    $this.find('.tablecont').append(tabot);
    $this.find('.dataTables_info').appendTo($this.find('.botdiv'));
    $this.find('.dataTables_length').appendTo($this.find('.botdiv'));
    $this.find('.dataTables_paginate').appendTo($this.find('.botdiv'));
}

// 跳转page
function jumpPage($this) {
    $this.find(".dataTables_paginate").append("<div class='jump-page'>前往第 <input class='changePage' type='text'> 页  <a class='dataTable-btn' href='javascript:void(0);'>确认</a></div>");  
    var oTable = $this.find("table").dataTable();  
    $this.find('.dataTable-btn').click(function(e) { 
        if($this.find(".changePage").val() && $this.find(".changePage").val() > 0) {  
            var redirectpage = $this.find(".changePage").val() - 1;
        } else {  
            var redirectpage = 0;
        }
        oTable.fnPageChange(redirectpage);  
    });  
}

/*popwindow*/
$(document).on('click','.operbtn',function(){
    $('.popwindow').show();
    $('.preview').show();
})

$(document).on('click','.audit',function(){
    $('.popwindow').show();
    $('.review').show();
})
$(document).on('click','.notpass',function(){
    $('.popwindow').show();
    $('.unreason').css({'z-index':'101','opacity':1,'-ms-filter':"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)"});
})

/**/$(document).on('click','.popwindow',function(){
    $(this).hide();
    $('.preview').hide();
    $('.review').hide();
    $('.fillin').hide();
    $('.toshift').hide();
    $('.unreason').css({'z-index':'-1','display':'block','opacity':0,'-ms-filter':"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"});
})
$(document).on('click','.popclose',function(){
    $('.popwindow').hide();
    
    $(this).parent().hide();
    $('.unreason').css({'z-index':'-1','display':'block','opacity':0,'-ms-filter':"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"});
})
$(document).on('click','.revno',function(){
    $('.review').hide();
    $('.fillin').show();
})
$(document).on('click','.rev-cancel',function(){
    $('.popwindow').hide();
    $(this).parents('.fillin').hide();
})
$(document).on('click','.revyes',function(){
    $('.popwindow').hide();
    $(this).parents('.review').hide();
    $(this).parents('.fillin').hide();
})
$(document).on('click','.un-confirm',function(){
    $('.popwindow').hide();
    $(this).parents('.unreason').css({'z-index':'-1','display':'block','opacity':0,'-ms-filter':"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"});
})

layui.use(['form', 'element'], function(){
            var $ = layui.jquery
            ,element = layui.element //Tab的切换功能，切换事件监听等，需要依赖element模块
            ,form = layui.form;
            form.render();

            var itbtn = $('<span class="itbtn"></span>');
            $('.layui-select-title').append(itbtn);
            $('.gb-form .layui-form-radio').remove();

          
            //触发事件
            var active = {
                loading: function(othis){
                  var DISABLED = 'layui-btn-disabled';
                  if(othis.hasClass(DISABLED)) return;
                  
                  //模拟loading
                  var n = 0,timer = setInterval(function(){
                    n = n + Math.random()*10|0;  
                    if(n>100){
                      n = 100;
                      clearInterval(timer);
                      othis.removeClass(DISABLED);
                      $('.tomat').hide();
                      $('.succmat').show();
                    }
                    element.progress('demo', n+'%');
                  }, 300+Math.random()*1000);
                  
                  othis.addClass(DISABLED);
                }
            };
          
            $('.uncont .site-demo-active').on('click', function(){
                //if($('.tomat').is(':hidden') && $('.succmat').is(':hidden')){
                    $('.tomat').show();
                    $('.succmat').hide();
                    var othis = $(this), type = $(this).data('type');
                    active[type] ? active[type].call(this, othis) : '';
                //}
            });
        });