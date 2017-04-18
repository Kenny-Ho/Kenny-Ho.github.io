var memberUrl = RSECGlobal.MemberSite;
if ('https:' == document.location.protocol)
    memberUrl = RSECGlobal.MemberSite;

/*跳动banner*/
//Demo1:
$(function(){
     var len  = $("#idNum > li").length;
	 var index = 0;
	 $("#idNum li").mouseover(function(){
		index  =   $("#idNum li").index(this);
		showImg(index);
	});	
	 //滑入 停止动画，滑出开始动画.
	 $('#main_View2').hover(function(){
			  if(MyTime){
				 clearInterval(MyTime);
			  }
	 },function(){
			  MyTime = setInterval(function(){
			    showImg(index)
				index++;
				if(index==len){index=0;}
			  } ,5000);
	 });
	 //自动开始
	 var MyTime = setInterval(function(){
		showImg(index)
		index++;
		if(index==len){index=0;}
	 } ,5000);
})
// Demo1 : 关键函数：通过控制top ，来显示不通的幻灯片
function showImg(i){
		$("#idSlider").stop(true,false).animate({top : -247*i},1000);
		 $("#idNum li")
			.eq(i).addClass("on")
			.siblings().removeClass("on");
}


//Demo2:
$(function(){
     var len2  = $("#idNum2 > li").length;
	 var index2 = 0;
	 $("#idNum2 li").mouseover(function(){
		index2  =   $("#idNum2 li").index(this);
		showImg2(index2);
	});	
	 //滑入 停止动画，滑出开始动画.
	 $('#idTransformView2').hover(function(){
			  if(MyTime2){
				 clearInterval(MyTime2);
			  }
	 },function(){
			  MyTime2 = setInterval(function(){
			    showImg2(index2)
				index2++;
				if(index2==len2){index2=0;}
			  } ,5000);
	 });
	 //自动开始
	 var MyTime2 = setInterval(function(){
		showImg2(index2)
		index2++;
		if(index2==len2){index2=0;}
	 } ,5000);
})
// Demo2 : 关键函数：通过控制left ，来显示不通的幻灯片
function showImg2(i){
		$("#idSlider2").stop(true,false).animate({left : -601*i},1000);
		 $("#idNum2 li")
			.eq(i).addClass("on")
			.siblings().removeClass("on");
}


/*首页商品*/
$(document).ready(function () {

    $(".product_list").find("div").each(function (_index) {
        if (_index != 0) {
            $(this).hover(function () {
//                $(this).css("border", "1px dashed #2489c3");
				 $(this).css("bgcolor", "#2489c3");
                $(this).find("li").eq(0).find("a").css("color", "#2489c3");
            }, function () {
//                if ($(this).attr("class").indexOf("bgcAlternate") > -1) $(this).css("border", "1px dashed #bfbfbf");
//                else $(this).css("border", "1px dashed #bfbfbf");
                $(this).find("li").eq(0).find("a").css("color", "#2489c3");
            });
        }
//        WinAlert("提示信息", _index);
    });

    //设置投票默认按钮
    setkeydown($('.vote_body_xu'), 'submitVote');

});

//投票功能
function vote(contestId) {
    var vCode="";
    $('.vote_body_xu .text_left_xu input').each(function () {
        if ($(this).attr('checked') == true) {
            var codeid = $(this)[0].id;
            vCode += codeid.substr(codeid.indexOf('_') + 1) + '|';
        }
    });
    if (vCode.trim()!="") {
        vCode = vCode.substr(0, vCode.length - 1);
        GetAjax(memberUrl + 'Vote/AJAX.aspx', 'aid=vote&code=' + vCode + '&contestId=' + contestId + '', '', '', 'loadingSubmitVote', voteEnd);
    }
    else {
        WinAlert("提示信息", "至少选择一项喔");
    }
}
function voteEnd(data) {
    document.getElementById('loadingSubmitVote').style.visibility = 'hidden';
    jsondata = eval('(' + String(data) + ')');
    if (jsondata.success == '0') {
        WinAlert("提示信息", jsondata.msg);
    }
    else {
        $('.vote_body_xu .text_left_xu input').attr('checked', false);
        WinAlert('提示信息', '投票成功！');
    }
}

//以下是日历功能，与banner切换无关，只用banner切换者可删除以下
//function toNextMonth() {
//    var spYear = document.getElementById('spanYear');
//    var spMonth = document.getElementById('spanMonth');
//    var Year=parseInt(spYear.innerHTML,10);
//    var Month=parseInt(spMonth.innerHTML,10);
//    if (Month == 12) {
//        Year++;
//        Month = 1;
//    }
//    else
//    { Month++; }
//    spYear.innerHTML = Year;
//    spMonth.innerHTML = Month;
//    setCalendar();
//}
//function toPreMonth() {
//    var spYear = document.getElementById('spanYear');
//    var spMonth = document.getElementById('spanMonth');
//    var Year = parseInt(spYear.innerHTML, 10);
//    var Month = parseInt(spMonth.innerHTML, 10);
//    if (Month == 1) {
//        Year--;
//        Month = 12;
//    }
//    else
//    { Month--; }
//    spYear.innerHTML = Year;
//    spMonth.innerHTML = Month;
//    setCalendar();
//}
//function setCalendar() {
//    if (document.getElementById('spanYear')) {
//        var datenow = new Date();
//        var spYear = document.getElementById('spanYear');
//        var spMonth = document.getElementById('spanMonth');
//        var Year = spYear.innerHTML;
//        var Month = spMonth.innerHTML;
//        document.getElementById('CalendarLoadingID').style.visibility = 'visible';
//        jQuery.webService({
//            service: RSECGlobal.MemberSite + "Document/ArticleAll.asmx",
//            method: "GetArticleHtmlByMonth",
//            params: { strDate: Year + "-" + Month + "-01", strToday: String(datenow.getFullYear()) + "-" + String(datenow.getMonth() + 1) + "-" + String(datenow.getDate()) },
//            success: function (callBack) {
//                document.getElementById('CalendarLoadingID').style.visibility = 'hidden';
//                var json2 = eval('(' + String(callBack) + ')');
//                if (json2.success == '1') {
//                    $('#calendar_week_con').html(json2.Html);
//                }
//                else {
//                    WinAlert("提示信息", json2.Msg);
//                }
//            },
//            error: null
//        });
//    }
//}

//function SetTimeInput(obj, isYear) {
//    var valueTime = obj.val();
//    var regTime = /^\d+$/;
//    if (isYear && (!regTime.test(valueTime) || parseInt(valueTime, 10) < 1900 || parseInt(valueTime, 10) > 2079)) {
//        WinAlert("提示信息", "年份有误", obj, true);
//    }
//    else if (isYear == false && (!regTime.test(valueTime) || parseInt(valueTime, 10) < 1 || parseInt(valueTime, 10) > 12)) {
//        WinAlert("提示信息", "月份有误", obj, true);
//    }
//    else {
//        if (isYear)
//            $('#spanYear').html(valueTime);
//        else
//            $('#spanMonth').html(valueTime);
//        setCalendar();
//    }
//}
//$(function () {
//    var datenow = new Date();
//    $('#spanYear').html(String(datenow.getFullYear()));
//    $('#spanMonth').html(String(datenow.getMonth() + 1));
//    //当日是 datenow.getDate()
//    setCalendar();

//    $('#spanYear').click(function () {
//        if ($(this).html().length < 6) {
//            var year = $(this).html();
//            var objyear = $("<input type=\"text\" style=\"width:26px;\" maxlength=\"4\" id=\"txtyear\" value=\"" + year + "\"></input>");
//            objyear.blur(function () {
//                SetTimeInput(objyear, true);
//            }).keydown(function (event) {
//                event = (event) ? event : window.event;
//                if (event.keyCode != 13)
//                    return;
//                SetTimeInput(objyear, true);
//            });
//            $(this).html(objyear);
//            $('#txtyear')[0].select();
//        }
//    });
//    $('#spanMonth').click(function () {
//        if ($(this).html().length < 3) {
//            var month = $(this).html();
//            var objmonth = $("<input type=\"text\" style=\"width:13px;\" maxlength=\"2\" id=\"txtmonth\" value=\"" + month + "\"></input>");
//            objmonth.blur(function () {
//                SetTimeInput(objmonth, false);
//            }).keydown(function (event) {
//                event = (event) ? event : window.event;
//                if (event.keyCode != 13)
//                    return;
//                SetTimeInput(objmonth, false);
//            });
//            $(this).html(objmonth);
//            $('#txtmonth')[0].select();
//        }
//    });
//});

