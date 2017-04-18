ShareRecord = function (itemId, shareType, shareSite, orderId, relativeValue) {
    this.Options = { Url: RSECGlobal.DefaultSite + "Goods/Services/AsyncShareRecord.ashx", Add: "AddShareRecord" };
    this.ItemId = itemId;
    this.ShareType = shareType;
    this.ShareSite = shareSite;
    this.OrderId = orderId;
    this.RelativeValue = relativeValue;
}

ShareRecord.prototype.AddShareRecord = function () {
    $.webPageForJson(this.Options.Url, { action: this.Options.Add, ItemId: this.ItemId, ShareType: this.ShareType, ShareWebSite: this.ShareSite,
        OrderId: this.OrderId, RelativeValue: this.RelativeValue
    }, $.proxy(function (callBack) {
        if (callBack.IsSuccess) {
            if (callBack.Data.Success) {
                
            }
            else {
                WinAlert("提示信息", callBack.Data.msg);
            }
        }
        else {
            WinAlert("提示信息", callBack.ErrorInfo);
        }
    }, this));
}