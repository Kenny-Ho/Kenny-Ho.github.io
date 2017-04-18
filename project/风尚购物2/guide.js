var Guids = function () {
    this.resources = [{ "imageUrl": RSECGlobal.DefaultSite + "images/guid/f_help_01.gif", "index": 0, "title": "第一张" },
                      { "imageUrl": RSECGlobal.DefaultSite + "images/guid/f_help_02.gif", "index": 1, "title": "第二张" },
                      { "imageUrl": RSECGlobal.DefaultSite + "images/guid/f_help_03.gif", "index": 2, "title": "第三张" },
                      { "imageUrl": RSECGlobal.DefaultSite + "images/guid/f_help_04.gif", "index": 3, "title": "第四张" },
                      { "imageUrl": RSECGlobal.DefaultSite + "images/guid/f_help_05.gif", "index": 4, "title": "第四张" },
                      { "imageUrl": RSECGlobal.DefaultSite + "images/guid/f_help_06.gif", "index": 5, "title": "第四张"}];
    this.index = 0;
    this.count = this.resources.length;
    this.elements = { divGuidContainer: "divGuidContainer" };
    this.enabled = true;
    this.autoPlayInterval = null;
}
Guids.prototype.init = function () {
    if (!this.enabled)
        return;

    for (var i = 0; i < this.count; i++) {
        var res = this.resources[i];
        $("#banner_list").append($("<img id=\"guid_" + res.index + "\" src=\"" + res.imageUrl + "\" index=\"" + res.index + "\" style=\"border:0px\">"));
    }
    this.index = 0;
    $("#aPre").bind("click", $.proxy(this.pre, this));
    $("#aNext").bind("click", $.proxy(this.next, this));
    $("#aEnd").bind("click", $.proxy(this.end, this));
    $("#aClose").bind("click", $.proxy(this.end, this));
    this.control();
}
Guids.prototype.next = function () {
    if (this.index == this.count - 1)
        return;
    var lastIndex = this.index;
    this.index++;
    $("#divGuidContent").fadeOut(300).fadeIn(800);
    $("#guid_" + lastIndex).fadeOut(500);
    $("#guid_" + this.index).fadeIn(800);
    this.control();
}

Guids.prototype.pre = function () {
    if (this.index == 0)
        return;
    var lastIndex = this.index;
    this.index--;
    $("#divGuidContent").fadeOut(300).fadeIn(800);
    $("#guid_" + lastIndex).fadeOut(500);
    $("#guid_" + this.index).fadeIn(1000);
    this.control();
}

Guids.prototype.control = function () {
    $("#aPre").show();
    $("#aNext").show();
    $("#aEnd").show();
    if (this.index == 0) {
        $("#aPre").hide();
        $("#aEnd").hide();
    }
    else if (this.index == this.count - 1) {
       // clearInterval(this.autoPlayInterval);
        $("#aNext").hide();
    }
    else {
        $("#aEnd").hide();
    }
}

Guids.prototype.start = function () {

    if (!this.enabled)
        return;

    if ($.cookie("WebClientId") != null && $.cookie("WebClientId") != undefined) {
        //        if ($.cookie('guidkeys') == null || $.cookie('guidkeys') == undefined) {
        //            if ($("#isShowWebClient").val() == "1")
        //                return;
        this.toDocumentCenter();
        $("#" + this.elements.divGuidContainer).show();
        $("#below").show();
        $("#guid_0").fadeOut(300).fadeIn(500);
        $("#divGuidContent").fadeOut(300).fadeIn(500);
        
        //this.autoPlay();

        //}
    }
}

Guids.prototype.toDocumentCenter = function () {
    var v_left = ($(window).width() - $("#" + this.elements.divGuidContainer).width()) / 2;
    var v_top = ($(window).height() - $("#" + this.elements.divGuidContainer).height()) / 2;
    var element = document.body || document.body;
    v_left += $(document).scrollLeft();
    v_top += $(document).scrollTop();
    $("#" + this.elements.divGuidContainer).css("position", "absolute");
    $("#" + this.elements.divGuidContainer).css("left", v_left + "px");
    $("#" + this.elements.divGuidContainer).css("top", v_top + "px");
}


Guids.prototype.end = function () {
    $("#" + this.elements.divGuidContainer).hide();
    $("#below").hide();
    $.cookie('guidkeys', "Y", { expires: 30, path: "/", domain: $.trim(RSECGlobal.DefaultSite.replace("http://", "")).replace("/WebKyo/", ""), secure: false });

}



Guids.prototype.play = function () {
    guids.init();
    guids.start();
}
var guids = new Guids();



