$(function(){
	/*二级导航栏操作*/
	$(".header .icon").mouseenter(function(){
		$('.header .second-header').show();		
		$('.header .second-header').hover(function(){
			$(this).show();
		},function(){
			$(this).hide();
		});
	});
	$(".header .icon").mouseleave(function(){
		$('.header .second-header').hide();
	});
	
	//三级导航
	var tab = {
		//初始化属性
		init: function(){
			this.navWrapper = $('.main-col1 .menu-top');
			this.navItem = $('.main-col1 .menu-top a');			
			this.dropWrapper = $('.main-col1 .menu-top .menu-drop');
			this.dropItem = $('.main-col1 .menu-top .menu-drop .drop-item');
			
			this.navWrapperHover();
			this.navHover();		
		},	
		//鼠标移到选项盒子上，三级菜显示
		navWrapperHover: function(){
			var _this = this;
			this.navWrapper.mouseleave(function(){
				_this.dropWrapper.hide();
				_this.navItem.removeClass('active');
			});
		},
		
		navHover: function(){
			var _this = this;
			this.navItem.mouseenter(function(){
				_this.dropWrapper.show();
				var index = $(this).index();
				$(this).addClass("active").siblings().removeClass("active");
				_this.dropItem.eq(index).show().siblings().hide();
			});
		}
	};
	tab.init();
	
	//登录注册
	var loginup = {
		login: $('.header .login'),
		logup: $('.header .logup'),
		
		init: function(){
			this.login.click(function(){
				location.href = "login.html";
			});
			this.logup.click(function(){
				location.href = "register.html";
			});
		}
	};
	loginup.init();
	
	//轮播图
	var slider = {
		//初始化属性
		slider: $('.slider'),
		sliderWrap: $('.slider .img'),
		imgs: $('.slider .img img'),
		arrows: $('.slider .arrow'),
		arrowL: $('.slider .arrow-left'),
		arrowR: $('.slider .arrow-right'),
		lists: $('.slider .list'),
		timer: null,
		now: 0,
		next: 0,
		
		
		//初始化函数
		init: function(){
			//默认让第一张显示
			this.imgs.eq(0).show();
						
			//调用初始化小圆圈函数
			this.listInit();
			
			//调用小圆圈事件
			this.listsEvent();
			
			//调用自动轮播函数
			this.autoPlay();
			
			//鼠标悬停
			this.mouseHover();
			
			//点击切换
			this.arrowClick();
		},
		
		//初始化小圆圈
		listInit: function(){
			for(var i=0; i<this.imgs.length; i++){
				var span = $('<span>'+(i+1)+'</span>');
				this.lists.append(span);
			};
			//默认让第一个小圆点显示
			this.lists.children().eq(0).addClass('on');
		},
		
		//小圆圈事件
		listsEvent: function(){
			var _this = this;
			//this.lists.click();这中写法都用on写
			this.lists.on('mouseenter',"span",function(){
				//$(this)当前点击的元素对象					
				$(this).addClass('on').siblings().removeClass('on');
				_this.next = $(this).index();
				_this.imgSwitch();
			});
		},
		
		//点击切换
		arrowClick: function(){
			var _this = this;
			this.arrowL.click(function(){console.log(_this.now,_this.next);								
				//左边界处理
				if(_this.next <= 0){
					_this.next = _this.imgs.length;
				};
				//先判断在减减就好使
				_this.next--;
				_this.imgSwitch();
			});
			//右边点击
			this.arrowR.click(function(){
				_this.next++;
				//右边界处理
				if(_this.next >= _this.imgs.length){
					_this.next = 0;
				}
				_this.imgSwitch();console.log(_this.now,_this.next);
			});
		},
		
		//自动轮播
		autoPlay: function(){
			var _this = this;
			this.timer = setInterval(function(){
				_this.next++;
				//右边界处理
				if(_this.next >= _this.imgs.length){
					_this.next = 0;
				}
				_this.imgSwitch();
			},2000);
		},
		
		//图片切换
		imgSwitch: function(){
			
			
			//图片淡入淡出			
			this.imgs.eq(this.now).stop(true).fadeOut(function(){});
			this.imgs.eq(this.next).stop(true).fadeIn(function(){});
			
			//小圆点跟随			
			this.lists.children().eq(this.now).removeClass('on');
			this.lists.children().eq(this.next).addClass('on');
			this.now = this.next;							
		},
		
		//鼠标悬停
		mouseHover: function(){
			var _this = this;
			this.slider.hover(
				function(){
					_this.arrows.animate({opacity: 0.7},500);
					clearInterval(_this.timer);	
				},
				function(){
					_this.arrows.animate({opacity: 0},500);
					_this.autoPlay();
				}
			);
		}
	};
	slider.init();
	
	
	//滚动轮播
	var sliderTwo = {
		slider: $('.hot-sale-l'),
		imgWrap: $('.hot-sale .img-wrap'),
		imgs: $('.hot-sale .img-wrap img'),
		arrowR: $('.hot-sale .arrow-right'),
		arrowL: $('.hot-sale .arrow-left'),
		circleWrap: $('.hot-sale .circle-wrapper'),
		circleItem: null,
		index: 0,
		timer: null,
		
		//初始化函数
		init: function(){
			this.createCircle();
			
			this.autoPlay();
			
			this.firstImg();
			
			this.mouseHover();
			
			this.arrowRClick();
			
			this.arrowLClick();
			
			this.circleItemClick();
		},
		
		//动态添加第一张图片
		firstImg: function(){
			//this.imgs.eq(0).clone(true).append(this.imgWrap);
			var first = this.imgWrap.children().eq(0).clone();
			this.imgWrap.append(first);
			
			//添加完后更新图片的张数
			this.imgs = $('.hot-sale .img-wrap img');
		},
		
		//初始化小圆圈
		createCircle: function(){
			for(var i=0; i<this.imgs.length; i++){
				var span = $('<span class="circle-item"></span>');
				this.circleWrap.append(span);
			};
			this.circleItem = $('.hot-sale .circle-item');
			//默认让第一个小圆点显示
			this.circleItem.eq(0).addClass('active');
		},
		
		//鼠标悬停
		mouseHover: function(){
			var _this = this;
			this.slider.hover(
				function(){					
					clearInterval(_this.timer);	
				},
				function(){					
					_this.autoPlay();
				}
			);
		},
		
		//自动播放
		autoPlay: function(){
			var _this = this;
			this.timer = setInterval(function(){
				_this.index++;
				_this.imgSwitch();
			},2000);
		},
		
		//右边点击切换
		arrowRClick: function(){
			var _this = this;
			this.arrowR.click(function(){
				_this.index++;
				_this.imgSwitch();
			});			
		},
		
		//左边点击切换
		arrowLClick: function(){
			var _this = this;
			this.arrowL.click(function(){
				_this.index--;
				_this.imgSwitch();
			});
		},
		
		//小圆圈事件
		circleItemClick: function(){
			var _this = this;
			this.circleItem.click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				_this.index = $(this).index();
				_this.imgSwitch();
			});
		},
		
		//图片切换
		imgSwitch: function(){
			//右边界处理
			//console.log(this.index , this.imgs.length);//this:5,6
			if(this.index>=this.imgs.length){
				this.imgWrap.css("margin-left",0);//css与attr??????
				this.index = 1;
			};
			//左边界处理
			if(this.index<0){
				this.imgWrap.css("margin-left",-400*(this.imgs.length-1));
				this.index = this.imgs.length-2;
			}
			
			//小圆圈处理
			if(this.index == this.imgs.length - 1){
				this.circleItem.eq(0).addClass('active').siblings().removeClass('active');				
			}
			
			this.imgWrap.stop(true).animate({
				marginLeft: -400 * this.index
			});
			this.circleItem.eq(this.index).addClass('active').siblings().removeClass('active');
		}
	};
	sliderTwo.init();
	
	//选项卡
	/*var tab = {
		//tabs: $('.floorsWrapper .tab-nav'),
		tab: $('.floorsWrapper .tab-nav a'),
		tabItem: $('.floorsWrapper .bd'),
		
		init: function(){console.log(this.tab);
			this.tabItem.eq(0).show();
			this.tabSwitch();
		},
		
		//切换
		tabSwitch: function(){
			var _this = this;
			this.tab.mouseenter(function(){
				var index = $(this).index();
				$(this).addClass('sel').siblings().removeClass('sel');
				_this.tabItem.eq(index).show().siblings().hide();
				console.log(_this.tabItem.eq(index));
			});
		}
	};
	tab.init();*/
	
/********详情页js*********************************************************************/	
	var goods = {
		items: $(".items-d-box li"),
		itemIntro: $(".item-intros .item"),
		
		//初始化页面内容
		init: function(){
			var _this = this;
			
			//添加头部
			$('.header-wrapper').load("nav.html");
			
			//添加尾部
			$('.footer-wrapper').load('footer.html');
			
			//
			this.tab();
		},
		
		tab: function(){
			var _this = this;
			this.items.click(function(){
				var index = $(this).index();
				$(this).addClass("hit").siblings().removeClass("hit");
				_this.itemIntro.eq(index).show().siblings().hide();
			});
		}
	};
	goods.init();
	
	//放大镜
	var glass = {
		item: $('.pic-lists .pl-img li'),
		smallWrap: $('.pic-zoom .small'),
		smallImg: $('.pic-zoom .small img'),
		fliter: $('.item-pic .pic-zoom .filter'),
		largeWrap: $(".pic-zoom .large"),
		largeImg: $(".pic-zoom .large .large-img"),
		data: {	
			"index": [0,1,2],
			"src": ["img/310352-3.jpg","img/310352-10-1_001.jpg","img/310352-20-2.jpg",]
		},
		
		init: function(){
			this.tab();
			this.mousemove();
			this.hover();
			this.largeWrap.hide();
		},
		
		tab: function(){
			var _this = this;
			this.item.mouseenter(function(){
				var index = $(this).index();
				if($(this).index() == _this.data.index[index]){
					_this.smallImg.attr("src",_this.data.src[index]);
					_this.largeImg.attr("src",_this.data.src[index]);
				}				
			});
		},
		
		//鼠标移动
		mousemove: function(){
			var _this = this;
			this.smallWrap.mousemove(function(e){
				var left = e.pageX - _this.smallWrap.offset().left;
				var top  = e.pageY - _this.smallWrap.offset().top;
				
				//边界处理
				left = left<90 ? 90 : (left>282) ? 282 : left;
				top = top<90 ? 90 : (top>282) ? 282 : top;
				
				_this.fliter.css({
					"left": left - 90,
					"top": top - 90
				});
				_this.largeImg.css({
					"left": -2*(left - 90),
					"top": -2*(top - 90)
				});
			});
		},
		
		//滤镜显示隐藏
		hover: function(){
			var _this = this;
			this.smallWrap.hover(
				function(){
					_this.largeWrap.show();
					_this.fliter.show();
				},function(){
					_this.largeWrap.hide();
					_this.fliter.hide();
				});
		}		
	};
	glass.init();

/*******注册js****************************************************************************/
	


	var register = {
		//初始化页面内容
		init: function(){
			var _this = this;
			
			//添加头部
			$('.header-wrapper').load("register-nav.html");
			
			//添加尾部
			$('.footer-wrapper').load('footer.html');
			
			this.verificationCode();
			this.checkVerify();
			//this.setcookie();
			(function(){
				for(var i=0; i<4; i++){
					_this.num +=  parseInt( Math.random()*10 ) ;
				}
				_this.verifyWrap.html(_this.num);
			})();
			
		},
		
		
		btn: $('#login .gray .btn'),
		register: $('#login .btn'),
		verifyWrap: $("#login .verification-code"),
		img1: $('#login .img1'),
		img2: $('#login .img2'),
		img3: $('#login .img3'),
		img4: $('#login .img4'),
		img5: $('#login .img5'),
		mobile: $('#login .mobile'),
		verify: $('#login .verify'),
		mobileVerify: $('#login .mobile-verify'),
		pwd: $('#login .checkPsw'),
		verifyPwd: $('#login .verify-pwd'),
		num: '',
		
		//验证码生成		
		verificationCode: function(){
			var _this = this;			
			this.btn.click(function(){
				_this.num = "";
				for(var i=0; i<4; i++){
					_this.num +=  parseInt( Math.random()*10 ) ;
				}
				_this.verifyWrap.html(_this.num);
			});		
		},
		
		//验证码检测
		checkVerify: function(){
			var _this = this;
			this.verify.blur(function(){				
				if(_this.verify.val() == _this.num){
					_this.img2.show();
				}else{
					_this.img1.hide();
				}
			});	
			this.mobile.blur(function(){
				if(!(_this.mobile.attr('class').indexOf("valid") == -1)){
					_this.img1.show();
				}else{
					_this.img1.hide();
				}			
			});
			this.mobileVerify.blur(function(){
				if(!(_this.mobileVerify.attr('class').indexOf("valid") == -1)){
					_this.img3.show();
				}else{
					_this.img1.hide();
				}				
			});
			this.pwd.blur(function(){
				if(!(_this.pwd.attr('class').indexOf("valid") == -1)){
					_this.img4.show();
				}else{
					_this.img1.hide();
				}				
			});
			this.verifyPwd.blur(function(){
				if(!(_this.pwd.val() == _this.verifyPwd.val())){
					return;
				}else{
					_this.img1.hide();
				}
				if(!(_this.verifyPwd.attr('class').indexOf("valid") == -1)){
					_this.img5.show();
				}else{
					_this.img1.hide();
				}				
			});
		},
		
		//存储手机号和密码
		setcookie: function(){
			this.register.click(function(){
				//$(window).alert(1);console.log(1);
				
				
				$.cookie('mobile',$('#login .mobile').val(),{expires:7,path:'/'});
				$.cookie('password',$('#login .verify-pwd').val(),{expires:7,path:'/'});							
			});
		}		
	};
	register.init();

});

/*******登录js****************************************************************************/
	var login = {
		
		login: $('.login-content .btn-img'),
		mobile: $('.login-content #mobile'),
		pwd: $('.login-content #pwd'),
		errorWrap: $('.login-content .error'),
		ckeckbox: $('.login-content #MainPlace_cbRemeberUser'),
		//初始化页面内容
		init: function(){
			var _this = this;
			
			this.getcookie();
			
			//添加头部
			$('.header-wrapper').load("register-nav.html");
			
			//添加尾部
			$('.footer-wrapper').load('footer.html');
						
		},
		//获取cookie
		getcookie: function(){
			var _this = this;
			//this.login.click(function(){});
			this.login.on("click",function(){				
				if(!(_this.mobile.val() == $.cookie("mobile"))){
					_this.errorWrap.html("用户名或密码错误！");						
					return;
				}
				if(!(_this.pwd.val() == $.cookie("password"))){
					_this.errorWrap.html("或密码错误！");
					return;
				}else{
					_this.errorWrap.hide();
				};
				location.href = "index.html";
			});												
			
		}
	};
	login.init();


//选项卡插件
function Tab(floorsWrapper){
	this.tabs = floorsWrapper;
	this.tab = this.tabs.find('.tab-nav a');
	this.tabItem = this.tabs.find('.bd');
};
Tab.prototype = {
	constructor: Tab,
	
	init: function(){
		this.tabItem.eq(0).show();
		this.tabSwitch();
	},
	
	//切换
	tabSwitch: function(){
		var _this = this;
		this.tab.mouseenter(function(){
			var index = $(this).index();
			$(this).addClass('sel').siblings().removeClass('sel');
			_this.tabItem.eq(index).show().siblings().hide();
			
		});
	}
};




