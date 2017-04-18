jQuery.extend(jQuery.validator.messages, {
  required: "必填字段",
  remote: "请修正该字段",
  email: "请输入正确格式的电子邮件",
  url: "请输入合法的网址",
  date: "请输入合法的日期",
  dateISO: "请输入合法的日期 (ISO).",
  number: "请输入合法的数字",
  digits: "只能输入整数",
  creditcard: "请输入合法的信用卡号",
  equalTo: "请再次输入相同的值",
  accept: "请输入拥有合法后缀名的字符串",
  maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
  minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
  rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
  range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
  max: jQuery.validator.format("请输入一个最大为{0} 的值"),
  min: jQuery.validator.format("请输入一个最小为{0} 的值")
});

/*添加自定义验证规则*/

//手机验证规则  
jQuery.validator.addMethod("mobile", function (value, element) {
    var mobile = /^1[3|4|5|7|8]\d{9}$/;
	return this.optional(element) || (mobile.test(value));
}, "手机格式不对");

//用户名验证规则  
jQuery.validator.addMethod("account", function (value, element) {
    var account = /^[a-zA-Z_]\w{5,15}$/;
	return this.optional(element) || (account.test(value));
}, "用户名不合法");

//密码验证规则
jQuery.validator.addMethod("checkPsw", function (value, element) {
    var account = /^\w{6,16}$/;
	return this.optional(element) || (account.test(value));
}, "密码不合法");

//密码相同验证规则
jQuery.validator.addMethod("equalTo2", function (value, element) {
    var returnVal = true;
    var id = $(element).attr("equalTo");console.log(id);
    var targetVal = $(id).val();console.log(targetVal);
    if(value === targetVal){
        returnVal = false;
    }
		return returnVal;
}, "两次密码不相同");

//验证码验证规则
jQuery.validator.addMethod("equalTo1", function (value, element) {
    var returnVal = true;
    var id = $(element).attr("equalToy");console.log(id);
    var targetVal = $(id).val();console.log(targetVal);
    if(value === targetVal){
        returnVal = false;
    }
		return returnVal;
}, "两次密码不相同");

//验证当前值和目标val的值相等 相等返回为 false
/*jQuery.validator.addMethod("equalTo2",function(value, element){
    var returnVal = true;
    var id = $(element).attr("data-rule-equalto2");
    var targetVal = $(id).val();
    if(value === targetVal){
        returnVal = false;
    }
    return returnVal;
},"不能和原始密码相同");*/

//配置通用的默认提示语
$.extend($.validator.messages, {
	required: '必填',
    equalTo: "两次密码不一致"
});

