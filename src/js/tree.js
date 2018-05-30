// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var areaSetting = {//地区配置
	view:{
		showLine:false,//去掉连接线
	},
	check:{//添加复选框
		enable:true,
	},
	callback: {
		onCheck: areaZTreeOnCheck
	}
};
var resourceSetting = {//资源配置
	view:{
		showLine:false,//去掉连接线
	},
	check:{//添加复选框
		enable:true,
	},
	callback: {
		onCheck: resourceZTreeOnCheck
	}
};
var selSetting = {
	view:{
		showLine:false,//去掉连接线
		// addDiyDom:addDiyDom
	}
};
var areaSel=[];//存储选择地区传给后台的省市


//地区：勾选复选框将触发这个方法，在这里调用ajax获取已选数据
function areaZTreeOnCheck(event, treeId, treeNode) {
	$.fn.zTree.init($('#gb_tree_areaSel'), selSetting);//初始化已选地区树
    // 传给后台省份：浙江省-杭州市
    var checked=treeNode.checked;
    var areaSelItem=$("#"+treeNode.parentTId+">a").text()==""?treeNode.name:$("#"+treeNode.parentTId+">a").text()+'-'+treeNode.name;
    if(checked){
    	areaSel.push(areaSelItem);
    }else{
    	for (var i = 0; i < areaSel.length; i++) {
    		if(areaSel[i]==areaSelItem){
    			areaSel.splice(i,1)
    		}
    	}
    };
	// 获取地区接口
	$.ajax({
	    url: portsrc+'/areaSelect',
	    type: 'post',
	    dataType: 'json',
	    data:{
	    	token:token,
	    	data:JSON.stringify(areaSel)
	    },
	    success: function(data) {
	    	var data=data.body,
	    		resourceGather=[],//全部资源
	    		precount_num=0,//覆盖人口
				area_num=0,//覆盖面积
				selTree=[],//存放树选择的数据
    			treeArea = $.fn.zTree.getZTreeObj("gb_tree_area"),//获取全部地区树
    			treeAreaSel = $.fn.zTree.getZTreeObj("gb_tree_areaSel"),//获取已选地区的树
	    		treeAreaChoose=treeArea.getCheckedNodes(true);//获取全部地区勾选的数据


    		for (var i = 0; i < treeAreaChoose.length; i++) {
    			if(treeAreaChoose[i].level==0){//只添加1级的树
    				selTree.push(treeAreaChoose[i]);
    			};
    		};
			$.fn.zTree.init($('#gb_tree_areaSel'), selSetting, selTree);//初始化已选地区的树
			var nodes = treeAreaSel.getCheckedNodes(false);//获取已选地区未勾选的数据
			for (var i=0, l=nodes.length; i < l; i++) {
				treeAreaSel.removeNode(nodes[i]);//删除已选地区未勾选的数据
			};
	    	for (var i = 0; i < data.length; i++) {
	    		precount_num=precount_num+data[i].areaStruct.population;//勾选地区计算人口
	    		area_num=area_num+data[i].areaStruct.area;//勾选地区计算面积
	    		resourceGather.push(data[i].resourceData[0]);//全部资源数据
	    	};
			$.fn.zTree.init($('#gb_tree_resource'),resourceSetting,resourceGather);//初始全部资源树
	    	$("#precount_num").text(precount_num);
	    	$("#area_num").text(area_num);
	    }
	});
};
//资源：勾选复选框将触发这个方法，在这里调用ajax获取已选数据
function resourceZTreeOnCheck(event, treeId, treeNode) {
	$.fn.zTree.init($('#gb_tree_resourceSel'), selSetting);//初始化已选资源树
	var treeResource = $.fn.zTree.getZTreeObj("gb_tree_resource"),//获取全部资源树
		treeResourceSel = $.fn.zTree.getZTreeObj("gb_tree_resourceSel"),//获取已选资源树
		treeResourceChoose=treeResource.getCheckedNodes(true),//获取全部资源勾选的数据
		selTree=[];//存放树选择的数据

	for (var i = 0; i < treeResourceChoose.length; i++) {
		if(treeResourceChoose[i].level==0){
			selTree.push(treeResourceChoose[i]);
		}
	}
	$.fn.zTree.init($('#gb_tree_resourceSel'), selSetting, selTree);//初始化已选资源树
	var nodes = treeResourceSel.getCheckedNodes(false);//获取已选资源未勾选的数据
	for (var i=0, l=nodes.length; i < l; i++) {
		treeResourceSel.removeNode(nodes[i]);//删除已选资源未勾选的数据
	}
};


// 初始化树
// function ztree_Initialize(argument) {
// 	//带关闭按钮的树
// 	$(".ztree-close").each(function() {
// 		$.fn.zTree.init($(this), selSetting, zNodes);
// 	});
// 	//带复选框的树
// 	$(".ztree-check").each(function() {
// 		$.fn.zTree.init($(this), allSetting, zNodes);
// 	});
// }

// 添加树关闭按钮点击事件
$("body").on('click', '.ztree .tree-close', function(event) {
	var bool = confirm('确定删除吗？');
    if (bool) {
		removeDom($(this).parents(".ztree").attr("id"))
    }
});
// 添加树关闭按钮
function addDiyDom(treeId, treeNode) {
	var aObj = $("#" + treeNode.tId + "_a");
	if ($("#diyBtn_"+treeNode.id).length>0) return;
	var editStr ="<i class='iconfont icon-guanbi1 tree-icon tree-close'></i>";
	aObj.append(editStr);
	// var btn = $("#diyBtn_"+treeNode_id);
	// btn.bind("click", function(){
	// 	removeDom("gb_tree_sel1")
	// })
};

// 添加树增加、删除、关闭
function resourceDom(treeId, treeNode) {
	var aObj = $("#" + treeNode.tId + "_a");
	var editStr="";
	if ($("#diyBtn_"+treeNode.id).length>0) return;
	if(treeNode.editIcon){
		editStr +='<a<a href="#/'+treeNode.treedit+'" class="add_tab" url="components/'+treeNode.treedit+'.html" name="编辑"><i class="iconfont icon-bianji tree-icon tree-add"> 编辑</i></a>';
	};
	if(treeNode.removeIcon){
		editStr +='<i class="iconfont icon-guanbi1 tree-icon tree-close"> 删除</i>';
	};
	if(treeNode.addIcon){
		//console.log(treeNode.treeadd);
		editStr +='<a href="#/'+treeNode.treeadd+'" class="add_tab" url="components/'+treeNode.treeadd+'.html" name="新建"><i class="iconfont icon-xinjian tree-icon tree-edit"> 增加</i></a>';
	};
	aObj.append('<div class="tree-icon-box">'+editStr+'</div>');
	// var btn = $("#diyBtn_"+treeNode_id);
	// btn.bind("click", function(){
	// 	removeDom("gb_tree_sel1")
	// })
};

// 树关闭事件
function removeDom($this) {
	setTimeout(function(){
		var zTree = $.fn.zTree.getZTreeObj($this),
		nodes = zTree.getSelectedNodes(),
		treeNode = nodes[0];
		if (nodes.length == 0) {
			alert("请先选择一个节点");
			return;
		}
		var callbackFlag = $("#callbackTrigger").attr("checked");
		zTree.removeNode(treeNode, callbackFlag);
	},100)
};

