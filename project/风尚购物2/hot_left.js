$(function () {
    //html动态生成部分

    //var lbt_html1 = new lbt_html()
    //var lbt_html2 = new lbt_html()
    //var lbt_html3 = new lbt_html()
    //var lbt_html4 = new lbt_html()
    //
    //var str = ""
    //var lbt_htmls = [lbt_html1,lbt_html2,lbt_html3,lbt_html4,lbt_html1]
    //
    //var lbt_html_imgs = $(".hot_sale_left > ul img")//轮播图片
    //var lis = $(".hot_sale_left > ul > li")
    //var lbt_html_name = ['这是图片1的名字','这是图片2的名字','这是图片3的名字','这是图片4的名字','这是图片1的名字']//产品名称
    //var lbt_html_price = ['￥99','￥999','￥9999','￥99999','￥99']//产平价格
    //var lbt_html_product_describe = ['这是商品1的描述','这是商品2的描述','这是商品3的描述','这是商品4的描述','这是商品1的描述']//产品描述
    //
    var lbt_length = $("#bxSlider_hotsale > li").length//图片数量
    var str_span = ""
    //
    //for(var i = 0; i < lbt_length; i++){
    //    lbt_htmls[i].images = lbt_html_imgs[i]
    //    lbt_htmls[i].name = lbt_html_name[i]
    //    lbt_htmls[i].price = lbt_html_price[i]
    //    lbt_htmls[i].product_describe = lbt_html_product_describe[i]
    //
    //    str += lbt_htmls[i].bindDom()
    //}
    //$(".hot_sale_left > ul").html(str)

    for(var i = 0; i < lbt_length; i++){
        //轮播按钮的生成
        str_span += "<i></i>"
    }
    $(".lbt_btn").append(str_span)
    $(".lbt_btn > i").eq(0).addClass("current")
    //html动态生成部分

    var oli_one = null;
    oli_one = $(".hot_sale_left > ul > li").eq(0).clone(true)
    $(".hot_sale_left > ul").append(oli_one)

    //轮播图开始
    //1、img_w:图片的宽度
    var img_w = parseInt( $("#bxSlider_hotsale > li").css("width"));
    //2、lbt_speed:轮播图轮播的速度
    //3、lbt_step:轮播图的图片的移入速度
    //4、lbt_length:轮播图的图片数量
    lbt(img_w, 6000, 800, lbt_length)
    //轮播图结束
})

//轮播图主体
function lbt(img_w,lbt_speed,lbt_step,lbt_length){
    var timer = null;
    var t = 0;
    var k = 0;

    timer = setInterval(function() {
        t--;
        k++;
        k > lbt_length - 1 ? k = 0 : k
        for(var i =0;i < lbt_length; i++){
            $(".lbt_btn > i").removeClass("current")
        }

        $(".lbt_btn > i").eq(k).addClass("current")

        if(Math.abs(t) > lbt_length ){
            t = -1
            $(".hot_sale_left > ul").css("left","0").animate({
                "left":t * img_w + "px"
            },lbt_step)
        }else{
            $(".hot_sale_left > ul").animate({
                "left":t * img_w + "px"
            },lbt_step)
        }
    },lbt_speed)

    $(".hot_sale_left").on("mouseenter", function () {
        clearInterval(timer)
    })
    $(".hot_sale_left").on("mouseleave", function () {
        timer = setInterval(function () {
            t--;
            k++;
            k > lbt_length - 1 ? k = 0 : k
            for(var i =0;i < lbt_length; i++){
                $(".lbt_btn > i").removeClass("current")
            }
            $(".lbt_btn > i").eq(k).addClass("current")

            if(Math.abs(t) > lbt_length){
                t = -1
                $(".hot_sale_left > ul").css("left","0").animate({
                    "left":t * img_w + "px"
                },lbt_step)
            }else{
                $(".hot_sale_left > ul").animate({
                    "left":t * img_w + "px"
                },lbt_step)
            }
        },lbt_speed)
    })

    $(".lbt_btn > i").on("click", function () {
        clearInterval(timer)
        $(".lbt_btn > i").removeClass("current")
        $(this).addClass("current")
        //alert()
         t = -($(this).index())
        k = $(this).index()
        $(".hot_sale_left > ul").animate({
            "left":t * img_w + "px"
        },lbt_step)
    })

    $(".lbt_btn > i").on("mouseenter", function () {
        clearInterval(timer)
    })
    $(".lbt_btn > i").on("mouseleave", function () {
        timer = setInterval(function () {
            t--;
            k++;
            k > lbt_length - 1 ? k = 0 : k
            for (var i = 0; i < lbt_length; i++) {
                $(".lbt_btn > i").removeClass("current")
            }
            $(".lbt_btn > i").eq(k).addClass("current")

            if (Math.abs(t) > lbt_length) {
                t = -1
                $(".hot_sale_left > ul").css("left", "0").animate({
                    "left": t * img_w + "px"
                }, lbt_step)
            } else {
                $(".hot_sale_left > ul").animate({
                    "left": t * img_w + "px"
                }, lbt_step)
            }
        }, lbt_speed)
    })

    //clearInterval(timer)
}