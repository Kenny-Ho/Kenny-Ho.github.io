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

