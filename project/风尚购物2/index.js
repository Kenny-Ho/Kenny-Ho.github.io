// JavaScript Document

//首页--电梯
/*电梯*/
//$(function () {
//    /*初始状态*/
//    $("#elevator .etitle").hide();
//    var fWidth = $("#floors").width();//楼层宽度
//    var fOffTop = $("#floors").offset().top;//楼层距当前视口高度
//    var eachfH = $(".floor").outerHeight(true);//每个楼层高度
//    if ($(window).width() < fWidth || $(window).height() < fOffTop) {
//        $("#elevator").hide();
//    }

//    /*显示时的定位*/
//    function elePosition() {
//        $("#elevator").show();
//        $("#elevator").css("top", ($(window).height() - $("#elevator").height()) / 2);
//        $("#elevator").css("left", ($(window).width() - fWidth) / 2 - $("#elevator").width());
//    }
//    /*浏览器更改状态*/
//    $(window).resize(function () {
//        if ($(window).width() > fWidth + $("#elevator").height() * 2 && fOffTop > 1110) {
//            $("#elevator").show();
//            elePosition();
//        }
//        else {
//            $("#elevator").hide();
//        }
//    });
//    /*滚动时的状态*/
//    $(window).scroll(function () {
//        var eleHeight = $(window).height() + $(window).scrollTop();
//        var elenum = Math.floor((eleHeight - fOffTop) / eachfH);
//        if (eleHeight > fOffTop && $(window).width() > fWidth) {
//            elePosition();
//        }
//        else {
//            $("#elevator").hide();
//        }
//        var eles = $("#elevator li");
//        $.each(eles, function (key, values) {
//            if (elenum <= 0) {
//                //$("#el01").children(".etitle").show().siblings().hide();
//                $("#elevator").hide();
//            }
//            if (key == elenum - 1) {
//                $(this).children(".etitle").show().siblings().hide();
//            }
//            else {
//                $(this).children(".etitle").hide().siblings().show();
//            }
//        });
//    });
//});

$(document).ready(function () {
    //大Banner
    $("#bxSlider_banner").bxSlider({
        auto: true,
        autoHover: true
    });
});
//$(document).ready(function () {
//    //大Banner
//    $("#bxSlider_hotsale").bxSlider({
//        auto: true,
//        autoHover: true,
//       // slideWidth: 200,
//    });
//});


//首页--banner
//var BAsize;
//var BAinx = 0;
//$(function () {
//    BAsize = $("#BAbox div").length;
//    $("#BAbox div").eq(0).css({ "opacity": "1", "z-index": "101" });
//    $("#BAbox div").eq(0).siblings().css("opacity", "0");
//    autoplay();
//});

//function autoplay() {
//    t = setTimeout(next, 5000);
//}
//function next() {
//    if (BAinx < BAsize - 1) {
//        $("#BAbox div").eq(BAinx).animate({ "opacity": "0", "z-index": "100" });
//        $("#BAbox div").eq(BAinx).next().animate({ "opacity": "1", "z-index": "101" });
//        BAinx++;
//    } else {
//        $("#BAbox div").eq(BAinx).animate({ "opacity": "0", "z-index": "100" });
//        $("#BAbox div").eq(0).animate({ "opacity": "1", "z-index": "101" });
//        BAinx = 0;
//    };
//    autoplay();
//}

//首页--分类图标
$(function () {
    $("#idxIcons a").hover(function () {
        $(this).css("color", "#f8784b");
        var linkicon = $(this).children("dt").children("img").attr("src");
        var hovericon = linkicon.replace("l_icon_", "h_icon_");
        $(this).children("dt").children("img").attr("src", hovericon);
    }, function () {
        $(this).css("color", "#333");
        var hoverimg = $(this).children("dt").children("img").attr("src");
        var linkimg = hoverimg.replace("h_icon_", "l_icon_");
        $(this).children("dt").children("img").attr("src", linkimg);
    });
});





