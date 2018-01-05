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
