/******************************************************************************************************************
*** 1.01 2010.10.29  郑义飞   jQuery.fn.extend({ "showPopup": function(pOptions)，IE需要调用两次
*** 
***
***
******************************************************************************************************************/
jQuery.extend({
    webService: function (options) {
        jQuery.ajax({
            url: options.service + '/' + options.method,
            data: jQuery.toJSON(options.params),
            type: "POST",
            contentType: "application/json",
            timeout: 100000,
            dataType: "json",
            success: function (callbackData, textStatus, object) {
                options.success(callbackData.d, textStatus, object);
            },
            error: function (xmlHttpRequest, textstatus, errorthrown) {
                if (textstatus == 'timeout') {
                    //alert('网络连接故障，服务器响应超时！');
                    return;
                }
                try {
                    alert(jQuery.evalJSON(xmlHttpRequest.responseText).Message);
                }
                catch (ex) {
                    WinAlert("远程服务器返回错误", xmlHttpRequest.responseText);
                }
                if (options.error != undefined && options.error != null) {
                    options.error();
                }
            }
        });
    }
});

jQuery.extend({
    webPage: function (url, data, callback) {
        jQuery.ajax({
            url: url,
            data: data,
            type: "GET",
            timeout: 100000,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data, textStatus, object) {
                callback(data, textStatus, object);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (textStatus == 'timeout') {
                    alert('网络连接故障，服务器响应超时！');
                    return;
                }
                alert(jQuery.evalJSON(xmlHttpRequest.responsetext).message);
                if (options.error != undefined && options.error != null) {
                    options.error();
                }
            }

        });
    }
});



//jQuery.extend({
//    webPageForJson: function (url, data, callback) {
//        jQuery.ajax({
//            url: url,
//            data: data,
//            type: "GET",
//            timeout: 100000,
//            dataType: "jsonp",
//            jsonp: "callback",
//            success: function (data, textStatus, object) {
//                callback(data, textStatus, object);
//            },
//            error: function (xmlHttpRequest, textStatus, errorThrown) {
//                if (textStatus == 'timeout') {
//                    alert('网络连接故障，服务器响应超时！');
//                    return;
//                }
//                alert((eval('(' + xmlHttpRequest.responseText + ')')).ErrorInfo);
//            }

//        });
//    }
//});


jQuery.extend({
    webPageForJson: function (url, data, callback, errorCallBack) {
        jQuery.ajax({
            url: url,
            data: data,
            type: "GET",
            timeout: 100000,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data, textStatus, object) {
                callback(data, textStatus, object);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (textStatus == 'timeout') {
                    alert('网络连接故障，服务器响应超时！');
                    return;
                }
                alert((eval('(' + xmlHttpRequest.responseText + ')')).ErrorInfo);
                errorCallBack();
            }

        });
    }
});

jQuery.extend({
    webPageForJsonWithSync: function (url, data, success, errorCallBack) {
        jQuery.ajax({
            url: url,
            data: data,
            type: "GET",
            timeout: 100000,
            dataType: "jsonp",
            jsonp: "callback",
            async: false,
            success: function (data, textStatus, object) {
                success(data, textStatus, object);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (textStatus == 'timeout') {
                    alert('网络连接故障，服务器响应超时！');
                    return;
                }
                if (errorCallBack)
                    errorCallBack();
            }

        });
    }
});



jQuery.extend({
    webPageErrorBack: function (url, data, callback, errorCallBack) {
        jQuery.ajax({
            url: url,
            data: data,
            type: "GET",
            timeout: 100000,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data, textStatus, object) {
                callback(data, textStatus, object);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (textStatus == 'timeout') {
                    WinAlert('网络连接故障，服务器响应超时！');
                    return;
                }
                errorCallBack(xmlHttpRequest, textStatus, errorThrown);
            }

        });
    }
});



jQuery.extend({
    webPageForJsonPost: function (url, data, callback, errorCallBack) {
        jQuery.ajax({
            url: url,
            data: data,
            type: "POST",
            timeout: 100000,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data, textStatus, object) {
                callback(data, textStatus, object);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (textStatus == 'timeout') {
                    alert('网络连接故障，服务器响应超时！');
                    return;
                }
                alert((eval('(' + xmlHttpRequest.responseText + ')')).ErrorInfo);
                errorCallBack();
            }

        });
    }
});



jQuery.extend({
    webPageForPost: function (url, data, callback) {
        jQuery.ajax({
            url: url,
            data: data,
            type: "POST",
            timeout: 100000,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data, textStatus, object) {
                if (data.IsSuccess) {
                    callback(data.Data, textStatus, object);
                }
                else {
                    alert(data.ErrorInfo);
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (textStatus == 'timeout') {
                    alert('网络连接故障，服务器响应超时！');
                    return;
                }
                alert(jQuery.evalJSON(xmlHttpRequest.responsetext).message);
                if (options.error != undefined && options.error != null) {
                    options.error();
                }
            }

        });
    }
});




jQuery.extend({
    webPageJson: function (url, data, callback) {
        jQuery.ajax({
            url: url,
            data: data,
            type: "GET",
            timeout: 100000,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data, textStatus, object) {
                if (data.IsSuccess) {
                    callback(data.Data, textStatus, object);
                }
                else {
                    alert(data.ErrorInfo);
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (textStatus == 'timeout') {
                    alert('网络连接故障，服务器响应超时！');
                    return;
                }
                alert(jQuery.evalJSON(xmlHttpRequest.responsetext).message);
                if (options.error != undefined && options.error != null) {
                    options.error();
                }
            }

        });
    }
});

jQuery.extend({
    webPageJsonPost: function (url, data, callback) {
        jQuery.ajax({
            url: url,
            data: data,
            type: "POST",
            timeout: 100000,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data, textStatus, object) {
                if (data.IsSuccess) {
                    callback(data.Data, textStatus, object);
                }
                else {
                    alert(data.ErrorInfo);
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (textStatus == 'timeout') {
                    alert('网络连接故障，服务器响应超时！');
                    return;
                }
                alert(jQuery.evalJSON(xmlHttpRequest.responsetext).message);
                if (options.error != undefined && options.error != null) {
                    options.error();
                }
            }

        });
    }
});


(function ($) {
    jQuery.fn.extend({
        "showPopup": function (pOptions) {
            var v_left = ($(window).width() - this.width()) / 2;
            var v_top = ($(window).height() - this.height()) / 2;
            var element = document.body || document.body;
            v_left += $(document).scrollLeft();
            v_top += $(document).scrollTop();
            this.css("position", "absolute");
            this.css("left", v_left + "px");
            this.css("top", v_top + "px");
            this.hide().show()
        }
    });
})(jQuery);



jQuery.extend({
    showPopup: function (pOptions) {

        var options = { buttonId: "ButtonId", margin: 20, resultId: "ResultId", resultHtml: "", autoHide: false, autoHideSecond: 10 };
        options = this.extend(options, pOptions);
        $BasketResult = $("#" + options.resultId);
        if ($(options.resultHtml) != undefined && $(options.resultHtml).length > 0) {
            if ($BasketResult.length > 0) {
                $BasketResult.remove();
            }
            var $i = $(options.resultHtml)
            $i.appendTo($("body"));
            // $("body").append($i);
        }

        var $BasketResult = $("#" + options.resultId);
        if (!options.autoHide) {
            $BasketResult.showPopup(pOptions);
        }
        else {
            new RemindMessageBox("提示信息", "您所选购的商品已经成功放入购物车");
        }
        //        if (options.autoHide) {
        //            window.setTimeout(function () { $BasketResult.empty().hide(); },
        //                options.autoHideSecond * 1000);
        //        }
    }
});



(function ($) {
    jQuery.fn.extend({
        "showPopupNoClose": function (pOptions) {
            var v_left = ($(window).width() - this.width()) / 2;
            var v_top = ($(window).height() - this.height()) / 2;
            var element = document.body || document.body;
            v_left += $(document).scrollLeft();
            v_top += $(document).scrollTop();
            this.css("position", "absolute");
            this.css("left", v_left + "px");
            this.css("top", v_top + "px");
            this.hide().show()
        }
    });
})(jQuery);



jQuery.extend({
    showPopupNoClose: function (pOptions) {
        var options = { buttonId: "ButtonId", margin: 20, resultId: "ResultId", resultHtml: "", autoHide: false, autoHideSecond: 10 };
        options = this.extend(options, pOptions);
        $BasketResult = $("#" + options.resultId);
        if ($(options.resultHtml) != undefined && $(options.resultHtml).length > 0) {
            if ($BasketResult.length > 0) {
                $BasketResult.remove();
            }
            var $i = $(options.resultHtml)
            $i.appendTo($("body"));
            // $("body").append($i);
        }

        var $BasketResult = $("#" + options.resultId);
        $BasketResult.showPopupNoClose(pOptions);
        //        if (options.autoHide) {
        //            window.setTimeout(function () { $BasketResult.empty().hide(); },
        //                options.autoHideSecond * 1000);
        //        }

    }
});




