$(function(){
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
		
	
/**************************购物车功能*********************************************************
 	1、尺码的切换（颜色的切换）
 	2、增加数量
 	3、减少数量
 	4、直接修改input
 	5、加入购物车
****************************************************************************************/
	var detail = {
		init: function(){
			this.main = $('.itembase-info');
			this.sizeContent = this.main.find('.size-content');
			this.colorContent = this.main.find('.color-content');
			this.amountInput = this.main.find('.num');
			//增加数量按钮
			this.amountInc = this.main.find('.amount-increase');
			//减少数量按钮
			this.amountDec = this.main.find('.amount-decrease');
			//库存
			this.stock = this.main.find('.stock-num');
			//加入购物车按钮
			this.btn = this.main.find('.add-cart'); 
			
			this.data = {};
			
			this.initData();
		},
		
		initData: function(){
			var gid = this.main.attr('data-gid');
			var _this = this;
			
			$.getJSON('js/data.json',function(result){
				//console.log(result);
				//console.log(gid);
				_this.data = result[gid];
				
				//填充尺寸
				_this.createSize();
				//点击尺寸事件
				_this.sizeClick();
				//增加
				_this.increase();
				//减少
				_this.decrease();
				//直接输入
				_this.input();
	
				//加入购物车
				_this.addCart();
			});
			
		},
		
		createSize: function(){
			var size = this.data.size;console.log(this.data.size);
			var sizeStr = '';
			for(var key in size){
				sizeStr += '<li class="attrClass detailSize" data-size="'+key+'">'						
						+		'<p class="">'+size[key]+'</p>'
						+	'</li>'	;												
			};
			this.sizeContent.html(sizeStr);
			
			this.sizeContent.children().eq(0).addClass('selected');
		},
		
		//点击尺寸
		sizeClick: function(){
			//利用事件委托给子元素添加事件
			this.sizeContent.on('click','li',function(){
				$(this).addClass('selected').siblings().removeClass('selected');
			});
		},
		
		//数量增加点击
		increase: function(){
			var _this = this;
			this.amountInc.click(function(){
				var amount = parseInt( _this.amountInput.val() );
				var stock = _this.stock.html();
				//判断是否超出库存
				if(amount >= stock){
					return;
				}
				//数量++
				amount++;
				_this.amountInput.val(amount);
			});
		},
		//减少
		decrease: function(){
			var _this = this;
			this.amountDec.click(function(){
				var amount = parseInt( _this.amountInput.val() );
				//判断是否越界
				if(amount <= 1){
					return;
				}
				//数量--
				amount--;
				_this.amountInput.val(amount);
			});
		},
		//直接输入
		input: function(){
			var _this = this;
			this.amountInput.on('input',function(){
				var amount = _this.amountInput.val();
				//如果是空，不做处理
				if(amount == ''){
					return;
				}
				amount = parseInt( amount );  // 12 12w=>12  fds=>NaN
				
				var stock = _this.stock.html();
				
				//判断是不是NaN或者是不是0
				if( isNaN(amount) || amount == 0 ){
					_this.amountInput.val(1);
					return;
				}
				
				//判断是否越界 
				if(amount >= stock){ 
					_this.amountInput.val(stock);
					return;
				}
				_this.amountInput.val(amount);
			});
			//失去焦点判断是不是空 =》 1
			this.amountInput.blur(function(){
				var amount = _this.amountInput.val();
				//如果是空，不做处理
				if(amount == ''){
					_this.amountInput.val(1);
				}
			});
		},
		//加入购物车
		addCart: function(){
			var _this = this;
			//【加入购物车】按钮点击
			this.btn.click(function(){
				//data() 获取以data-开的自定义属性的值
				var gid = _this.main.data('gid');
				//sizeId
				var sizeId = _this.sizeContent.find('.selected').data('size');
				var amount = parseInt( _this.amountInput.val() );
				
				var cart = $.cookie('tb_cart')  || '{}';
				cart = JSON.parse( cart );
				//判断购物车是否已经存在当前商品
				if(!cart[sizeId]){
					cart[sizeId] = {
						"goods-id": gid,
						"size-id": sizeId,
						"amount": amount
					};
				}else{
					cart[sizeId].amount += amount;
				}

				//重新写到cookie中
				$.cookie('tb_cart',JSON.stringify(cart),{expires:365,path: '/'});

				alert('添加成功');

				console.log( JSON.parse( $.cookie('tb_cart') ) );
			});
		}
	};
	detail.init();

});
