$(function(){
//下拉分类
//if($.browser.msie&&$.browser.version==6){
//$('#hdNav> li').hover(function(){
//	var $slideDiv=$(this).find('div.navp');
//	if ($slideDiv.length === 0) {
//		return;
//	}
//	$(this).children("a").addClass("hover");
//	$slideDiv.show();
//	//$(this).append('<iframe id="selectMask" style="position:absolute;left:95px;z-index:-1;" frameborder="0"></iframe>');
//	//$('#selectMask').height($slideDiv.height()+3).width($slideDiv.width()+6);	
//},


//	function(){
//		var $this=$(this);
//		var $slideDiv=$this.find('div.navp');
		 
//		if ($slideDiv.length === 0) {
//			return;
//		}
//		$slideDiv.hide();
//		$this.find('iframe').remove().end().children("a").removeClass('hover');
//		});
//	//修复IE6不缓存背景图
//	try { document.execCommand('BackgroundImageCache', false, true); } catch(e) {}
    //}
    //$(function () {
        var rql_length = $(".apply_array").length
        var span_arr = [780, 624, 470, 314, 160]

        for (var i = 0; i < rql_length; i++) {
            $(".apply_array").eq(i).click(function () {
                for (var j = 0; j < rql_length; j++) {
                    $(".apply_array").eq(j).removeClass("rq1")
                }

                $(this).addClass("rq1")
                //$(".apply_array > span").css({"left":span_arr[i]+"px"})
            })
        }
    //})


//	else{
$("#hdNav> li").hover(function(){
	var $slideDiv=$(this).find('div.navp');
	if ($slideDiv.length === 0) {
		return;
	}
	$(this).children("a").addClass("hover");
	$slideDiv.show();
}, 




function(){
	var $this=$(this);
	var $slideDiv=$this.find('div.navp');
	if ($slideDiv.length === 0) {
		return;
	}
	$slideDiv.hide();
	$this.children("a").removeClass('hover');
});
//}







$("li.hdMy").hover(function(){
	$(this).find("ul").show();
}, function(){
	$(this).find("ul").hide();
});
//导航结束
});

//$(function () {
//    $("#nav-pop").css("opacity","0.9");
//});



//导航下选项卡开始
function setTab(name,cursel,n){
for(i=1;i<=n;i++){
  var menu=document.getElementById(name+i);
  var con=document.getElementById("con_"+name+"_"+i);
  menu.className=i==cursel?"current":"block";
  con.style.display=i==cursel?"block":"none";
}
}

//设置列表的鼠标滑入及行点击选中checkbox效果
function setTable(objId) {
    $(function () {
        $('#' + objId + ' tr').bind('click', function () {
            var cb = $(this).find('td:first input[type=checkbox]');
            if (cb.attr('checked') == true)
            { cb.attr('checked', false); }
            else
            { cb.attr('checked', true); }
        }).bind('mouseover', function () {
            $(this).css('background-color', '#f5f5f5');
        }).bind('mouseleave', function () {
            $(this).css('background-color', '#ffffff');
        }).each(function () {
            $(this).find('td:first input[type=checkbox]').bind('click', function () {
                if ($(this).attr('checked') == true)
                { $(this).attr('checked', false); }
                else
                { $(this).attr('checked', true); }
            });
        });
    });
}
//构建简单ajax提交
function GetAjax(postUrl, postData, postDataType, returnDataType, CheckSpan, Endfunction) {
    if (returnDataType == "")
    { returnDataType = "html"; }
    if (postDataType == "")
    { postDataType = "application/x-www-form-urlencoded"; }
    else if (postDataType == "json")
    { postDataType = "application/json; charset=utf-8"; }
    $.ajax({
        type: "POST",
        url: postUrl,
        data: postData + '&CheckSpan=' + CheckSpan, //"begin=1&end=9"
        contentType: postDataType,  //如："application/x-www-form-urlencoded" 'application/json; charset=utf-8'
        dataType: returnDataType,          //如："xml" "html" "json" "script"
        beforeSend: function () {
            $("#" + CheckSpan).css('visibility', 'visible');
        },
        success: Endfunction
    });
}
String.prototype.trim = function () {
    return this.replace(/^\s+/g, "").replace(/\s+$/g, "");
}
String.prototype.replaceAllstr = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
