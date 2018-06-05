//添加和编辑调度方案
var schedulingForm=function(data) {
	var listMP3=[];
	$(".filelist li").each(function() {
		listMP3.push($(this).find(".thename").text());
	});
	console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
	data.field.direct=data.field.direct==="false" ? false : true;
	data.field.peopleAffect=$(".j-peopleAffect").text();
	data.field.startTime=data.field.time.split(' - ')[0];
	data.field.endTime=data.field.time.split(' - ')[1];
	data.field.area=$(".j-coverArea").text();
	data.field.department=$(".j-department").text();
	data.field.dutyPerson=$(".j-dutyPerson").text();
	data.field.listMP3=listMP3;

	data.field.allArea=render($.fn.zTree.getZTreeObj("gb_tree_area")==null?[]:$.fn.zTree.getZTreeObj("gb_tree_area").getNodes());//所有地区

	data.field.coverArea=render($.fn.zTree.getZTreeObj("gb_tree_areaSel")==null?[]:$.fn.zTree.getZTreeObj("gb_tree_areaSel").getNodes());//选择地区

	data.field.allSystrmResource=render($.fn.zTree.getZTreeObj("gb_tree_resource")==null?[]:$.fn.zTree.getZTreeObj("gb_tree_resource").getNodes());//所有资源
	
	data.field.systrmResource=render($.fn.zTree.getZTreeObj("gb_tree_resourceSel")==null?[]:$.fn.zTree.getZTreeObj("gb_tree_resourceSel").getNodes());//选择资源
	delete data.field.time;
	return data;
};
// 递归树形结构数据
function render(arr,level){
    var level=level||0;
    level++;
    var i= 0,len=arr.length;
    var str=[];
    for(;i<len;i++){
        str.push({
        	name:arr[i].name,
        	population:arr[i].population,
        	area:arr[i].area,
        	resourceData:null,
        	children:[],
        	checked:arr[i].checked
        });
        if(arr[i].children&&arr[i].children.length>0){
            str[i].children=render(arr[i].children,level);
        }
    }
    return str;
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





