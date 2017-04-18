/////推荐搜索页面 重复商品显示  2013/8/22

var ItemQty = function (itemIds, itemQtyControlPfex) {
    this.itemIds = itemIds;
    this.itemQtyControlPfex = itemQtyControlPfex;
    this.itemOrderCycle = "hid_ItemOrderCycle_";
    this.site = 'https:' == document.location.protocol ? RSECGlobal.DefaultSite.replace("http:", "https:") : RSECGlobal.DefaultSite;
}
var isDeatailPage = false;
ItemQty.prototype.get = function () {
    
    if (this.itemIds == "" || this.itemQtyControlPfex == "") return;
    var _self = this;

    $.webPageForJsonPost(this.site + "Goods/Services/AsyncItem.ashx",
    { action: "GetItemQty", itemids: this.itemIds }, $.proxy(function (callBack) {
        if (callBack.IsSuccess) {
            if (callBack.Data.success) {
                var data = callBack.Data.data;
                var info = "无库存";
                
                $.each(data, function (i, item) {
                    $("#lbl_CurrentQty_" + item.ItemId).val(item.ItemQty);
                    if (item.ItemQty <= 0) {

                        var boType = $("#boType_" + item.ItemId.toLocaleLowerCase()).val();
                        if (boType == undefined) {
                            boType = $("#boType_" + item.ItemId).val();
                        }

                        if (!isDeatailPage) {
                            var buyButton_val = $("#buyButton_" + item.ItemId).html();
                            if (boType == "C") {
                                if (buyButton_val == "兑换礼品") {
                                    $("#buyButton_" + item.ItemId).val("不可兑换");
                                    $("a[itemIdAttr='buyButton_" + item.ItemId + "']").val("不可兑换");
                                }
                                else {
                                    $("#buyButton_" + item.ItemId).val("已售罄");
                                    $("a[itemIdAttr='buyButton_" + item.ItemId + "']").val("已售罄");
                                }
                            }
                            else if (boType == "W") {

                                $("#buyButton_" + item.ItemId).val("到货通知");
                                $("#buyButton_" + item.ItemId).attr("class", "nostock");
                                $("#buyButton_" + item.ItemId).bind("click", function () {
                                    location = RSECGlobal.DefaultSite + "Goods/OutOfStockRegisterAdd.aspx?itemId=" + item.ItemId; return false;
                                });

                                $("a[itemIdAttr='buyButton_" + item.ItemId + "']").val("到货通知");
                                $("a[itemIdAttr='buyButton_" + item.ItemId + "']").attr("class", "nostock");
                                $("a[itemIdAttr='buyButton_" + item.ItemId + "']").bind("click", function () {
                                    location = RSECGlobal.DefaultSite + "Goods/OutOfStockRegisterAdd.aspx?itemId=" + item.ItemId; return false;
                                });
                            }
                            else {
                                if ($("a[itemIdAttr='buyButton_" + item.ItemId + "']").length == 0) {
                                    $("#buyButton_" + item.ItemId).bind("click", function () {
                                        addToCart("" + item.ItemId + "");
                                    });
                                }
                            }
                            info = item.Status;
                        }
                        else {
                            //debugger;
                            //用于单品页
                            var noQtyRecommend = new NoQtyRecommend();
                            noQtyRecommend.GetNoQtyRecommendItems(item.ItemId);

                            $("#divAddToCart").show();
                            $("#divForFavorite").show();

                            if (boType == "C") {
                                $("#lblAddToBasket").hide();
                                $("#itemOutOfStorage").hide();
                                $("#imgItemDetailNotSale").show();
                            }
                            else if (boType == "W") {

                                $("#lblAddToBasket").hide();
                                $("#itemOutOfStorage").show();
                                $("#imgItemDetailNotSale").hide();
                            }
                            else {
                                $("#lblAddToBasket").show();
                                $("#itemOutOfStorage").hide();
                                $("#imgItemDetailNotSale").hide();
                            }
                            info = item.Status;
                        }
                    }
                    else {
                        info = item.Status;
                        if (isDeatailPage) {
                            $("#divAddToCart").show();
                            $("#DivCannotBuyMessage").hide();
                            $("#lblAddToBasket").show();
                            $("#btnAddToBasket").show();
                            
                        } else {
                            if ($("a[itemIdAttr='buyButton_" + item.ItemId + "']").length == 0) {
                                $("#buyButton_" + item.ItemId).bind("click", function () {
                                    addToCart("" + item.ItemId + "");
                                });
                            }
                        }
                    }

                    //if ($("#itemCanDelivery").val() == "1") {
                        $("#divForFavorite").show();
                        $("#btnCanNotDelivery").css("display", "none");
                    //} else {
                    //    $("#divForFavorite").hide();
                    //    $("#lblAddToBasket").show();
                    //    $("#btnAddToBasket").hide();
                    //    $("#itemOutOfStorage").hide();
                    //    $("#imgItemDetailNotSale").hide();
                    //    $("#btnCanNotDelivery").css("display", "block");
                    //}
                    $("#" + _self.itemQtyControlPfex + item.ItemId).html(info);
                });
            }
        }
        else {
            WinAlert("提示信息", callBack.ErrorInfo);
        }
    }, this));
}

/*用于多个商品显示库存，需要定义回调函数*/
ItemQty.prototype.loadStock = function (canSaleCallBack/*可购买的回调函数*/, notCanSaleCallBack/*不可购买的回调函数*/,completeCallBack/*完成后的回调函数*/) {

    if (this.itemIds == "" || this.itemQtyControlPfex == "") return;
    var _self = this;

    $.webPageForJson(this.site + "Goods/Services/AsyncItem.ashx",
    { action: "GetItemQty", itemids: this.itemIds }, $.proxy(function (callBack) {
        if (callBack.IsSuccess) {
            if (callBack.Data.success) {
                var data = callBack.Data.data;
                $.each(data, function (i, item) {
                    if (item.ItemQty <= 0) {
                       
                        var boType = $("#boType_" + item.ItemId.toLocaleLowerCase()).val();
                        if (boType == "C" || boType == "W") {
                            notCanSaleCallBack(item.ItemId);
                        }
                        else {
                            canSaleCallBack(item.ItemId);
                        }
                    }
                    else
                        canSaleCallBack(item.ItemId);
                });
            }
            completeCallBack(callBack.Data.data);
        }
        else {
            WinAlert("提示信息", callBack.ErrorInfo);
        }
    }, this));
}



ItemQty.prototype.getOrderCycle = function (itemId) {
    $.webPageForJson(RSECGlobal.ProductSite + "Goods/Services/AsyncItem.ashx", { action: "GetPurchaseCycle", itemId: itemId }, $.proxy(function (callBack) {
        if (callBack.IsSuccess) {
            if (callBack.Data.success) {
                if (callBack.Data.OrderCycle > 0) {

                }
            }
        }
        else {
            WinAlert("提示信息", callBack.ErrorInfo);
        }
    }, this));
}

function outStorageRedirect(itemid) {
    location = RSECGlobal.DefaultSite + "Goods/OutOfStockRegisterAdd.aspx?itemId=" + itemid; return false;
}



var ItemPrice = function (itemIds, itemPricePfex) {
    this.itemIds = itemIds;
    this.itemPricePfex = itemPricePfex;
    this.site = 'https:' == document.location.protocol ? RSECGlobal.DefaultSite.replace("http:", "https:") : RSECGlobal.DefaultSite;
}

ItemPrice.prototype.loadPrice = function () {
    if (this.itemIds == "")
        return;
    $.webPageForJsonPost(this.site + "Goods/Services/AsyncItemPrice.ashx", { action: "GetItemPrice", ItemIds: this.itemIds }, $.proxy(function (callBack) {
        if (callBack.IsSuccess) {
            if (callBack.Data.success) {
                $.each(callBack.Data.data, $.proxy(function (i, item) {
                    $("#" + this.itemPricePfex + item.ItemId).html(item.Price);
                }, this));
            }
        }
        else {
            WinAlert("提示信息", callBack.ErrorInfo);
        }
    }, this));
}

var ItemAvergePrice = function (itemIds, itemPricePfex, itemAveragePricePfex) {
    this.itemIds = itemIds;
    this.itemPricePfex = itemPricePfex;
    this.itemAveragePricePfex = itemAveragePricePfex;
    this.site = 'https:' == document.location.protocol ? RSECGlobal.DefaultSite.replace("http:", "https:") : RSECGlobal.DefaultSite;
}

ItemAvergePrice.prototype.loadPrice = function () {
    if (this.itemIds == "")
        return;
    $.webPageForJsonPost(this.site + "Goods/Services/AsyncItemPrice.ashx", { action: "GetItemPrice", ItemIds: this.itemIds, hasAveragePrice: 1 }, $.proxy(function (callBack) {
        if (callBack.IsSuccess) {
            if (callBack.Data.success) {
                //alert(callBack.Data.data.length);
                $.each(callBack.Data.data, $.proxy(function (i, item) {
                    var itemId = this.itemPricePfex + item.ItemId;
                    $("#" + itemId).html(item.Price);
                    $("span[itemIdAttr='" + itemId + "']").html(item.Price);
                    if (item.AveragePrice != "") {
                        var averagePriceItemId = this.itemAveragePricePfex + item.ItemId;
                        $("#" + averagePriceItemId).parent().show();
                        $("#" + averagePriceItemId).html(item.AveragePrice + " 元/" + item.UnitName);
                        $("sapn=[itemIdAttr='" + averagePriceItemId + "']").show();
                        $("sapn=[itemIdAttr='" + averagePriceItemId + "']").html(item.AveragePrice + " 元/" + item.UnitName);
                    }

                    var pirce = parseFloat(item.Price.replace(',', ''));
                    var originalPrice = parseFloat(item.OriginalPrice.replace(',', ''));

                    if (item.HasConsumerPrice) {
                        if (originalPrice > pirce) {
                            $("#ItemOriginalPrice" + item.ItemId).html("&yen;" + item.OriginalPrice);
                            $("span[itemIdAttr='ItemOriginalPrice" + item.ItemId + "']").html(item.OriginalPrice);
                            $("#ConsumerPiceIcon" + item.ItemId).show();
                            $("span[itemIdAttr='ConsumerPiceIcon" + item.ItemId + "']").show();
                        }
                        else {
                            $("#showOriginalPrice_" + item.ItemId).hide();
                            $("span[itemIdAttr='showOriginalPrice_" + item.ItemId + "']").hide();
                        }
                    } else {
                        
                        if (originalPrice > pirce) {
                            $("#ItemOriginalPrice" + item.ItemId).html("&yen;" + item.OriginalPrice);
                            $("span[itemIdAttr='ItemOriginalPrice" + item.ItemId + "']").html(item.OriginalPrice);
                        } else {
                            $("#showOriginalPrice_" + item.ItemId).hide();
                            $("span[itemIdAttr='showOriginalPrice_" + item.ItemId + "']").hide();
                        }

                        $("#ConsumerPiceIcon" + item.ItemId).hide();
                        $("span[itemIdAttr='ConsumerPiceIcon" + item.ItemId + "']").hide();
                    }
                }, this));
            }
        }
        else {
            WinAlert("提示信息", callBack.ErrorInfo);
        }
    }, this));
}


function AddToBasketConfirm(itemId, itemSkuId, qty) {
    $("#AddBasketConfirmLoadImg").show();
    $("#AddBasketConfirmLoadButton").hide();
    $("#AddToBasketConfirmClose").hide();
    $("#AddToBasketConfirmCloseText").hide();
    var addToBasket = new AddToBasket({ BtnAddToBasket: "" }, { ResultMarginX: 0, ResultMarginY: 0 });
    addToBasket.AddCompleted = null;
    addToBasket.Options.IsToBasketPage = false;
    addToBasket.Add({ ItemId: itemId, ItemSkuId: itemSkuId, Qty: qty, PromotionId: 0, StyleAdPositionId: 0 });
}


function AddToBasketSelect(itemId, itemSkuId, consumerQty, stockQty, basketQty) {
    $("#AddBasketSelectLoadImg").show();
    $("#AddBasketSelectLoadButton").hide();
    $("#AddToBasketSelectClose").hide();
    $("#AddToBasketSelectCloseText").hide();
    var qty = parseInt(consumerQty) + parseInt(basketQty);
    if ($("#toBuytStockQty").attr("checked"))
        qty = stockQty;
    
    if (basketQty <= 0) {
        var addToBasket = new AddToBasket({ BtnAddToBasket: "" }, { ResultMarginX: 0, ResultMarginY: 0 });
        addToBasket.AddCompleted = null;
        addToBasket.Options.IsToBasketPage = false;
        addToBasket.Add({ ItemId: itemId, ItemSkuId: itemSkuId, Qty: qty, PromotionId: 0, StyleAdPositionId: 0, Confirm: true });
    }
    else {
        $.webPageForJson(('https:' == document.location.protocol ? RSECGlobal.ProductSite.replace("http:", "https:") : RSECGlobal.ProductSite) + "Shopping/Services/Basket.ashx", {
            action: "ModifyQty", itemSkuId: itemSkuId, qty: qty
        }, $.proxy(function (callBack) {
            if (callBack.IsSuccess && callBack.Data.success) {
                var _autoHide = false;
                if (this.isFromBaskeInfoPage()) {
                    _autoHide = true;
                    var refreshBasketInfo = new RefreshBasketInfo(itemSkuId);
                    refreshBasketInfo.Refresh();
                }
                $.showPopup({
                    buttonId: "", resultHtml: callBack.Data.data.replace("{$O$}", ""), resultId: "xbpopWrap2", autoHide: _autoHide,
                    marginX: "", marginY: ""
                });
                ShowCartInfo(callBack.Data.basketInfo.ItemShortInfos, callBack.Data.itemCount, callBack.Data.amount);
            }
            else
                WinAlert("提示信息", callBack.ErrorMsg);

        }, this));
    }
}

/* 判断当前页面是否是购物车页面 */
function isFromBaskeInfoPage() {
    var _page = window.location.pathname;
    _page = _page.toLocaleLowerCase();
    return _page.indexOf("shopping/basketinfo.aspx") > -1;
}

function AddToBasketCancel(itemId, itemSkuId, qty) {
    $("#xbpopWrap2").hide();
}

(function ($) {
    $.ChangeNum = function (type, id) {
        var e = $("#" + id);
        var i = parseInt(e.val());
        if (typeof (type) == "object") {
            e = $(type);
            if (isNaN(e.val()) || parseInt(e.val()) <= 0) {
                //WinAlert("提示信息", '请输入正确的购买数量！');
                e.val(1);
            }
        } else if (type == "+") {
            i++;
            if (i > 999) {
                i = 999;
            }
            e.val(i);
        } else if (type == "-") {
            i--;
            if (i <= 0) {
                i = 1;
            }
            e.val(i);
        }
        //this.Exsit = function (e)
        //{
        //    return typeof (e) != "undefined" && e != null && e != "";
        //}
    }
})(jQuery);

