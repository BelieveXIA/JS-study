window.onload = function(){
	var box = document.getElementById('container');//容器对象

	var imgs = box.getElementsByTagName('img');//获得图片NodeList对象集合  数组

	var imgWidth = imgs[0].offsetWidth;//单张图片的宽度
	var exposeWidth = 160;//经过隐藏后，每张图片露出的宽度

	//总容器宽度
	var boxWidth = imgWidth +(imgs.length-1)*exposeWidth;
	box.style.width =boxWidth+'px';
	
	//设置每道门的初始位置，只用从第二道门开始设就好，第一个已经排好了在最左边边距为零
	function setImgsPos(){
		for (var i = 1; i < imgs.length; i++) {
			imgs[i].style.left=imgWidth + exposeWidth*(i -1)+"px";
		}
	}
	setImgsPos();
	//每道门打开应移动的距离，就是图片的宽度 - 现在部分隐藏图片的显示出来的宽度=每个图片隐藏的宽度
	var translate = imgWidth - exposeWidth;

	//为每道门绑定事件
	for (var i = 0; i < imgs.length; i++) {
		//使用立即调用的函数表达式，为了获得不同的i值
		(function(i){

			imgs[i].onmouseover = function(){
				//先将每道门复位
				setImgsPos();//这步是为了：一、鼠标触摸第一张图片时的效果；二、所以图片复位后再根据触摸的图片移动
				for (var j = 1; j <= i; j++) {//触摸第二张图片起，再对图片设位置
					imgs[j].style.left = parseInt(imgs[j].style.left,10) - translate+"px";
				}
			}
		}(i));
	}
}