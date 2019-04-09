$(function() {
	$("#up").change(function() {
		imageDeal(this, dealChange);
	});
})
var dealChange = function(blob, base64) {
	var fd = new FormData();
	fd.append("file", blob); //fileData为自定义   
	//fd.append("houzhui", ".jpg");
	$.ajax({
		type: "post",
		url: "/file/upload",
		async: true,
		data: fd,
		processData: false,
		contentType: false,
		success: function(r) {
 
		}
	});
}
//2  从input元素中，获取到file并转成base64，然后调用缩放方法
var imageDeal = function(ele, returnBase64) {
	//获取file，转成base64
	var file = ele.files[0]; //取传入的第一个文件
	if(undefined == file) { //如果未找到文件，结束函数，跳出
		return;
	}
	console.log("fileSize" + file.size);
	console.log(file.type);
 
	var r = new FileReader();
	r.readAsDataURL(file);
	r.onload = function(e) {
		var base64 = e.target.result;
		var bili = 1.5;
		console.log("压缩前：" + base64.length);
		suofang(base64, bili, returnBase64);
	}
}
var suofang = function(base64, bili, callback) {
	console.log("执行缩放程序,bili=" + bili);
	//处理缩放，转格式
	var _img = new Image();
	_img.src = base64;
	_img.onload = function() {
		var _canvas = document.createElement("canvas");
		var w = this.width / bili;
		var h = this.height / bili;
		_canvas.setAttribute("width", w);
		_canvas.setAttribute("height", h);
		_canvas.getContext("2d").drawImage(this, 0, 0, w, h);
		var base64 = _canvas.toDataURL("image/jpeg");
		_canvas.toBlob(function(blob) {
			console.log(blob.size);
			
			if(blob.size > 1024*10){
				suofang(base64, bili, callback);
			}else{
				callback(blob, base64);
			}
		}, "image/jpeg");
	}
}