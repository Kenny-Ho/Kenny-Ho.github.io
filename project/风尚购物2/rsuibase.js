
//界面操作基类
function RSUIBase() {
    this.LineId = 0; //行号，只有用于多行时才有用
    this.IsLog = false;
    this.ShowMessageType = "A";
}

//调用WebService时的错误回调函数
RSUIBase.prototype.ErrorCallback = function (error, callBackContext, response) {
    var errorString = ""; //= "Test '" + userContext + "' failed!";
    if (error == null) {
        errorString += "  Status code='" + response.get_statusCode() + "'";
    }
    else {
        errorString += error.get_message()
    }
    WinAlert("提示信息", errorString);
}

//记录调试日志，仅用于FireBug
RSUIBase.prototype.Log = function (content) {
    if ($.browser.mozilla && this.IsLog) {
        if (window.console) {
            console.log(content)
        }
    }
}
RSUIBase.prototype.LogError = function (content) {
    if ($.browser.mozilla) {
        if (window.console) {
            console.log(content)
        }
    }
}

//将两个元素定义集合合并，返回合并的集合
RSUIBase.prototype.MergeElements = function (oldElements, elements) {
    if (oldElements == undefined) {
        oldElements = new Object();
    }
    for (name in elements) {
        //alert(11);
        var object = oldElements[name];
        if (object == undefined) {
            object = new RSUIBaseElement(name, elements[name]);
        }
        //alert(13);
        if (Object.prototype.toString.call(elements[name]) == "[object Object]") {
            object = $.extend(object, elements[name]);
        }
        else {
            object.Id = elements[name];
        }
        oldElements[name] = object;
    }

    return oldElements;
}

//设置元素集合,将传入的元素集合与已有集合合并
RSUIBase.prototype.SetElements = function (elements) {
    this.Elements = this.MergeElements(this.Elements, elements);
}

//设置元素集合,将传入的元素集合与已有集合合并
RSUIBase.prototype.SetOptions = function (options) {
    this.Options = jQuery.extend(this.Options, options);
}

//设置标准元素集合,将传入的元素集合与已有标准集合合并（一般用于行类型的控件）
RSUIBase.prototype.SetStandardElements = function (elements) {
    this.StandardElementsthis = this.MergeElements(this.StandardElements, elements);
}

//设置行类型的标准元素集合，根据行号替换所有元素的Id
RSUIBase.prototype.SetLineElements = function () {
    for (name in this.Elements) {
        var id = this.Elements[name].Id;
        if (this.Elements[name].IsRadioButton) {
            continue;
        }
        if ($.isArray(id)) {
            for (var i = 0; i < id.length; i++) {
                id[i] = this.GetLineNewElementId(id[i], this.LineId);
            }
            this.Elements[name].Id = id;
        }
        else {
            this.Elements[name].Id = this.GetLineNewElementId(id, this.LineId);
        }
    }
}

RSUIBase.prototype.SerialArray = function (dataName) {
    var data = new Object();
    for (name in this.Elements) {
        var element = this.Elements[name];
        if (!element.NeedSerial) {
            continue;
        }
        var value = this.GetValue(element)
        {
            data[element.SerialName] = value;
        }
    }
    if (dataName == undefined) {
        return data;
    }
    else {
        var newData = new Object();
        newData[dataName] = data;
        return newData;
    }
}

//根据行号获取新的元素Id
RSUIBase.prototype.GetLineNewElementId = function (oldId, lineId) {
    return oldId + lineId;
}

//绑定元素事件，支持一种元素有多个Id
RSUIBase.prototype.BindElement = function (element, eventType, handler) {
    this.GetjQuery(element).bind(eventType, { Object: this }, jQuery.proxy(handler, this));
}

RSUIBase.prototype.UnBindElement = function (element, eventType) {
    this.GetjQuery(element).unbind(eventType);
}


//获取指定元素的用于jQuery选择器的Id集合，支持一种元素有多个Id
RSUIBase.prototype.GetjQueryIds = function (element) {
    //this.Log(element);
    if (element == undefined) {
        this.LogError("RSUIBase.prototype.GetjQueryIds: element == undefined");
        return "";
    }
    var ids;

    if (typeof element == String) {
        ids = "#" + element;
    }
    else {
        if (element.IsRadioButton) {
            ids = "input:radio[name='" + element.Id + "']";
        }
        else {

            if (element.Id != undefined) {
                ids = "#" + ($.isArray(element.Id) ? element.Id.join(",#") : element.Id);
            }
            else {
                ids = "";
            }
        }
        //this.Log("GetjQueryIds:" + ids);
    }
    return ids;
}

//获取指定元素的jQuery对象集合，支持一种元素有多个Id
RSUIBase.prototype.GetjQuery = function (element) {
    var ids;
    if ($.isArray(element)) {
        if ($.isArray(element)) {
            for (index in element) {
                ids += "," + this.GetjQueryIds(element[index]);
            }
        }
    }
    else {
        ids = this.GetjQueryIds(element)
    }
    var $result = $(ids);
    if ($result.length == 0 && typeof element == Object) {
        if (element.Id.length != 0) //Id为空表示此元素不需要
        {
            this.LogError("GetjQuery has not element" + element.Id);
        }
    }
    return $result;
}

//设置指定元素的值，设置的值会先分所数据类型及格式化字符串进行格式化，支持一种元素有多个Id
//根据元素的不同类型，调用不同的jQuery方法来设置
RSUIBase.prototype.SetValue = function (element, value, triggerEvent) {
    if (element.IsRadioButton) {
        this.GetjQuery(element).each(function (i) {
            if ($(this).val() == value) {
                this.checked = true;
                if (triggerEvent) {
                    $(this).trigger("click");
                }
            }
            else {
                this.checked = false;
            }
        });
    }
    else {
        var newValue = element.Format(value);
        //this.Log("Format:" + value + " to " + newValue + "\t" + element.FormatString); 
        var e = this.GetjQuery(element);
        //this.Log(e.is(":input"));
        if (e.is(":input")) {

            if (e.is(":checkbox") && element.IsCheckBoxAsBoolean) {
                e[0].checked = newValue;
            }
            else {
                e.val(newValue);
            }

        }
        else {
            e.html(newValue);
        }
    }
}

RSUIBase.prototype.GetValue = function (element) {
    this.Log(element.IsRadioButton);
    if (element.IsRadioButton) {
        var ids = this.GetjQueryIds(element);
        ids = ids + ":checked";
        this.Log(ids);

        return $(ids).val();
    }
    else {

        var e = this.GetjQuery(element);
        //this.Log(e.is(":input"));
        if (e.is(":input")) {
            if (e.is(":checkbox") && element.IsCheckBoxAsBoolean) {
                return e[0].checked;
            }
            else {
                return e.val();
            }
        }
        else {
            return e.html();
        }
    }
}


RSUIBase.prototype.ShowMessage = function (message) {
    if (this.ShowMessageType = "A") {
        WinAlert("提示信息", message);
    }
    else {
        WinAlert("提示信息", message);
    }
}

RSUIBase.prototype.IsNullOrEmpty = function (value) {
    if (value == undefined || value == null) {
        return true;
    }
    var s = Object.prototype.toString.call(value);
    switch (s) {
        case "[object String]":
            return value.length == 0;
        case "[object Number]":
            return false;
        case "[object Boolean]":
            return false;
        case "[object Array]":
            return value.length == 0;

        default:
            return false;
    }
}

/// 从URL中取得 指定名称的值
RSUIBase.prototype.GetUrlParameterValue = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return r[2];
    }
    return null;
}


// 创建遮罩层
RSUIBase.prototype.CreateMaskDiv = function () {
    //mask遮罩层
    if ($("#mask").size() == 0) {
        $('<div id="mask"></div>').appendTo('body').css({ opacity: 0.5, width: $(document).width(), height: $(document).height(), top: 0, left: 0, position: 'absolute', background: '#000', 'z-index': 20 });
    }
    else {
        $('#mask').css({ opacity: 0.5, width: $(document).width(), height: $(document).height(), top: 0, left: 0, position: 'absolute', background: '#000', 'z-index': 20 });
    }
}

/// 关闭遮罩层
RSUIBase.prototype.CloseMaskDiv = function () {
    if (null != document.getElementById("mask")) {
        document.body.removeChild(document.getElementById("mask"));
    }
}




function RSUIBaseElement(code, id) {
    this.Code = code;
    this.SerialName = code;
    this.Id = id;
    this.IsArray = $.isArray(id);
    this.FormatString = "";
    this.IsRadioButton = false;
    this.IsCheckBoxAsBoolean = false;
    this.NeedSerial = false;

}




RSUIBaseElement.prototype.Format = function (value) {
    switch (value) {
        case null:
            return "null";
        case undefined:
            return "undefined";
    }
    var s = Object.prototype.toString.call(value);
    switch (s) {
        case "[object String]":
            return value;
        case "[object Number]":
            return formatNumber(value, this.FormatString);   //formatCurrenyNumber(value, 2, 1, this.FormatString);  //
        case "[object Boolean]":
            return value;
        case "[object Array]":
            return value;
        case "[object Date]":
            return value.Format(this.FormatString);
        case "[object Function]":
            return value;
        case "[object RegExp]":
            return value;
        case "[object Object]":
            return value;
        default:
            return value;
    }
}

/**
* 将数值四舍五入后格式化.
* @param num 数值(Number或者String)
* @param cent 要保留的小数位(Number)
* @param isThousand 是否需要千分位 0:不需要,1:需要(数值类型);
* @return 格式的字符串,如'1,234,567.45'
* @type String
*/
function formatCurrenyNumber(num, cent, isThousand, pattern) {
    if (pattern.indexOf('.') > 0)
        cent = 2;
    else
        cent = 0;
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))//检查传入数值为数值类型.
        num = "0";
    if (isNaN(cent))//确保传入小数位为数值型数值.
        cent = 0;
    cent = parseInt(cent);
    cent = Math.abs(cent); //求出小数位数,确保为正整数.
    if (isNaN(isThousand))//确保传入是否需要千分位为数值类型.
        isThousand = 0;
    isThousand = parseInt(isThousand);
    if (isThousand < 0)
        isThousand = 0;
    if (isThousand >= 1) //确保传入的数值只为0或1
        isThousand = 1;
    sign = (num == (num = Math.abs(num))); //获取符号(正/负数)
    //Math.floor:返回小于等于其数值参数的最大整数
    num = Math.floor(num * Math.pow(10, cent) + 0.50000000001); //把指定的小数位先转换成整数.多余的小数位四舍五入.
    cents = num % Math.pow(10, cent); //求出小数位数值.
    num = Math.floor(num / Math.pow(10, cent)).toString(); //求出整数位数值.
    cents = cents.toString(); //把小数位转换成字符串,以便求小数位长度.
    if (cent > 0) {
        while (cents.length < cent) {//补足小数位到指定的位数.
            cents = "0" + cents;
        }
    }
    if (isThousand == 0) //不需要千分位符.
        return (((sign) ? '' : '-') + num + '.' + cents);
    //对整数部分进行千分位格式化.
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
    num.substring(num.length - (4 * i + 3));
    if (cent > 0)
        return (((sign) ? '' : '-') + num + '.' + cents);
    else
        return (((sign) ? '' : '-') + num);
}



function formatNumber(number, pattern) {
    var str = number.toString();
    var strInt;
    var strFloat;
    var formatInt;
    var formatFloat;
    if (/\./g.test(pattern)) {
        formatInt = pattern.split('.')[0];
        formatFloat = pattern.split('.')[1];
    } else {
        formatInt = pattern;
        formatFloat = null;
    }
    if (/\./g.test(str)) {
        if (formatFloat != null) {
            var tempFloat = Math.round(parseFloat('0.' + str.split('.')[1]) * Math.pow(10, formatFloat.length)) / Math.pow(10, formatFloat.length);
            strInt = (Math.floor(number) + Math.floor(tempFloat)).toString();
            strFloat = /\./g.test(tempFloat.toString()) ? tempFloat.toString().split('.')[1] : '0';
        } else {
            strInt = Math.round(number).toString();
            strFloat = '0';
        }
    } else {
        strInt = str;
        strFloat = '0';
    }
    if (formatInt != null) {
        var outputInt = '';
        var zero = formatInt.match(/0*$/)[0].length;
        var comma = null;
        if (/,/g.test(formatInt)) {
            comma = formatInt.match(/,[^,]*/)[0].length - 1;
        }
        var newReg = new RegExp('(\\d{' + comma + '})', 'g');
        if (strInt.length < zero) {
            outputInt = new Array(zero + 1).join('0') + strInt;
            outputInt = outputInt.substr(outputInt.length - zero, zero)
        } else {
            outputInt = strInt;
        }
        var 
        outputInt = outputInt.substr(0, outputInt.length % comma) + outputInt.substring(outputInt.length % comma).replace(newReg, (comma != null ? ',' : '') + '$1')
        outputInt = outputInt.replace(/^,/, '');
        strInt = outputInt;
    }
    if (formatFloat != null) {
        var outputFloat = '';
        var zero = formatFloat.match(/^0*/)[0].length;
        if (strFloat.length < zero) {
            outputFloat = strFloat + new Array(zero + 1).join('0');
            //outputFloat        = outputFloat.substring(0,formatFloat.length);
            var outputFloat1 = outputFloat.substring(0, zero);
            var outputFloat2 = outputFloat.substring(zero, formatFloat.length);
            outputFloat = outputFloat1 + outputFloat2.replace(/0*$/, '');
        } else {
            outputFloat = strFloat.substring(0, formatFloat.length);
        }
        strFloat = outputFloat;
    } else {
        if (pattern != '' || (pattern == '' && strFloat == '0')) {
            strFloat = '';
        }
    }
    return strInt + (strFloat == '' ? '' : '.' + strFloat);
}


String.prototype.stripNonNumeric = function (str) {
    str += '';
    var rgx = /^\d|\.|-$/;
    var out = '';
    for (var i = 0; i < str.length; i++) {
        if (rgx.test(str.charAt(i))) {
            if (!((str.charAt(i) == '.' && out.indexOf('.') != -1) ||
             (str.charAt(i) == '-' && out.length != 0))) {
                out += str.charAt(i);
            }
        }
    }
    return out;
}



Number.prototype.format = function (format) {
    var hasComma = -1 < format.indexOf(','),
		psplit = format.stripNonNumeric().split('.'),
		that = this;

    // compute precision
    if (1 < psplit.length) {
        // fix number precision
        that = that.toFixed(psplit[1].length);
    }
    // error: too many periods
    else if (2 < psplit.length) {
        throw ('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format);
    }
    // remove precision
    else {
        that = that.toFixed(0);
    }

    // get the string now that precision is correct
    var fnum = that.toString();

    // format has comma, then compute commas
    if (hasComma) {
        // remove precision for computation
        psplit = fnum.split('.');

        var cnum = psplit[0],
			parr = [],
			j = cnum.length,
			m = Math.floor(j / 3),
			n = cnum.length % 3 || 3; // n cannot be ZERO or causes infinite loop

        // break the number into chunks of 3 digits; first chunk may be less than 3
        for (var i = 0; i < j; i += n) {
            if (i != 0) { n = 3; }
            parr[parr.length] = cnum.substr(i, n);
            m -= 1;
        }

        // put chunks back together, separated by comma
        fnum = parr.join(',');

        // add the precision back in
        if (psplit[1]) { fnum += '.' + psplit[1]; }
    }

    // replace the number portion of the format with fnum
    return format.replace(/[d,?.?]+/, fnum);
};

//设置keydown的默认点击按钮，如：$(function(){keydown($('.div'),'btnsubmit')})
function setkeydown(obj, buttonID) {
    obj.keydown(function (e) {
        if (e.keyCode == 13) {
            $('#' + buttonID)[0].click();
            return false;
        }
    });
}
//去头尾空格
String.prototype.trim = function () {
    return this.replace(/^\s+/g, "").replace(/\s+$/g, "");
}
//替换所有
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
} 
