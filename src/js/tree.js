// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
// var selSetting = {
// 	view:{
// 		showLine:false,//去掉连接线
// 		addDiyDom:addDiyDom
// 	}
// };
// var allSetting = {
// 	view:{
// 		showLine:false,//去掉连接线
// 	},
// 	check:{//添加复选框
// 		enable:true,
// 	}
// };


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
	removeDom($(this).parents(".ztree").attr("id"))
});
// 添加树关闭按钮
function addDiyDom(treeId, treeNode) {
	var aObj = $("#" + treeNode.tId + "_a");
	if ($("#diyBtn_"+treeNode.id).length>0) return;
	var editStr ="<i class='iconfont icon-guanbi1 tree-close'></i>";
	aObj.append(editStr);
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