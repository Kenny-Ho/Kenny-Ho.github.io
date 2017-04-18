function PageHeader() {
    var memberSite = RSECGlobal.MemberSite;
    if ("https:" == document.location.protocol) {
        memberSite = MemberSite;
    }
    this.LoadUrl = memberSite + "Customer/PageHeader/PageHeaderWeb.aspx";
    this.SetElements({});
    this.IsLog = true;
}

PageHeader.prototype = new RSUIBase();

PageHeader.prototype.Refresh = function () {
    var url = this.LoadUrl + "?Id=" + Math.random();
    $.webPageJson(this.LoadUrl, {}, $.proxy(this.RefreshCallback, this));
}

PageHeader.prototype.RefreshCallback = function (pageHeader) {
    $("#PageHeader").html(pageHeader.PageHeaderString);
}

 