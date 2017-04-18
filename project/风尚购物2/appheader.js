var GlobalPriceFormat = "#,###.00";

//选择区域时， 需要清掉当前的url中的省市区。 (无省市区的url)
var CurrentRegionForDeliveryZoneUrl = null;

$(document).ready(function () {
    $("#topR_nav ul li div.menu").hover(function () {
        $(this).find("div.topR_menu_bd").slideDown(0).show();
        $(this).find("a.topR_menu_hd").css("background", "#E2051B").css("color", "white");
        $(this).hover(function () {
        }, function () {
            $(this).find("div.topR_menu_bd").slideUp(0);
            $(this).find("a.topR_menu_hd").css("background", "").css("color", "black");
        });
    }, function () {
        $(this).find("a.topR_menu_hd").css("background", "").css("color", "white");
    });

    $(".i_item").mouseover(function () {
        $(this).attr("class","i_item_status_on").find(".i-mc").css('display', 'block');

    });
    $(".i_item").mouseleave(function () {
        $(this).attr("class", "i_item").find(".i-mc").css('display', 'none');
    });

    //*Added 2012-11-15 start*//
    $("#div_area").hover(function () {
        $(this).find("div.top_city_m").slideDown(0).show();
        $(this).addClass("top_area_over");
        $(this).removeClass("top_area_out");
        $(this).hover(function () {
            $("#div_area").addClass("top_area_over");
        }, function () {
            $(this).find("div.top_city_m").slideUp(0);
            $(this).addClass("top_area_out");
            $(this).removeClass("top_area_over");
        });
    }, function () {
        $(this).removeClass("top_area_out");
    });

    $("#div_area").hover(function () {
        /*北京*/
        $(this).find("div.top_city_mbj").slideDown(0).show();
        $(this).addClass("top_area_over");
        $(this).removeClass("top_area_out");
        $(this).hover(function () {
            $("#div_area").addClass("top_area_over");
        }, function () {
            /*北京*/
            $(this).find("div.top_city_mbj").slideUp(0);
            $(this).addClass("top_area_out");
            $(this).removeClass("top_area_over");
        });
    }, function () {
        $(this).removeClass("top_area_out");
    });

    //*Added 2012-11-15 end*//

    Register(); //异步拉去客户登录信息
});

// 搜索时要用
function AppHeader(elements, options) {
    this.SetElements({ TxtKeyWord: "searchKeyWord", BtnSearch: "BtnSearch" });
    this.SetOptions({ SearchStyleUrl: RSECGlobal.SearchSite + "Goods/StyleSearch.aspx", SortField: "SaleDate", IsSortASC: "1" });

    if (elements != undefined) {
        this.SetElements(elements);
    }

    if (options != undefined) {
        this.SetOptions(options);
    }
}
AppHeader.prototype = new RSUIBase();
AppHeader.prototype.Initial = function () {
    //    this.BindElement(this.Elements.BtnSearch, "click", $.proxy(function () {

    //        this.Search();
    //    }, this))


    //    this.BindElement(this.Elements.TxtKeyWord, "keydown", $.proxy(function (event) {
    //        event = (event) ? event : window.event;
    //        if (event.keyCode == 13) {
    //            this.Search();
    //        }
    //    }, this))
    //    this.BindElement(this.Elements.TxtKeyWord, "focus", $.proxy(function (event) {
    //        var $keyWord = this.GetjQuery(this.Elements.TxtKeyWord);
    //        if ($keyWord.val() == $keyWord[0].defaultValue) {
    //            $keyWord.val("");
    //        }

    //    }, this))
}

//AppHeader.prototype.Search = function () {
//    var $keyWord = this.GetjQuery(this.Elements.TxtKeyWord);

//    if ($keyWord.val() == $keyWord[0].defaultValue || $keyWord.val() == '') {
//        return false;
//    }

//    window.location = this.Options.SearchStyleUrl + '?KeyWord=' + escape($keyWord.val()) + "&SortField=" + this.Options.SortField + "&IsSortASC=" + this.Options.IsSortASC;
//    return false;

//}

function GetClientRegion() {
    $.webPageForJsonPost(RSECGlobal.DefaultSite + "App/SetClient.ashx", { action: "GetClientSite" }, $.proxy(function (callBack) {
        if (callBack.IsSuccess) {
            if (callBack.Data.success) {
                $("#spanClientSite").html(callBack.Data.data);
                $("#citydiv").show();
                $("#below").show();
            }
            else
                WinAlert("温馨提示", callBack.Data.msg);
        }
        else {
            WinAlert("提示信息", callBack.ErrorInfo);
        }
    }, this));
}


/*切换城市*/
function CityOrH(flag) {

    if (flag == 1) {
        $.ajax({
            url: RSECGlobal.DefaultSite + "App/SetClient.ashx",
            data: { action: "GetClientSite" },
            type: "GET",
            timeout: 10000,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (callBack) {
                if (callBack.IsSuccess) {
                    if (callBack.Data.success) {
                        $("#spanClientSite").html(callBack.Data.data);
                        $("#citydiv").show();
                        $("#below").show();
                    }
                    else {
                        GetClientRegion();
                    }
                }
                else {
                    GetClientRegion();
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                GetClientRegion();
            }
        });
    }
    else if (flag == 2) {
        $("#citydiv").hide();
        $("#below").hide();
    }
}

function changeClient(clientId) {
    //根据ip 推荐进站， 利用选择其他走根据ip选择 站点
    setRegionClient(clientId, 'A', '0', 'A', '0', 'ALL');
}
//function changeClient(/*clientId/string*/clientId, region) { //to change client id,ajax
//    if (clientId == undefined)
//        return;
//    if (region != undefined && region == "0")
//        region = "0";
//    else
//        region = "";
//    $.webPageForJsonPost(RSECGlobal.DefaultSite + "App/SetClient.ashx", { clientId: clientId, action: "Set", url: escape($("#abUri").val()), paras: escape($("#paras").val()), region: region, r: Math.random() }, $.proxy(function (callBack) {
//        if (callBack.IsSuccess) {
//            if (callBack.Data.success) {
//                if (callBack.Data.noAction) {
//                    window.location.reload();
//                    return;
//                }

//                if (!callBack.Data.isLogin) {
//                    if (callBack.Data.rdtdUrl != "") {
//                        window.location.href = callBack.Data.rdtdUrl;
//                    }
//                    else
//                        window.location.reload();
//                }
//                CityOrH(2);
//            }
//            else
//                WinAlert("温馨提示", callBack.Data.msg);
//        }
//        else {
//            WinAlert("提示信息", callBack.ErrorInfo);
//        }
//    }, this));
//}


/*切换站点和所属区域*/
function setRegionClient(clientId, clientRegionType, regionId, regionType, clientRegionId, siteFlag) {
    var params = {
        clientId: clientId,
        regionId: regionId,
        regionType: regionType,
        clientRegionType: clientRegionType,
        clientRegionId: clientRegionId,
        siteFlag: siteFlag,
        action: "SetRegionClient"
    };
    changeRegionClient(params);
}

function setClient(clientId, clientRegionType, clientRegionId, siteFlag) {
    var params = {
        clientId: clientId,
        regionId: "-1",
        regionType: "",
        clientRegionType: clientRegionType,
        clientRegionId: clientRegionId,
        siteFlag: siteFlag,
        action: "SetRegionClient"
    };
    changeRegionClient(params);
}

function changeRegionClient(params) {
    $.webPageForJsonPost(RSECGlobal.DefaultSite + "App/SetClient.ashx", params, $.proxy(function (callBack) {
        if (callBack.IsSuccess) {
            if (callBack.Data.success) {
                if (CurrentRegionForDeliveryZoneUrl == null) {
                    window.location.reload();
                } else {
                    window.location.href = CurrentRegionForDeliveryZoneUrl;
                }
            }
            else
                WinAlert("温馨提示", callBack.Data.msg);
        }
        else {
            WinAlert("提示信息", callBack.ErrorInfo);
        }
    }, this));
}





function Register() {
    var memberUrl = RSECGlobal.MemberSite;
    if ('https:' == document.location.protocol)
        memberUrl = RSECGlobal.MemberSite;
    jQuery.ajax({
        url: memberUrl + "Customer/AsyncConsumerLoginInfo.ashx?action=Get",
        data: {},
        type: "GET",
        timeout: 10000,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (callback, textStatus, object) {
            if (callback.Data.IsLogin) {
                jQuery("#spanNoLogin").hide();
                jQuery("#spanLogin").show();
                jQuery("#hidConsumerId").val(callback.Data.ConsumerId);
                jQuery("#LoginConsumerName").html("<a href='" + memberUrl + "MemberCenter/MemberUserInfo.aspx" + "'>" + callback.Data.ConsumerName + "</a>，");
                jQuery("#NewRegister").hide();
                jQuery("#ConsumerIntegral").show();
                jQuery("#spanIntegral").html(callback.Data.ConsumerIntegral);
            }
            else {
                jQuery("#spanNoLogin").show();
                jQuery("#spanLogin").hide();
                jQuery("#hidConsumerId").val("");
                jQuery("#NewRegister").show();
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            //            if (textStatus == 'timeout') {
            //                WinAlert('提示信息', '网络连接故障，服务器响应超时！');
            //                return;
            //            }
        }
    });
}

var isLoadingBasket = false;
var canLoadBaket = true;
function GetBasket() {
    if (isLoadingBasket)
        return;
    if (!canLoadBaket) {
        if (parseInt($("#header_Qty").html()) > 0) {
            $("#e_nav_cart_sh").css("display", "block");
        }
        else {
            $('#e_nav_cart_sh2').css('display', 'block');
        }
        return;
    }
    isLoadingBasket = true;
    canLoadBaket = false;
    var siteUrl = RSECGlobal.DefaultSite;
    if ('https:' == document.location.protocol)
        siteUrl = RSECGlobal.DefaultSite.replace("http:", "https:");
    $.webPageForJson(siteUrl + "Shopping/AsyncBasket.ashx", { action: "GetCurrentBasketItems" }, $.proxy(function (callBack) {
        if (callBack.IsSuccess) {
            if (callBack.Data.CartItemCount > 0) {
                $("#e_nav_cart_sh").css("display", "block");
            }
            else {
                $('#e_nav_cart_sh2').css("display", "block");
            }
            if (callBack.Data.success) {
                ShowCartInfo(callBack.Data.CartItems, callBack.Data.CartItemCount, callBack.Data.CartItemAmount);
            }
            else
                WinAlert('提示信息', callBack.Data.msg);
        }
        else {
            WinAlert('提示信息', callBack.ErrorInfo);
        }
        isLoadingBasket = false;
    }, this));
}


function deleteBasketItem(lineId) {
    var siteUrl = RSECGlobal.DefaultSite;
    if ('https:' == document.location.protocol)
        siteUrl = RSECGlobal.DefaultSite.replace("http:", "https:");

    var oldHtml = $("#basketItem_" + lineId).html();
    $("#basketItem_" + lineId).html("<img src ='" + siteUrl + "images/load/hig_progcircle_animated.gif' title='正在删除'>");
    isLoadingBasket = true;
    canLoadBaket = false;

    $.webPageForJson(siteUrl + "Shopping/AsyncBasket.ashx", { action: "RemoveBasketItem", lineId: lineId }, $.proxy(function (callBack) {
        if (callBack.IsSuccess) {
            if (callBack.Data.CartItemCount > 0) {
                $("#e_nav_cart_sh").css("display", "block");
            }
            else
                $('#e_nav_cart_sh2').show();

            if (callBack.Data.success) {
                if (callBack.Data.CartItemCount <= 0) {
                    // $("#e_mycart-list").html("");
                    $("#e_nav_cart_sh").hide();
                }
                ShowCartInfo(callBack.Data.CartItems, callBack.Data.CartItemCount, callBack.Data.CartItemAmount);

            }
            else {
                WinAlert('提示信息', callBack.Data.msg);
                $("#basketItem_" + lineId).html(oldHtml);
            }
        }
        else {
            WinAlert('提示信息', callBack.ErrorInfo);
            $("#basketItem_" + lineId).html(oldHtml);
        }
        isLoadingBasket = false;
    }, this));
}


function ShowCartInfo(itemHtmls, itemCount, amount) {
    $("#e_mycart-list").html(itemHtmls);
    $("#header_Qty").html(itemCount);
    $("#header_Amount").html("¥" + parseFloat(amount).toFixed(2));
}





function GetBasketData() {
    var siteUrl = RSECGlobal.DefaultSite;
    if ('https:' == document.location.protocol)
        siteUrl = RSECGlobal.DefaultSite.replace("http:", "https:");
    $.webPageForJson(siteUrl + "Shopping/AsyncBasket.ashx", { action: "GetCurrentBasketItems" }, $.proxy(function (callBack) {
        if (callBack.IsSuccess) {
            if (callBack.Data.success) {
                ShowCartInfo(callBack.Data.CartItems, callBack.Data.CartItemCount, callBack.Data.CartItemAmount);
            }
            else
                WinAlert('提示信息', callBack.Data.msg);
        }
        else {
            WinAlert('提示信息', callBack.ErrorInfo);
        }
    }, this));
}


jQuery(document).ready(function () {
    var selectedClassId = $("#ctl00_AppHeader1_hiden_ClassId1").val();
    var setIndexCssSelected = true;

    $.each($("span[name='setCss']"), function (i) {
        $(this).removeClass("newhome");
        if ($(this).attr("id") == "span_" + selectedClassId) {
            $(this).addClass("newhome");
            setIndexCssSelected = false;
        }

    });

    if (setIndexCssSelected) {
        $("#span_Index").addClass("newhome");
    }

});





/// 重新获得验证码

function ChangeVerifyImage(controlId, seed, maxLength) {
    var CurrentControlId = controlId;
    var controlId = controlId.indexOf("VerifyControl1") > -1 ? "VerifyControl1" : "VerifyControl2";
    var url = window.location.pathname;
    var memberSiteUrl = RSECGlobal.MemberSite;
    if ('https:' == document.location.protocol)
        memberSiteUrl = RSECGlobal.MemberSite;
    jQuery.webService({
        service: memberSiteUrl + "Customer/ConsumerWebServices.asmx",
        method: "GetChangeVerifyImage",
        params: { seedValue: seed, currentUrl: url, controlId: controlId, maxLength: maxLength },
        success: function (callBack) {
            $("#" + CurrentControlId).attr("src", callBack);
        },
        error: null
    });
}

//  记录站内页面广告的投放效果和点击次数
function RecordStyleAdPositionInfo(positionId, styleId) {
    jQuery.webService({
        service: RSECGlobal.ProductSite + "Goods/StyleDetailService.asmx",
        method: "RecordStyleAdPosition",
        params: { positionId: positionId, styleId: styleId },
        success: function (callBack) {

        },
        error: null
    });
}


function GetUrlParameterValue(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return r[2];
    }
    return null;
}

// 注意分页控件中显示页码TextBox 绑定的回车事件 注意该js 应该移到分页控件中
jQuery(document).ready(function () {
    $("#ctl00_MainPlace_pageChanger_Main_Bottom_gotoPageNoTextBox").unbind('keydown');
    $("#ctl00_MainPlace_pageChanger_Main_Bottom_gotoPageNoTextBox").bind('keydown', function (event) {
        event = (event) ? event : window.event;
        if (event.keyCode == 13) {
            $("#ctl00_MainPlace_pageChanger_Main_Bottom_goToPageButton").trigger("click");
        }
    });

    $("#ctl00_MainPlace_pageChangerMain_gotoPageNoTextBox").unbind('keydown');
    $("#ctl00_MainPlace_pageChangerMain_gotoPageNoTextBox").bind('keydown', function (event) {
        event = (event) ? event : window.event;
        if (event.keyCode == 13) {
            $("#ctl00_MainPlace_pageChangerMain_goToPageButton").trigger("click");
        }
    });

    var currentUrl0 = location.href.toLowerCase();
    currentUrl = currentUrl0.substr(currentUrl0.lastIndexOf('/') + 1);
    var objmenu = $('.e_nav_map .e_nav_list li');
    var isFind = false;
    objmenu.each(function () {
        var href0 = $(this).find('a').attr('href').toLowerCase();
        href0 = href0.substr(href0.lastIndexOf('/') + 1);
        if (objmenu.index($(this)) > 0 && href0.length > 4 && currentUrl.indexOf(href0) > -1) {
            $(this).addClass('current');
            isFind = true;
            return false;
        }
    });
    if (isFind == false && (currentUrl.length < 2 || currentUrl0.indexOf(RSECGlobal.DefaultSite.toLowerCase() + 'index') != -1 || RSECGlobal.DefaultSite.toLowerCase() == currentUrl0 + '/')) {
        objmenu.eq(0).addClass('current');
    }
});

// BrowseProcess 处理
jQuery(document).ready(function () {
    var browseRecord = new BrowseRecord();
    browseRecord.Record();
});

function BrowseRecord(elements) {
    var biUrl = RSECGlobal.BISite;
    if ('https:' == document.location.protocol)
        biUrl = RSECGlobal.BISite.replace("http:", "https:");
    this.SetElements({ BrowseProcess: "BrowseProcess" });
    this.SetOptions({ BrowseContentUrl: biUrl + "/BI/BrowseContent.aspx", BrowserHoldDigit: 1 });
    this.IsLog = true;

    if (elements != undefined) {
        this.SetElements(elements);
    }

    this.Domain = null;
}

BrowseRecord.prototype = new RSUIBase();

BrowseRecord.prototype.Record = function () {

    if (this.GetjQuery(this.Elements.BrowseProcess).length == 0) {
        return false;
    }

    var visitId = this.GetValueFromCookie("VisitId");
    var visitorId = this.GetValueFromCookie("VisitorId");
    var url = this.GetjQuery(this.Elements.BrowseProcess).attr("Url");
    var ipAddress = this.GetjQuery(this.Elements.BrowseProcess).attr("ClientIp");
    var referalUrl = this.GetjQuery(this.Elements.BrowseProcess).attr("RefererUrl");
    var isMobile = this.GetjQuery(this.Elements.BrowseProcess).attr("IsMobile");
    var resolutionCode = screen.width + "*" + screen.height;
    var browserCode = this.GetBrowserCode(this.GetjQuery(this.Elements.BrowseProcess).attr("Browser"));
    var languageCode = this.GetjQuery(this.Elements.BrowseProcess).attr("LanguageCode");
    var operationSystemCode = this.GetjQuery(this.Elements.BrowseProcess).attr("OperationSystemCode");

    this.Domain = this.GetjQuery(this.Elements.BrowseProcess).attr("BISiteDomain");

    $.webPageJson(this.Options.BrowseContentUrl, { visitId: visitId, visitorId: visitorId, url: url, ipAddress: ipAddress, referalUrl: referalUrl, isMobile: isMobile, resolutionCode: resolutionCode, browserCode: browserCode, languageCode: languageCode, operationSystemCode: operationSystemCode }, $.proxy(function (data) {

        this.BrowseProcessResult(data);
    }, this));
}

BrowseRecord.prototype.BrowseProcessResult = function (browseProcessResult) {
    if (browseProcessResult.VisitIdIsNew) {
        var date = new Date();
        date.setTime(date.getTime() + (30 * 60 * 1000));
        this.SetValueToCookie("VisitId", browseProcessResult.VisitId, date, this.Domain);
    }

    if (browseProcessResult.ConsumerIsLogin) {
        $.cookie('VisitId', null)
        var date = new Date();
        date.setTime(date.getTime() + (30 * 60 * 1000));
        this.SetValueToCookie("VisitId", browseProcessResult.VisitId, date, this.Domain);
    }

    if (browseProcessResult.VisitorIdIsNew) {

        if (this.GetValueFromCookie("VisitorId") == "0") {
            this.SetValueToCookie("VisitorId", browseProcessResult.VisitorId, 365, this.Domain);
        } else {
            //            $.cookie('VisitorId', browseProcessResult.VisitorId)
            $.cookie('VisitorId', null)
            this.SetValueToCookie("VisitorId", browseProcessResult.VisitorId, 365, this.Domain);
        }
    }
}

BrowseRecord.prototype.GetValueFromCookie = function (name) {
    if (typeof ($.cookie(name)) != undefined && $.cookie(name) != null) {
        return $.cookie(name);
    }

    return 0;
}

BrowseRecord.prototype.SetValueToCookie = function (name, value, expiresTime, domain) {
    if (domain == "localhost") {
        domain = null;
    }

    $.cookie(name, value, { expires: expiresTime, path: "/", domain: domain, secure: false });
}

BrowseRecord.prototype.GetBrowserCode = function (browserCode) {

    if (browserCode == undefined || browserCode.indexOf('.') == -1) {
        return browserCode;
    } else {
        return browserCode.substring(0, browserCode.indexOf('.')) + '.' + browserCode.substr(parseInt(browserCode.indexOf('.') + 1), this.Options.BrowserHoldDigit);
    }
}


/*
*Des.:keywords auto complete 
*Author:pdd 
*Date:2011/11/18
*begin
*/

//funciton Keyword
var Keyword = function () {
    this.Options = {
        ajaxUrl: RSECGlobal.SearchSite + "App/SearchKeyword.ashx",
        //searchUrl: RSECGlobal.SearchSite + "Goods/ItemSearch.aspx?SortField=SaleQtyForSort&IsSortASC=0&KeyWord=",
        searchUrl: RSECGlobal.SearchSite + "Goods/Search.aspx?SortField=ShowOrder&IsSortASC=0&KeyWord=",
        action: {
            get: "GetKeywords"
        },
        controls: {
            container: "#e_popsearch",
            ulContainer: "#ul_Keywords",
            keywordInput: "#searchKeyWord",
            searchButton: "#BtnSearch"
        },
        KEY: {
            UP: 38,
            DOWN: 40,
            ENTER: 13
        },
        backgroundColor: "#f5f5f5",
        inputTip: "输入商品进行搜索",
        event: {
            focus: "focus",
            blur: "blur",
            click: "click"
        }
    };

    this.itemIndex = null;
    this.itemCount = 0;
    this.words = null;
    this.inputText = null;
    this.timeSpan = 1000; //request time span,unit:ms
    this.timeOutId = null;
    this.getFlag = true;
    this.isMouseOnTip = false;
    this.process = false;
}

//allow funtion get() event
Keyword.prototype.allowGet = function () {
    this.getFlag = true;
    setTimeout($.proxy(function () { this.allowGet() }, this), this.timeSpan);
}

//get keywords
Keyword.prototype.get = function (/*search keyword*/keyword) {
    //    if ($(this.Options.controls.ulContainer).find("li").length <= 0)
    //        $(this.Options.controls.ulContainer).hide();

    if (this.validate(keyword)) {
        keyword = keyword.replace("--", "-");
    }
    else
        return;

    if (!this.getFlag)
        return;
    if (this.process)
        return;
    this.process = true;

    $.webPageForJson(this.Options.ajaxUrl, { action: this.Options.action.get, keyword: keyword }, $.proxy(function (callBack) {
        if (callBack.IsSuccess && callBack.Data.success) {
            this.itemCount = callBack.Data.keywords.length;
            this.itemIndex = null;
            this.words = callBack.Data.keywords;
            this.inputText = keyword;
            $.each(callBack.Data.keywords, $.proxy(function (i, item) {
                if ($(this.Options.controls.container).css("display") == "none")
                    $(this.Options.controls.container).show();
                $(this.Options.controls.ulContainer).append("<li class=\"e_suggestNormal\" onclick=\"keyword.search('" + item.keyword + "');return false;\" style=\"cursor:pointer\" onmouseover=\"keyword.mouseOver(" + i + ",this);\" onmouseout=\"keyword.mouseOut(" + i + ",this);\">" +
                "<a href=\"javascript:void(0);\" onclick=\"keyword.search('" + item.keyword + "');return false;\" >" + item.keyword.replace(keyword, "<span style=\"color:red\">" + keyword + "</span>") + "</a></li>"); //（约" + item.resultCount + "个商品）
            }, this));

        }
        else
            $(this.Options.controls.container).hide();
        this.process = false;
    }, this))
    this.getFlag = false;
}

//show event
Keyword.prototype.show = function () {
    $(this.Options.controls.ulContainer).empty();
    $(this.Options.controls.container).hide();
    var keyword = $(this.Options.controls.keywordInput).val();
    if (keyword == "") {
        $(this.Options.controls.container).hide();
        return;
    }
    this.get(keyword);
}

//key down event
Keyword.prototype.keyDown = function () {
    if (this.itemIndex == null)
        this.itemIndex = 0;
    else if (this.itemIndex < this.itemCount - 1)
        this.itemIndex++;
    else {
        this.itemIndex = null;
        $(this.Options.controls.keywordInput).val(this.inputText);
    }
    $(this.Options.controls.ulContainer + " li").each($.proxy(function (i, item) {
        if (this.itemIndex == i) {
            $(item).css("backgroundColor", this.Options.backgroundColor);
            $(this.Options.controls.keywordInput).val(this.words[i].keyword);
        }
        else
            $(item).css("backgroundColor", "");
    }, this));
}

//key up event
Keyword.prototype.keyUp = function () {
    if (this.itemIndex == null)
        this.itemIndex = this.itemCount - 1;
    else if (this.itemIndex > 0)
        this.itemIndex--;
    else {
        this.itemIndex = null;
        $(this.Options.controls.keywordInput).val(this.inputText);
    }
    $(this.Options.controls.ulContainer + " li").each($.proxy(function (i, item) {
        if (this.itemIndex == i) {
            $(item).css("backgroundColor", this.Options.backgroundColor);
            $(this.Options.controls.keywordInput).val(this.words[i].keyword);
        }
        else
            $(item).css("backgroundColor", "");
    }, this));
}


//focus event
Keyword.prototype.listen = function () {
    if ($(this.Options.controls.keywordInput).val() == this.Options.inputTip)
        $(this.Options.controls.keywordInput).val("");
    this.show();
}
//blur event
Keyword.prototype.unListen = function () {
    if ($(this.Options.controls.keywordInput).val() == '')
        $(this.Options.controls.keywordInput).val(this.Options.inputTip);
    if (!this.isMouseOnTip) {
        $(this.Options.controls.container).hide();
    }
}

//mouseover event
Keyword.prototype.mouseOver = function (/*element [li] index*/index, /*element [li] object*/obj) {
    $(obj).css("backgroundColor", this.Options.backgroundColor);
    this.itemIndex = index;
    this.isMouseOnTip = true;
}

//mouseout event
Keyword.prototype.mouseOut = function (/*element [li] index*/index, /*element [li] object*/obj) {
    $(obj).css("backgroundColor", "");
    this.isMouseOnTip = false;
}

Keyword.prototype.validate = function (w) {
    var regChar = "['\"]+";
    var reg = new RegExp(regChar);
    if (reg.test(w)) {
        return false;
    }
    if ($.trim(w) == "")
        return false;

    if (w == this.Options.inputTip)
        return false;
    return true;
}

Keyword.prototype.replace = function (w) {
    var raRegExp = new RegExp(w.replace(/--/g, '-'))
    w = w.replace(raRegExp, w);
}



//search event
Keyword.prototype.search = function (w) {
    var regChar = "['\"]+";
    var reg = new RegExp(regChar);
    if (reg.test(w)) {
        WinAlert("提示", "对不起，关键字中包含特殊字符");
        return;
    }
    if ($.trim(w) == "")
        return;

    if (w == this.Options.inputTip)
        return;
    //location.href = this.Options.searchUrl + escape(this.replace(w));
    location.href = this.Options.searchUrl + escape(w);
    return false;
}


//var keyword = new Keyword();
Keyword.prototype = new RSUIBase();

$(document).ready(function () {

    //$(keyword.Options.controls.keywordInput).bind(keyword.Options.event.focus, function () {
    //    keyword.listen();
    //}).bind(keyword.Options.event.blur, function () {
    //    keyword.unListen();
    //});
    ////$(keyword.Options.controls.keywordInput).attr("maxlength", 40);
    ////bind search event
    //$(keyword.Options.controls.searchButton).bind(keyword.Options.event.click, function () {
    //    keyword.search($(keyword.Options.controls.keywordInput).val());
    //});

    //$(keyword.Options.controls.keywordInput).keyup(function (event) {
    //    var keycode = event.which;
    //    switch (keycode) {
    //        case keyword.Options.KEY.UP:
    //            keyword.keyUp();
    //            break;
    //        case keyword.Options.KEY.DOWN:
    //            keyword.keyDown();
    //            break;
    //        case keyword.Options.KEY.ENTER:
    //            keyword.search($(keyword.Options.controls.keywordInput).val());
    //            break;
    //        default:
    //            if ((keycode >= 112 && keycode <= 137) ||
    //                 keycode == 9 || //tab key
    //                 keycode == 12 || //clear key
    //                 (keycode >= 16 && keycode <= 20) //shift key/ctrl key/alt key/Pause key /Caps Lock key
    //                 )
    //                return;
    //            keyword.show();
    //            break;
    //    }
    //});
    //keyword.allowGet();
});

var isSearching = false;
var tipText = "请输入商品关键词或者货号";




//商品搜索
jQuery(document).ready(function () {
    var searchKeyWord = $("#searchKeyWord");
    var BtnSearch = $("#BtnSearch");
    if (searchKeyWord != undefined && searchKeyWord != null &&
       BtnSearch != undefined && BtnSearch != null) {
        BtnSearch.bind("click", function () {
            if (isSearching) {
                isSearching = false;
                return false;
            }

            var w = searchKeyWord.val();
            var regChar = "['\"]+";
            var reg = new RegExp(regChar);
            if (reg.test(w)) {
                return false;
            }
            if ($.trim(w) == "")
                return false;

            if ($.trim(w) == tipText)
                return false;

            isSearching = true;
            window.location.href = RSECGlobal.SearchSite + "Goods/Search.aspx?SortField=ShowOrder&IsSortASC=0&KeyWord=" + escape(w);
            return false;
        })

        searchKeyWord.bind("focus", function () {
            if ($.trim(searchKeyWord.val()) == tipText)
                searchKeyWord.val("");
            $("#searchKeyWord").css("color", "#000")
        }).bind("blur", function () {
            if ($.trim(searchKeyWord.val()) == "")
                searchKeyWord.val(tipText);
            $("#searchKeyWord").css("color","#999")
        }).bind("keydown", function (event) {
            var keycode = event.which;
            switch (keycode) {
                case 13:
                    {
                        var val = searchKeyWord.val()
                        var regChar = "['\"]+";
                        var reg = new RegExp(regChar);
                        if (reg.test(val)) {
                            WinAlert("提示", "对不起，关键字中包含特殊字符");
                            return;
                        }
                        if ($.trim(val) == "")
                            return;

                        if (val == tipText)
                            return;

                        isSearching = true;
                        location.href = RSECGlobal.SearchSite + "Goods/Search.aspx?SortField=ShowOrder&IsSortASC=0&KeyWord=" + escape(val);
                    }
                    break;
            }
        });
    }
});

/*
*keywords auto complete end
*/

//function clearSearchRecord() {
//    $.cookie("SearchKeyword", null, { path: '/' });
//    $("#divSearchKeyword").html("暂无记录");
//}

//$(function () {
//    $('.topR_menu_panel #divSearchKeyword a').each(function () {
//        var txt = $(this).html();
//        var v = txt.replace(/[^\x00-\xff]/g, "**");
//        var displaytxt = "";
//        if (v.length > 8) {
//            displaytxt = txt.substr(0, 3);
//            var rev = displaytxt.replace(/[^\x00-\xff]/g, "**");
//            if (rev.length == 3) {
//                displaytxt = txt.substr(0, 5) + "...";
//            }
//            else if (rev.length < 6) {
//                displaytxt = txt.substr(0, 4) + "...";
//            }
//            else { displaytxt += "..."; }
//        }
//        else
//        { displaytxt = txt; }
//        $(this).html(displaytxt);
//    });
//});

/*Added 2012-09-17 start*/
/*点击积分显示提示*/
function ShowPoint() {
    document.getElementById('login_point').style.visibility = 'visible';

}
function LeavePoint() {
    document.getElementById('login_point').style.visibility = 'hidden';
}
/*Added 2012-09-17 end*/


//$(document).ready(function () {
//    $(".e_search_txt").bind("focus", function () {
//        if ($(".e_search_txt").val() == "输入打印机型号") {
//            $(".e_search_txt").val("");
//        }
//    }).bind("blur", function () {
//        if ($.trim($(".e_search_txt").val()) == "") {
//            $(".e_search_txt").val("输入打印机型号");
//        }
//    });

//    $(".e_search_txt").keyup(function (event) {
//        var keycode = event.which;
//        if (keycode == 13
//            ) {
//            $("#BtnSearch").click();
//        }
//    });

//    $(".e_search_bt").bind("click", function () {
//        if ($(".e_search_txt").val() == "输入打印机型号" ||
//          $.trim($(".e_search_txt").val()) == "") {
//            $(".e_search_txt").focus();
//        }
//        else {
//            window.location = RSECGlobal.SearchSite + "Goods/Search.aspx?PageNo=1&KeyWord=" + escape($(".e_search_txt").val());
//        }
//        return false;
//    });
//});

/**** 2012-11-14 加入收藏 Start *****/
function addBookmark() {
    if (window.sidebar) {
        window.sidebar.addPanel(document.title, document.location.href, "");
    } else if (document.all) {
        window.external.AddFavorite(document.location.href, document.title);
    } else {
        alert("\u8bf7\u6309\u0043\u0074\u0072\u006c\u002b\u0044\u5c06\u672c\u9875\u6dfb\u52a0\u5230\u6536\u85cf\u5939");
    }
    new ShareRecord("", "F", "Favorite", "", "").AddShareRecord();
}
/******** 2012-11-14 加入收藏 End ************/


// 回到顶部
$(function () {
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(function () {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $("#back-to-top").fadeIn(500);
            }
            else {
                $("#back-to-top").fadeOut(500);
            }
        });

        //当点击跳转链接后，回到页面顶部位置

        $("#back-to-top").click(function () {
            $('body,html').animate({ scrollTop: 0 }, 500);
            return false;
        });
    });
});