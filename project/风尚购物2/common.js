

/*购物车*/
//function showcart() {
//    if (document.getElementById('header_Qty') && parseInt(document.getElementById('header_Qty').innerHTML) > 0) {
//        document.getElementById("e_nav_cart_sh").style.display = "block";
//    }
//    else {
//        $('#e_nav_cart_sh2').css('display', 'block');
//    }
//}
//function hiddencart(){
//    document.getElementById("e_nav_cart_sh").style.display = "none";
//    document.getElementById("e_nav_cart_sh2").style.display = "none";

//}
$(function () {
    $('#e_nav_cart_sh').parent().bind('mouseleave', function () {
        $('#e_nav_cart_sh').css('display', 'none');
        $('#e_nav_cart_sh2').css('display', 'none');
    });
    if ("undefined" != typeof isNotOver && isNotOver == true) {
        //document.getElementById("category_panel").style.display = "";
    }
});




/*左边菜单*/

function setTab(name,cursel,n){
for(i=1;i<=n;i++){
var menu=document.getElementById(name+i);
var con=document.getElementById("con_"+name+"_"+i);
menu.className=i==cursel?"hover":"";
con.style.display=i==cursel?"block":"none";
}
}

/*左边菜单*/
/*
function showsort(){
document.getElementById("e_nav_sort_sh").style.display = "";

}

function hiddensort(){
document.getElementById("e_nav_sort_sh").style.display = "none";

}*/
function showsortclass() {
    if ("undefined" == typeof isNotOver || isNotOver==false) {
        //document.getElementById("category_panel").style.display = "";
    }
}
function hiddensortclass() {
    if ("undefined" == typeof isNotOver || isNotOver == false) {
        //document.getElementById("category_panel").style.display = "none";
    }
}
function hsubclass(){
//document.getElementById("i-mc").style.display = "none";
//document.getElementById("left_sort0").style.display = "none";
}

function showAllClass() {
    var all_pro = document.getElementById("nav-pop-silde");
    var items = getByClass("i_item", all_pro);
    var i_mc = getByClass("i-mc", all_pro);

    var a = getByClass("i_tit", all_pro);
    var span = getByClass("i_tit", all_pro);


    //for (var i = 0; i < items.length; i++) {
    //    items[i].index = i;
    //    items[i].onmouseover = function () {
    //        document.getElementById("left_sort" + this.index).className = "i_item_status_on";
    //        i_mc[this.index].style.display = "block";
    //    }
    //    items[i].onmouseout = function () {
    //        document.getElementById("left_sort" + this.index).className = "i_item";
    //        i_mc[this.index].style.display = "none";
    //    }
    //    //items[i].mouseenter = function () {
    //    //    document.getElementById("left_sort" + this.index).className = "i_item_status_on";
    //    //    i_mc[this.index].style.display = "block";
    //    //}
    //    //items[i].mouseleave = function () {
    //    //    document.getElementById("left_sort" + this.index).className = "i_item";
    //    //    i_mc[this.index].style.display = "none";
    //    //}
    //}

    function getByClass(className, context) {
        context = context || document;
        if (context.getElementsByClassName) {
            return context.getElementsByClassName(className);
        }
        var nodes = context.getElementsByTagName('*'),
			ret = [];
        for (var i = 0; i < nodes.length; i++) {
            if (hasClass(nodes[i], className)) ret.push(nodes[i]);
        }
        return ret;
    }
    function $(id) {
        return document.getElementById(id);
    }

    function hasClass(node, className) {
        try {
            var names = node.className.split(/\s+/);
            for (var i = 0; i < names.length; i++) {
                if (names[i] == className) return true;
            }
            return false;
        }
        catch (ex) {
            return false;
        }
    }
};

/*登录用户*/
function SelectCustomerOrH(flag)
{
 if (flag == 1) 
	{		
		document.getElementById("mesage").style.display = "block";
	}
	 else if (flag == 2) {
		document.getElementById("mesage").style.display = "none";
		window.location ="index.htm";
	 }
}
var timeMess;
/*弹出窗口 objFocus为关闭窗口时focus的对象，可为空！*/
/*         willSelect指示关闭窗口后是否select()。为false则focus该objFocus */
function WinAlert(tit, con, objFocus, willSelect) {
    if (con == "缺少参数" || con == "参数错误") {
        return;
    }

    clearTimeout(timeMess);
    document.getElementById('WinAlertDiv').style.display = 'block';
    $('#WinAlertDiv .WinAlertHead span').html(tit);
    //con = String(con).replaceAllstr('\r\n', '<br/>').replaceAllstr('\n', '<br/>').replaceAllstr('\'', '’').replaceAllstr('\"', '”');
    con = String(con).replaceAllstr('\r\n', '<br/>').replaceAllstr('\n', '<br/>').replaceAllstr('\\\'', '\'').replaceAllstr('\"', '"');
    $('#WinAlertDiv #EconMsg').html(con);
    var timelive = 2000;
    if (con.length > 10) {
        timelive += (con.length - 10) * 200;
    }
//    if ("undefined" == typeof objFocus || objFocus.length < 1) {
//        timeMess = setTimeout(function () { MessOrH(2) }, timelive);
//    }
//    else {
//        timeMess = setTimeout(function () { MessOrH(2, objFocus, willSelect) }, timelive);
//    }
}

function MessOrH(flag, objFocus, willSelect) {
    if (flag == 1) {
        document.getElementById("WinAlertDiv").style.display = "block";
    }
    else if (flag == 2) {
        document.getElementById("WinAlertDiv").style.display = "none";
        if ("undefined" == typeof objFocus || objFocus.length < 1) { }
        else {
            if (willSelect)
                objFocus[0].select();
            else
                objFocus[0].focus();
        }
    }
}

/*首页右边快速送货*/
function HDelivery_show(obj) {

    var parent = document.getElementById(obj);
    parent.className = "hover";
    document.getElementById("lowcost").style.display = "none";
}
function HDelivery_hidden(obj) {

    var parent = document.getElementById(obj);
    parent.className = "";
    document.getElementById("lowcost").style.display = "block";
}

/*根据类别显示不同产品*/
function setCategoryProduct() {
    var ns_start_num = 1;
    $("#menu-nav-container li").bind("mouseover", function () {
        if ($(this).index() < 7) {
            if (ns_start_num == $(this).index()) return false;
            ns_start_num = $(this).index();
            //if($("#start-list-"+$(this).index()).is(":visible"))return false;
            $(".ns_start-list-item").hide();
            //document.title = "#start-list-"+(ns_start_num+1);
            $("#start-list-" + (ns_start_num + 1)).fadeIn(200);
        };
    });
}
