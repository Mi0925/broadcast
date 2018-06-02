//添加和编辑调度方案
var schedulingForm=function(data) {
	var listMP3=[];
	$(".filelist li").each(function() {
		listMP3.push($(this).find(".thename").text());
	});
	console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
	data.field.peopleAffect=$(".j-peopleAffect").text();
	data.field.startTime=data.field.time.split(' - ')[0];
	data.field.endTime=data.field.time.split(' - ')[1];
	data.field.coverArea=$(".j-coverArea").text();
	data.field.department=$(".j-department").text();
	data.field.dutyPerson=$(".j-dutyPerson").text();
	data.field.listMP3=listMP3;
	data.field.areaSel=$.fn.zTree.getZTreeObj("gb_tree_areaSel")==null?[]:$.fn.zTree.getZTreeObj("gb_tree_areaSel").getNodes();
	data.field.resourceSel=$.fn.zTree.getZTreeObj("gb_tree_resourceSel")==null?[]:$.fn.zTree.getZTreeObj("gb_tree_resourceSel").getNodes();
	return data;
}

//预警消息
var warnMsgForm=function(data) {
	var listMP3=[];
	$(".filelist li").each(function() {
		listMP3.push($(this).find(".thename").text());
	});
	data.field.listMP3=listMP3;
	data.field.department=$(".j-department").text();
	data.field.dutyPerson=$(".j-dutyPerson").text();
	return data;
}





