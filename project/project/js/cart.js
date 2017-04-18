$(function(){
	/*
		1、读取cookie   readCookie
	 	2、设置cookie   setCookie
	 	3、将cookie中的数据渲染到页面上   initData
	 	4、数量增加
	 	5、数量减少
	 	6、直接输入
	 	7、删除
	 	8、选中
	 	9、结算信息填充
	*/
	var Cart = {
		//初始化页面内容
		init: function(){
			var _this = this;
			
			//添加头部
			$('.header-wrapper').load("register-nav.html");
			
			//添加尾部
			$('.footer-wrapper').load('footer.html');
						
		},
	};
	Cart.init();
});