/*type*/
function body_load() {
    setTimeout(function(argument) {
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            laydate.render({
                elem: '#daterg',
                eventElem: '#tochobtn',
                trigger: 'click',
                type:'datetime',
                range: true,
                change: function(value, date, endDate){
                    console.log(value)
                    console.log(date)
                    console.log(endDate)
                }
            });
        });
    },500)
}


//table
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
    "sInfo": "共 _TOTAL_ 条 | 每页", //当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录。
    "sInfoEmpty": "当前显示0到0条，共0条记录 | 每页",
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
    var oTable = $this.find('.dataTables_scrollBody').find('table').dataTable();
    $this.find('.dataTable-btn').click(function(e) { 
        if($this.find(".changePage").val() && $this.find(".changePage").val() > 0) {  
            var redirectpage = $this.find(".changePage").val() - 1;
        } else {  
            var redirectpage = 0;
        }
        oTable.fnPageChange(redirectpage);  
    });  
}

//列搜索
function rowScreen(column){
    var $span = $('<span class="addselect"><i class="iconfont icon-arrow-bottom"></i></span>').appendTo($(column.header()))
    var select = $('<select><option value="">全部</option></select>')
    .appendTo($(column.header()))
    .on('click', function(evt) {
        evt.stopPropagation();
        var val = $.fn.dataTable.util.escapeRegex(
            $(this).val()
            );
        column.search(val ? '^' + val + '$' : '', true, false).draw();
    });
    column.data().unique().sort().each(function(d, j) {
        function delHtmlTag(str) {
            return str.replace(/<[^>]+>/g, ""); //去掉html标签
        }

        d = delHtmlTag(d)
        select.append('<option value="' + d + '">' + d + '</option>')
        $span.append(select)
    });
}
//等级列筛选
function rowLevScreen(column){
    var $span = $('<span class="addselect"><i class="iconfont icon-arrow-bottom"></i></span>').appendTo($(column.header()))
    var select = $('<select><option value="">全部</option></select>')
    .appendTo($(column.header()))
    .on('click', function(evt) {
        evt.stopPropagation();
        var val = $.fn.dataTable.util.escapeRegex(
            $(this).val()
            );
        column.search(val ? val : '', true, false).draw();
    });
    column.data().unique().sort().each(function(d, j) {
        function delHtmlTag(str) {
            return str.replace(/<[^>]+>/g, ""); //去掉html标签
        }

        d = $(d).attr("vel");
        select.append('<option value="' + d + '">' + d + '</option>')
        $span.append(select)
    });
}

//table配置
function userDef(table){
    $(".gb-packUp-leftNav").click(function(){
        setTimeout(function(){
            table.draw();
        },500)
    });//重绘
    //自定义显示数量
    $('.taskmsg').each(function(){
        tabot($(this))
    })
    $('.gb-ctab').each(function(){
        tabot($(this))
    })
    //自定义显示搜索
    $('.dsearch').on('keyup click', function () {
       var tsval = $(".dsearch").val()
       table.search(tsval, false, false).draw();
   });

    //checkbox全选
    $("#checkAll").on("click", function () {
        if ($(this).prop("checked") === true) {
           $("input[name='checkone']").prop("checked", $(this).prop("checked"));
           $('.dataTables_wrapper tbody tr').addClass('selected');
       } else {
           $("input[name='checkone']").prop("checked", false);
           $('.dataTables_wrapper tbody tr').removeClass('selected');
       }
   });


   //删除选中行
   $('.dataTables_wrapper tbody').on('click', 'tr input[name="checkone"]', function () {
       var $tr = $(this).parents('tr');
       $tr.toggleClass('selected');
       var $tmp = $('[name=checkone]:checkbox');
       $('#checkAll').prop('checked', $tmp.length == $tmp.filter(':checked').length);
   });


   $('.dataTables_wrapper').on('scroll',function(){
    if($('.choose').is(':visible')){
        $(".choose").hide();
        $('table.dataTable tbody tr').removeClass('trstop trcont traga trdel');
    }
})
   $(window).resize(function(){
    if($('.choose').is(':visible')){
        $(".choose").hide();
        $('table.dataTable tbody tr').removeClass('trstop trcont traga trdel');
    }
})
};
function tr_del(table) {//表格删除
    console.log($(this).parents('.choose'));
    table.rows('tr.selected').remove().draw(false);
    $('#checkAll').attr('checked',false);
    $(this).parents('.choose').hide();
    layer.open({
        title: '提示',
        content: '删除成功'
    });

   //  $('.j-del-tr').click(function(){
   //      table.row('.trdel').remove().draw(false);
   //      $(this).parents('.choose').hide();
   // });
}
function tr_stop(table) {//表格停用
 
    
    $('.trstop .isstop').addClass('isactive').removeClass('isstop').html('<i class="iconfont icon-qiyong"></i>启用');
    // .addClass('isactive').removeClass('isstop').find('.iconfont').removeClass('icon-zanting').addClass('icon-qiyong');
    layer.open({
        title: '提示',
        content: '停用成功'
    });
}
function tr_active(table) {//表格启用
    $('.tractive .isactive').addClass('isstop').removeClass('isactive').html('<i class="iconfont icon-zanting"></i>停用');
    layer.open({
        title: '提示',
        content: '启用成功'
    });
}


/*popwindow*/
$(document).on('click','.operbtnTask',function(){
    $('.popwindow').show();
    $('.preview').show();
    sessionStorage.setItem('editTableItem',$(this).parents('tr').find('.checkone').find('input').attr('id'));
    $(".prevlist").html('');
    $.ajax({
        url: portsrc+'/msg/getMsg',
        type: 'post',
        async:false,
        dataType: 'json',
        data:{
            token:token,
            type:'task',//task为任务消息，alert为预警消息
            id:sessionStorage.getItem('editTableItem'),
        },
        success: function(data) {
            var schedulePlanId=data.body.schedulePlanId;
            $.ajax({
                url: portsrc+'/schedule/getItem',
                type: 'post',
                dataType: 'json',
                data:{
                    token:token,
                    id:schedulePlanId,
                },
                success: function(data) {
                    // $(".prevword").text(data.body.message);
                    for (var i = 0; i < data.body.listMP3.length; i++) {
                        var html='<li>'+
                        '<p class="prevideo">'+data.body.listMP3[i]+'</p>'+
                        '<button class="tosee">'+
                        '   <a href="#/editCyclePlan" url="components/editCyclePlan.html" class="add_tab" name="编辑周期性计划">预览</a>'+
                        '</button>'
                        '</li>  ';
                        $(".prevlist").append(html)
                    }
                }
            });
        }
    });
});
$(document).on('click','.operbtnCYCLE',function(){
    $('.popwindow').show();
    $('.preview').show();
    sessionStorage.setItem('editTableItem',$(this).parents('tr').find('.checkone').find('input').attr('id'));
    $(".prevlist").html('');
    $.ajax({
        url: portsrc+'/practice/get/CyclePractice',
        type: 'post',
        dataType: 'json',
        async:false,
        data:{
            token:token,
            id:sessionStorage.getItem('editTableItem'),
        },
        success: function(data) {
            var schedulePlanId=data.body.schedulePlanId;
            $.ajax({
                url: portsrc+'/schedule/getItem',
                type: 'post',
                dataType: 'json',
                data:{
                    token:token,
                    id:schedulePlanId,
                },
                success: function(data) {
                    // $(".prevword").text(data.body.message);
                    for (var i = 0; i < data.body.listMP3.length; i++) {
                        var html='<li>'+
                        '<p class="prevideo">'+data.body.listMP3[i]+'</p>'+
                        '<button class="tosee">'+
                        '   <a href="#/editCyclePlan" url="components/editCyclePlan.html" class="add_tab" name="编辑周期性计划">预览</a>'+
                        '</button>'
                        '</li>  ';
                        $(".prevlist").append(html)
                    }
                }
            });
        }
    });
});
$(document).on('click','.operbtnMANNUAL',function(){
    $('.popwindow').show();
    $('.preview').show();
    sessionStorage.setItem('editTableItem',$(this).parents('tr').find('.checkone').find('input').attr('id'));
    $(".prevlist").html('');
    $.ajax({
        url: portsrc+'/practice/get/ManualPractice',
        type: 'post',
        dataType: 'json',
        async:false,
        data:{
            token:token,
            id:sessionStorage.getItem('editTableItem'),
        },
        success: function(data) {
            var schedulePlanId=data.body.schedulePlanId;
            console.log(schedulePlanId)
            $.ajax({
                url: portsrc+'/schedule/getItem',
                type: 'post',
                dataType: 'json',
                data:{
                    token:token,
                    id:schedulePlanId,
                },
                success: function(data) {
                    console.log(data)
                    // $(".prevword").text(data.body.message);
                    for (var i = 0; i < data.body.listMP3.length; i++) {
                        var html='<li>'+
                        '<p class="prevideo">'+data.body.listMP3[i]+'</p>'+
                        '<button class="tosee">'+
                        '   <a href="#/editManualExerProg" url="components/editManualExerProg.html" class="add_tab" name="编辑手动演练计划">预览</a>'+
                        '</button>'
                        '</li>  ';
                        $(".prevlist").append(html)
                    }
                }
            });
        }
    });
});


$(document).on('click','.audit',function(){
    $('.popwindow').show();
    $('.review').show();
    sessionStorage.setItem('auditId',$(this).parents('tr').find(".checkone").find("input").attr('id'));
})
$(document).on('click','.notpass',function(){
    $('.popwindow').show();
    $('.unreason').show();//.css({'z-index':'101','opacity':1,'-ms-filter':"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)"});
})

$(document).on('click','.popwindow',function(){
    /*if($(this).hasClass('popnone')){
        return;
    }else{*/
        $(this).hide();
        $('.preview').hide();
        $('.review').hide();
        $('.fillin').hide();
        $('.toshift').hide();
        $('.unreason').hide();
        $('.tolead').hide();
        $('.upcert').hide();
        $('.datecho').hide();
        $('.weekcho').hide();
        $('.yemon').hide();
    //}
    //.css({'z-index':'-1','display':'block','opacity':0,'-ms-filter':"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"});
})
$(document).on('click','.popclose',function(){
    $('.popwindow').hide();
    
    $(this).parent().hide();
    $('.unreason').hide();//.css({'z-index':'-1','display':'block','opacity':0,'-ms-filter':"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"});
})
$(document).on('click','.revno',function(){
    $('.review').hide();
    $('.fillin').show();
})
$(document).on('click','.rev-cancel',function(){
    $('.popwindow').hide();
    $(this).parents('.fillin').hide();
    $(this).parents('.upcert').hide();
})
$(document).on('click','.revyes',function(){
    $('.popwindow').hide();
    $(this).parents('.review').hide();
    $(this).parents('.fillin').hide();
    $(this).parents('.upcert').hide();
})
$(document).on('click','.un-confirm',function(){
    $('.popwindow').hide();
    $(this).parents('.unreason').hide();//.css({'z-index':'-1','display':'block','opacity':0,'-ms-filter':"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"});
    $(this).parents('.datecho').hide();
    $(this).parents('.weekcho').hide();
})


//停发、续发、重发、删除、注销、启用
$(function() {

    $(document).on('click','.isstop',function(event) {
        showDiv();
        $('.choword').html('确定停发此任务消息吗？');
        $('.chopri').val('停发');
        $('.chopri').removeClass('j-del-tr cho-again cho-continue').addClass('cho-stop');
        $(this).parents('tr').addClass('trstop');
        $(document).one("click",
            function() { 
                $(".choose").hide();
                // $('table.dataTable tbody tr').removeClass('trstop');
            });
        event.stopPropagation(); 
    });
    $(document).on('click','.isactive',function(event) {
        showDiv();
        $('.choword').html('确定启用此任务消息吗？');
        $('.chopri').val('启用');
        $('.chopri').removeClass('j-del-tr cho-again cho-continue cho-stop').addClass('cho-active');
        $(this).parents('tr').addClass('tractive');
        $(document).one("click",
            function() { 
                $(".choose").hide();
                // $('table.dataTable tbody tr').removeClass('tractive');
            });
        event.stopPropagation(); 
    });
    $(document).on('click','.iscont',function(event) {
        showDiv();
        $('.choword').html('确定续发此任务消息吗？');
        $('.chopri').val('续发');
        $('.chopri').removeClass('j-del-tr cho-again cho-stop').addClass('cho-continue');
        $(this).parents('tr').addClass('trcont');
        $(document).one("click",
            function() { 
                $(".choose").hide();
                $('table.dataTable tbody tr').removeClass('trcont');
            });
        event.stopPropagation();
    });
    $(document).on('click','.chretry',function(event) {
        sessionStorage.setItem('chretry',$(this).parents('tr').find(".checkone").find("input").attr('id'));
        showDiv();
        $('.choword').html('确定重发此任务消息吗？');
        $('.chopri').val('重发');
        $('.chopri').removeClass('j-del-tr cho-continue cho-stop').addClass('cho-again');
        $(this).parents('tr').addClass('traga');
        $(document).one("click",function() { 
            $(".choose").hide();
            $('table.dataTable tbody tr').removeClass('traga');
        });
        event.stopPropagation();
    });
    $(document).on('click','.delete',function(event) {
        showDiv();
        $('.choword').html('确定删除此任务消息吗？');
        $('.chopri').val('删除');
        $('.chopri').removeClass('cho-again cho-continue cho-stop').addClass('j-del-tr');
        // $(this).parents('tr').addClass('trdel');
        $(this).parents('tr').addClass('selected');
        //$(myDiv).toggle();fv
        // $(document).one("click",function() {
        //     alert(1)
        //     $(".choose").hide();
        //     $('table.dataTable tbody tr').removeClass('trdel');
        // });
        event.stopPropagation();
    });
    $(document).on('click','.logout',function(event) {
        showDiv();
        //$('.choword').html('确定注销吗？');
        //$('.chopri').val('注销');
        //$('.chopri').addClass('cho-logout');
        $(this).parents('tr').addClass('trlogout');
        //$(myDiv).toggle();
        $(document).one("click",
            function() { 
                $(".choose").hide();
                $('table.dataTable tbody tr').removeClass('trlogout');
            });
        event.stopPropagation();
    });
    $(".choose").click(function(event) {
        event.stopPropagation(); 
    });
});
function showDiv() {
    var x = event.clientX - event.offsetX;
    var y = event.clientY - event.offsetY;
    $(".choose").css({'display':'block','top':y-80,'left':x-110});
}

$('.cho-stop').click(function(){
    $(this).parents('.choose').hide();
    // $('tr').removeClass('trstop');
})

$('.cho-continue').click(function(){
    $(this).parents('.choose').hide();
    $('tr').removeClass('trcont');
})

$('.cho-again').click(function(){
    $(this).parents('.choose').hide();
    $('tr').removeClass('traga');
})
$('.cho-logout').click(function(){
    $(this).parents('.choose').hide();
    $('tr').removeClass('trlogout');
})
$('body').on('click','.cho-cancel',function(){
    //console.log('chocancel');
    $(this).parents('.choose').hide();
    $('tr').removeClass('trstop trcont traga trdel selected');
});

// 编辑按钮
$('body').on('click','.editbtn,.view-cont',function(){
    sessionStorage.setItem('editTableItem',$(this).parents('tr').find('.checkone').find('input').attr('id'));
})

/*popwindow*/

//新建资源下拉框
$(document).on('click','.catonew',function(){
    if($('.tonewlist').is(':hidden')){
        $('.catonew i').removeClass('icon-arrow-bottom').addClass('icon-arrow-top');
        $('.tonewlist').show();
    }else{
        $('.catonew i').removeClass('icon-arrow-top').addClass('icon-arrow-bottom');
        $('.tonewlist').hide();
    }
})



$(function() {
    //查看详情
    $(document).on('click','.view-cont',function(event) {
        $('.viewdetail').css({'height':'100%','padding-top':'130px'});
        $('.detadiv').animate({
            'margin-right':'0'
        },500);
        $(document).one("click",
            function() { 
                $('.detadiv').animate({
                    'margin-right':'-516px'
                },500,function(){
                    $('.viewdetail').css({'height':'0','padding-top':'0'});
                });
            });
        event.stopPropagation(); 
    }) 
    $(".viewdetail").click(function(event) {
        event.stopPropagation(); 
    });
    $('.viewclose').click(function(){
        $('.detadiv').animate({
            'margin-right':'-516px'
        },500,function(){
            $('.viewdetail').css({'height':'0','padding-top':'0'});
        });
    })
});

// 表格删除
$('body').on('click','.j-del-tr',function() {
    if($(this).hasClass('j-uses')) {
        var userName = [];
        $('tr.selected').each(function() {
            userName.push($(this).find('.checkone').find('input').attr('id'));
        });
        $.ajax({
            url: portVar.ajaxUrlDelete,
            type: 'get',
            dataType: 'json',
            data: {
                token:token,
                userName:JSON.stringify(userName.sort()),
                type:portVar.type
            },
            success: function(data) {
               
                tr_del(table);
                userName=[];
            }
        });
    }else if(!$(this).hasClass("j-exercise")){
        var deleteId=[];//存放删除id
        $('tr.selected').each(function() {
            deleteId.push($(this).find('.checkone').find('input').attr('id'))
        });
        console.log(deleteId.sort())
        // 模拟数据
        $.ajax({
            url: portVar.ajaxUrlDelete,
            type: 'get',
            dataType: 'json',
            data: {
                token:token,
                id:JSON.stringify(deleteId.sort()),
                type:portVar.type
            },
            success: function(data) {
                tr_del(table);
                deleteId=[];
            }
        });
    }else{
        // 演练计划删除
        var cycleDeleteId=[];//存放删除周期id
        var manualDeleteId=[];//存放删除手动id
        $('tr.selected').each(function() {
            if($(this).find('td').eq(3).text()=='周期'){
                cycleDeleteId.push($(this).find('.checkone').find('input').attr('id'));
            }else{
                manualDeleteId.push($(this).find('.checkone').find('input').attr('id'));
            }
        });
        // 删除周期
        $.ajax({
            url: portVar.ajaxUrlDelete,
            type: 'get',
            dataType: 'json',
            data: {
                token:token,
                type:'cyclePractice',
                id: cycleDeleteId.sort()
            },
            success: function(data) {
                tr_del(table);
                cycleDeleteId=[];
            }
        });
        // 删除手动
        $.ajax({
            url: portVar.ajaxUrlDelete,
            type: 'get',
            dataType: 'json',
            data: {
                token:token,
                type:'manualPractice',
                id: manualDeleteId.sort()
            },
            success: function(data) {
                tr_del(table);
                manualDeleteId=[];
            }
        });
    }
});
// 停用
$('body').on('click','.cho-stop',function (event) {
    // portVar.userName
    if ($(this).hasClass('userStop')) {
        $.ajax({
            url: portVar.ajaxUrlstop,
            type: 'get',
            dataType: 'json',
            data:{
                token:token,
                userName: $('.trstop').find('.checkone').find('input').attr('id')
            },
            success:function (data) {
                tr_stop(table);
            }
        })
    }else{
        // console.log($('.trstop').find('.checkone').find('input').attr('id'));
        $.ajax({
            url: portVar.ajaxUrlstop,
            type: 'get',
            dataType: 'json',
            data:{
                token:token,
                id: $('.trstop').find('.checkone').find('input').attr('id')
            },
            success:function (data) {

                tr_stop(table);
            }
        })
    }
    // event.stopPropagation(); 
})
// 启用
$('body').on('click','.cho-active',function () {
    // portVar.userName
    // console.log();
    if ($(this).hasClass('userActive')) {
        $.ajax({
            url: portVar.ajaxUrlActive,
            type: 'get',
            dataType: 'json',
            data:{
                token:token,
                userName: $('.tractive').find('.checkone').find('input').attr('id')
            },
            success:function (data) {
                tr_active(table);
            }
        })
    }else{
        $.ajax({
            url: portVar.ajaxUrlActive,
            type: 'get',
            dataType: 'json',
            data:{
                token:token,
                id: $('.tractive').find('.checkone').find('input').attr('id')
            },
            success:function (data) {
                tr_active(table);
            }
        })
    }
})


// 已查阅,未查阅，新编辑
$('body').on('click','.msgtype li',function() {
    $('.msgtype li').removeClass('msgact');
    $(this).addClass('msgact');
    var defaulrValue=0;
    if($(this).text()=='已查阅'){
        defaulrValue=0;
    }else if($(this).text()=='未查阅'){
        defaulrValue=1;
    }else if($(this).text()=='新编辑'){
        defaulrValue=2;
    }
    var param={
        token:token,
        defaulrValue:defaulrValue,
            type:portVar.type,//task为任务消息，alert为预警消息
        };
        table.settings()[0].ajax.data = param;
        table.ajax.reload();
    });

// 重播
$('body').on('click','.j-resend-manual',function() {
    portVar.type='manualPractice';//演练类型修改
});
$('body').on('click','.j-resend-cycle',function() {
    portVar.type='cyclePractice';//演练类型修改
});
$('body').on('click','.cho-again',function(){
    console.log(portVar)
    $.ajax({
        url: portVar.ajaxUrlReSend,
        type: 'get',
        dataType: 'json',
        data: {
            token:token,
            id: sessionStorage.getItem('chretry'),
            type:portVar.type,
        },
        success: function(data) {
            layer.open({
                title: '提示',
                content: '重播成功'
            });
        }
    });
});

// 审核未通过
$('body').on('click','.notpass',function(){
    $.ajax({
        url: portVar.ajaxUrlUnpassreason,
        type: 'get',
        dataType: 'json',
        data: {
            token:token,
            type:portVar.type,//task为任务消息，alert为预警消息
            id:$(this).parents('tr').find('.checkone').find('input').attr('id')
        },
        success: function(data) {
            $(".unword").text(data.body);
        }
    });
});

// 审核通过
$('body').on('click','.j-audit-yes',function(){
    $.ajax({
        url: portVar.ajaxUrlMessageAudit,
        type: 'get',
        dataType: 'json',
        data: {
            token:token,
            type:portVar.type,//task为任务消息，alert为预警消息
            pass:true,//是否通过
            id: sessionStorage.getItem('auditId')
        },
        success: function(data) {
            layer.open({
                title: '提示',
                content: '审核通过',
                yes: function(index, layero){
                    location.reload();
                }
            });
        }
    });
});

// 审核不通过
$('body').on('click','.j-audit-no',function(){
    $.ajax({
        url: portVar.ajaxUrlMessageAudit,
        type: 'get',
        dataType: 'json',
        data: {
            token:token,
            type:portVar.type,//task为任务消息，alert为预警消息
            pass:false,//是否通过
            id: sessionStorage.getItem('auditId'),
            reason:editor_a.getPlainTxt()//未通过理由
        },
        success: function(data) {
            layer.open({
                title: '提示',
                content: '审核不通过',
                yes: function(index, layero){
                    location.reload();
                }
            });
        }
    });
});


// 消息接入启用关闭
$('body').on('click', '.portbtn', function() {
    if ($(this).hasClass('porclose')) {
        $(this).html("<i class='iconfont icon-qiyong'></i>启用");
        $(this).removeClass('porclose').addClass('porusing');
    } else {
        $(this).html("<i class='iconfont icon-guanbi2'></i>关闭");
        $(this).removeClass('porusing').addClass('porclose');
    }
});

// 文字语音转换按钮
$(document).on('click','.convert',function(){
    $('.popwindow').show();
    $('.toshift').show();
    $('.matlist li ').eq(0).find('input').prop('checked',true);
    //$('.succmat').hide();
});


// 资源信息
$('body').on('click','.resnav',function(){
    if($(this).hasClass('navtree')){
        $(this).removeClass('navtree');
        //表格切换
        $('.thetab').hide();
        $('.treediv').hide();
        $('#table-main').show();
    }else{
        $(this).addClass('navtree');
        //目录树切换
        $('.thetab').hide();
        $('.treediv').show();
        $('#treea').show();
    }
});
$('body').on('click','.resolist li',function(){
    $(this).parent().find('li').removeClass('resact');
    $(this).addClass('resact');
});
$('body').on('click','.resolist-confirm li,.resolist-status li',function(){
    var param={
        token:token,
        confirm:$(".resolist-confirm li.resact").attr('resval')==="false" ? false : true,//true确认,false未确认
        status:parseInt($(".resolist-status li.resact").attr('resval')),//可以0-全部，1-正常，2-异常
    };
    table.settings()[0].ajax.data = param;
    table.ajax.reload();
    // table.ajax.url( portsrc+$(".resolist-res li.resact").attr('resval') ).load();
});
// 平台资源信息
$('body').on('click','.j-platform',function(){
    portVar={
        ajaxUrlDelete:portsrc + '/res/platform/delete',
        type:'',
    };
    var html='<table class="table-main display" cellspacing="0" width="100%">'+
    '   <thead>'+
    '       <tr>'+
    '           <th></th>'+
    '           <th>序号</th>'+
    '           <th>编码</th>'+
    '           <th>工作状态</th>'+
    '           <th>平台类别</th>'+
    '           <th>系统类别</th>'+
    '           <th>平台名称</th>'+
    '           <th>服务器地址</th>'+
    '           <th>所属地区</th>'+
    '           <th>创建时间</th>'+
    '           <th>操作</th>'+
    '           <th></th>'+
    '       </tr>'+
    '   </thead>'+
    '   <tfoot>'+
    '       <tr>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '       </tr>'+
    '   </tfoot>'+
    '   <tbody></tbody>'+
    '</table>';
    $("#table-main .tablecont").html(html);
    table = $('#table-main table').DataTable({
        "scrollY": "calc(100% - 50px)",
        "scrollX": true,
        "dom": '<"top"f >rt<"bottom"ilp><"clear">',//dom定位
        "dom": 'tiprl',//自定义显示项
        "lengthMenu":[10, 20, 30, 40, 50],//每页显示条数设置
        "lengthChange": true,//是否允许用户自定义显示数量
        "bPaginate": true, //翻页功能
        "bFilter": true, //列筛序功能
        "searching": true,//本地搜索
        "order": [ 1, "asc" ],//desc降序
        "Info": true,//页脚信息
        "oLanguage": oLanguage,
        "ajax": {
            url: portsrc+'/res/platform/all',
            type: 'post',
            data:{
                token:token,
                confirm:$(".resolist-confirm li.resact").attr('resval')==="false" ? false : true,//true确认,false未确认
                status:parseInt($(".resolist-status li.resact").attr('resval')),//可以0-全部，1-正常，2-异常
            },
            dataSrc: function ( data ) {
                console.log(data)
                for ( var i=0, ien=data.body.length ; i<ien ; i++ ) {
                    var d=data.body[i];
                    data.body[i].checkbox="<div class='checkone'><input type='checkbox' name='checkone' id='"+d.id+"' /><label for='"+d.id+"'></label></div>";//复选框
                    data.body[i].tabnumb="<span class='tabnumb'>"+(d.id+1)+"</span>";//序号

                    data.body[i].state='<span class="statecol">'+d.state+'</span>';
                    
                    data.body[i].time="无";
                    data.body[i].platformName="<a href='#/viewPlatResoInfo' url='components/viewPlatResoInfo.html' class='view-cont add_tab' name='查看平台资源信息'>"+d.platformName+"</a>";
                    data.body[i].edit="<a href='#/editPlatResoInfo' url='components/editPlatResoInfo.html' class='editbtn add_tab' name='编辑平台资源信息'><i class='iconfont icon-bianji'></i>编辑</a>"
                    data.body[i].delete="<span class='del delete'><i class='iconfont icon-shanchu'></i>删除</span>";
                }
                
                return data.body;
            }
        },
        "columns": [
        { "data": "checkbox" },
        { "data": "tabnumb" },
        { "data": "resourceCode" },
        { "data": "status" },
        { "data": "platformType" },
        { "data": "systemType" },
        { "data": "platformName" },
        { "data": "ipAddress" },
        { "data": "areaStruct" },
        { "data": "time" },
        { "data": "edit" },
        { "data": "delete" }
        ],
        "columnDefs": [
        {
            orderable: false,
                targets: [0,2,3,4,5,6,7,8,10,11] //禁止排序
            }
            ],
            fnDrawCallback: function(table) {  
                jumpPage($("#table-main"))
            },
        initComplete: function () {//列筛选
            var api = this.api();
            api.columns().indexes().flatten().each(function (i) {
                if (i == 3 || i == 4 || i == 5 || i == 8) { // 对第i列进行筛选
                    var column = api.column(i);
                    rowScreen(column);
                }
            });
        }
    });
    userDef(table);//table配置--显示数量 搜索 全选 删除 
});
// 下级终端
$('body').on('click','.j-sub',function(){
    portVar={
        ajaxUrlDelete:portsrc + '/res/sub/delete',
        type:'',
    };
    var html='<table class="table-main display" cellspacing="0" width="100%">'+
    '   <thead>'+
    '       <tr>'+
    '           <th></th>'+
    '           <th>序号</th>'+
    '           <th>编码</th>'+
    '           <th>工作状态</th>'+
    '           <th>设备类型名称</th>'+
    '           <th>型号</th>'+
    '           <th>终端物理地址</th>'+
    '           <th>IP地址</th>'+
    '           <th>所属地区</th>'+
    '           <th>在线信息</th>'+
    '           <th>操作</th>'+
    '           <th></th>'+
    '       </tr>'+
    '   </thead>'+
    '   <tfoot>'+
    '       <tr>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '       </tr>'+
    '   </tfoot>'+
    '   <tbody></tbody>'+
    '</table>';
    $("#table-main .tablecont").html(html);
    table = $('#table-main table').DataTable({
        "scrollY": "calc(100% - 50px)",
        "scrollX": true,
        "dom": '<"top"f >rt<"bottom"ilp><"clear">',//dom定位
        "dom": 'tiprl',//自定义显示项
        "lengthMenu":[10, 20, 30, 40, 50],//每页显示条数设置
        "lengthChange": true,//是否允许用户自定义显示数量
        "bPaginate": true, //翻页功能
        "bFilter": true, //列筛序功能
        "searching": true,//本地搜索
        "order": [ 1, "asc" ],//desc降序
        "Info": true,//页脚信息
        "oLanguage": oLanguage,
        "ajax": {
            url: portsrc+'/res/sub/all',
            type: 'post',
            data:{
                token:token,
                confirm:$(".resolist-confirm li.resact").attr('resval')==="false" ? false : true,//true确认,false未确认
                status:parseInt($(".resolist-status li.resact").attr('resval')),//可以0-全部，1-正常，2-异常
            },
            dataSrc: function ( data ) {
                console.log(data)
                for ( var i=0, ien=data.body.length ; i<ien ; i++ ) {
                    var d=data.body[i];
                    data.body[i].checkbox="<div class='checkone'><input type='checkbox' name='checkone' id='"+d.id+"' /><label for='"+d.id+"'></label></div>";//复选框
                    data.body[i].tabnumb="<span class='tabnumb'>"+(d.id+1)+"</span>";//序号

                    data.body[i].state='<span class="statecol">'+d.state+'</span>';
                    
                    if (data.body[i].deviceType=='1') {
                        data.body[i].deviceType='室外音柱'
                    }else if (data.body[i].deviceType=='2') {
                        data.body[i].deviceType='室外收扩机'
                    }if (data.body[i].deviceType=='3') {
                        data.body[i].deviceType='大喇叭适配器'
                    }if (data.body[i].deviceType=='4') {
                        data.body[i].deviceType='接收控制器'
                    }if (data.body[i].deviceType=='5') {
                        data.body[i].deviceType='室内收扩机'
                    }
                    data.body[i].deviceType='<a href="#/viewJuniorTerminal" url="components/viewJuniorTerminal.html" class="view-cont add_tab" name="查看下级终端">'+data.body[i].deviceType+'</a>';

                    data.body[i].edit='<a href="#/editJuniorTerminal" url="components/editJuniorTerminal.html" class="editbtn add_tab" name="编辑下级终端"><i class="iconfont icon-bianji"></i>编辑</a>';
                    data.body[i].delete="<span class='del delete'><i class='iconfont icon-shanchu'></i>删除</span>";
                    data.body[i].msg="在线消息";

                    
                }
                
                return data.body;
            }
        },
        "columns": [
        { "data": "checkbox" },
        { "data": "tabnumb" },
        { "data": "resourceCode" },
        { "data": "status" },
        { "data": "deviceType" },
        { "data": "version" },
        { "data": "macAddress" },
        { "data": "ipAddress" },
        { "data": "areaStruct" },
        { "data": "msg" },
        { "data": "edit" },
        { "data": "delete" }
        ],
        "columnDefs": [
        {
            orderable: false,
                targets: [0,2,3,4,5,6,7,8,9,10,11] //禁止排序
            }
            ],
            fnDrawCallback: function(table) {  
                jumpPage($("#table-main"))
            },
        initComplete: function () {//列筛选
            var api = this.api();
            api.columns().indexes().flatten().each(function (i) {
                if (i == 3 || i == 4 || i == 5 || i == 8) { // 对第i列进行筛选
                    var column = api.column(i);
                    rowScreen(column);
                }
            });
        }
    });
    userDef(table);//table配置--显示数量 搜索 全选 删除 
});
// 发射台
$('body').on('click','.j-station',function(){
    portVar={
        ajaxUrlDelete:portsrc + '/res/station/delete',
        type:'',
    };
    var html='<table class="table-main display" cellspacing="0" width="100%">'+
    '   <thead>'+
    '       <tr>'+
    '           <th></th>'+
    '           <th>序号</th>'+
    '           <th>编码</th>'+
    '           <th>工作状态</th>'+
    '           <th>发射台名称</th>'+
    '           <th>物理地址</th>'+
    '           <th>IP地址</th>'+
    '           <th>所属地区</th>'+
    '           <th>在线信息</th>'+
    '           <th>操作</th>'+
    '           <th></th>'+
    '       </tr>'+
    '   </thead>'+
    '   <tfoot>'+
    '       <tr>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '           <th></th>'+
    '       </tr>'+
    '   </tfoot>'+
    '   <tbody></tbody>'+
    '</table>';
    $("#table-main .tablecont").html(html);
    table = $('#table-main table').DataTable({
        "scrollY": "calc(100% - 50px)",
        "scrollX": true,
        "dom": '<"top"f >rt<"bottom"ilp><"clear">',//dom定位
        "dom": 'tiprl',//自定义显示项
        "lengthMenu":[10, 20, 30, 40, 50],//每页显示条数设置
        "lengthChange": true,//是否允许用户自定义显示数量
        "bPaginate": true, //翻页功能
        "bFilter": true, //列筛序功能
        "searching": true,//本地搜索
        "order": [ 1, "asc" ],//desc降序
        "Info": true,//页脚信息
        "oLanguage": oLanguage,
        "ajax": {
            url: portsrc+'/res/station/all',
            type: 'post',
            data:{
                token:token,
                confirm:$(".resolist-confirm li.resact").attr('resval')==="false" ? false : true,//true确认,false未确认
                status:parseInt($(".resolist-status li.resact").attr('resval')),//可以0-全部，1-正常，2-异常
            },
            dataSrc: function ( data ) {
                console.log(data)
                for ( var i=0, ien=data.body.length ; i<ien ; i++ ) {
                    var d=data.body[i];
                    data.body[i].checkbox="<div class='checkone'><input type='checkbox' name='checkone' id='"+d.id+"' /><label for='"+d.id+"'></label></div>";//复选框
                    data.body[i].tabnumb="<span class='tabnumb'>"+(d.id+1)+"</span>";//序号

                    data.body[i].state='<span class="statecol">'+d.state+'</span>';
                    
                    data.body[i].edit='<a href="#/editStationResoInfo" url="components/editStationResoInfo.html" class="editbtn add_tab" name="编辑台站资源信息"><i class="iconfont icon-bianji"></i>编辑</a>';
                    data.body[i].delete="<span class='del delete'><i class='iconfont icon-shanchu'></i>删除</span>";
                    data.body[i].msg="在线信息";
                }
                
                return data.body;
            }
        },
        "columns": [
        { "data": "checkbox" },
        { "data": "tabnumb" },
        { "data": "resourceCode" },
        { "data": "status" },
        { "data": "name" },
        { "data": "macNo" },
        { "data": "ipAddress" },
        { "data": "areaStruct" },
        { "data": "msg" },
        { "data": "edit" },
        { "data": "delete" }
        ],
        "columnDefs": [
        {
            orderable: false,
                targets: [0,2,3,4,5,6,7,8,9,10] //禁止排序
            }
            ],
            fnDrawCallback: function(table) {  
                jumpPage($("#table-main"))
            },
        initComplete: function () {//列筛选
            var api = this.api();
            api.columns().indexes().flatten().each(function (i) {
                if (i == 3 || i == 4 || i == 5 || i == 8) { // 对第i列进行筛选
                    var column = api.column(i);
                    rowScreen(column);
                }
            });
        }
    });
    userDef(table);//table配置--显示数量 搜索 全选 删除 
});