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