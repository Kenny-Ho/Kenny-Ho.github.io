// JavaScript Document

//分类
/*$(function () {
    $("#category").hover(function () {
        $(".category-pannel").show();
        $("#topLevel li").removeClass("lihover");
    }, function () {
        $(".category-pannel").hide();
    });
    $("#topLevel li").hover(function () {
        $(this).addClass("lihover").siblings().removeClass("lihover");
        $("#subLevel").addClass("set-shadow").show();
    }, function () { });
});*/
//搜索
//$(function () {
//    $("#search").focus(function () {
//        if ($(this).val() == "搜索") {
//            $(this).val("");
//        }
//    }).blur(function () {
//        if ($.trim($(this).val()).length <= 0) {
//            $(this).val("搜索");
//        }
//    });
//});
//网站导航
$(function () {
    $(".menu-bd").hover(function () {
        $(this).children(".menu-title").addClass("menu-bdhover").siblings(".menu-bd-panel").show();
    }, function () {
        $(this).children(".menu-title").removeClass("menu-bdhover").siblings(".menu-bd-panel").hide();
    });
})

//促销、楼层的导航栏按钮
$(function () {
    $(".nav-btn li:nth-child(1)").children().addClass("abtnhover").removeClass("abtn");
    $(".nav-btn li").mouseover(function () {
        var navs = $(this).siblings("li");
        $.each(navs, function () {
            if ($(this).children().attr("class") == "abtnhover") {
                $(this).children().addClass("abtn").removeClass("abtnhover")
            }
        });
        $(this).children().addClass("abtnhover").removeClass("abtn");
    });
});
/*促销鼠标移动*/
$(function () {
    $(".CX-items li").mouseover(function () {
        $(this).css("border-bottom-color", "#f8784b").children(".c-img").css("border-bottom-color", "#f8784b");
        $(this).siblings("li").css("border-bottom-color", "#CCC").children(".c-img").css("border-bottom-color", "#CCC");
    });
});

//商品详情页折叠框
$(function () {
    var oheight = parseInt($('.i-promotion dl').css("height"))
    var flag = true
    if (oheight > 42) {
        $(".itembase-info .i-promotion > span").show()
        $('.i-promotion dl').css("height", "42px")
        $(".itembase-info .i-prices").mouseenter(function () {
            $('.i-promotion dl').css("height", "auto")
            $(".itembase-info .i-promotion > span").hide()
        })
        $(".itembase-info .i-prices").mouseleave(function () {
            $('.i-promotion dl').css("height", "42px")
            $(".itembase-info .i-promotion > span").show()
        })
    }
})









