/***
 * 取得字符串的字节长度。
 * @param str
 * @return
 */
var lenFor = function(str) {
	var byteLen = 0, len = str.length;
	if (str) {
		for ( var i = 0; i < len; i++) {
			if (str.charCodeAt(i) > 255) {
				byteLen += 2;
			}
			else {
				byteLen++;
			}

		}
		return byteLen;
	}
	else {
		return 0;
	}
}
/***
 * 将表单的数据保存到data对象中
 * @return
 */
function submitToJs(retFunc){
	var P=$("#"+thisPage.id);
	var inputs=P.find("input[name],textarea[name]");
	for(var j=0;j<inputs.length;j++){
		myData[inputs[j].name]=inputs[j].value.replace("\n","<br/>").trim();
		$("td[name="+inputs[j].name+"]").html(inputs[j].value.trim());
		$("span[name="+inputs[j].name+"]").html(inputs[j].value.trim());
	}
	if(retFunc==null||retFunc._proto_==null) return true;
	else return retFunc();//retFunc()回调函数，返回true 
}
function submitToParamData(){
	var P=$("#"+thisPage.id);
	var inputs=P.find("input[name],textarea[name]");
	for(var j=0;j<inputs.length;j++){
		eval("paramData."+inputs[j].name+"='"+inputs[j].value.replace("\n","<br/>").trim()+"'");
	}
}
/***
 * 操作cookie
 * @param name
 * @param value
 * @return
 */
function setCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 10; //此 cookie 将被保存 10 天
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)//取cookies函数        
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return "";

}
function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
/***
 * 用户登出
 * @return
 */
function userLogOut(){
	top.location.href="/userlogin.html?pram=2";
}

//根据代码集ID，代码值获取展示的代码名称
function getTextByCodeId(data, codeItemId) {
	if (data != null)
		for ( var i = 0; i < data.length; i++) {
			var tmp = data[i];
			if (tmp.id == "") {
				continue;
			} else if (tmp.id == codeItemId) {
				return tmp.text;
			}
		}
	return "";
};
/***
 * 获取地址栏的参数列表
 * @param name
 * @return
 */
//function GetQueryString(name) {
//	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//	var r = window.location.search.substr(1).match(reg);
//	
//	if (r != null){
//		var ret=decodeURI(r[2]);
//		if(ret.indexOf("%")>=0) ret=decodeURI(unescape(r[2]));
//		return ret;
////		return decodeURI(r[2]);
////		if(browser.versions.webKit)	return decodeURI(r[2]);
////		else return decodeURI(unescape(r[2]));
//	}
//	return null;
//}
function GetQueryString(name,noLD) {
	if(noLD){
		var reg = new RegExp("(^|&)" + name.toLowerCase() + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).toLowerCase().match(reg);
	}else{
		var reg = new RegExp("(^|&)" + name+ "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
	}
	
	
	if (r != null){
		var ret=decodeURI(r[2]);
		if(ret.indexOf("%")>=0) ret=decodeURI(unescape(r[2]));
		return ret;
//		return decodeURI(r[2]);
//		if(browser.versions.webKit)	return decodeURI(r[2]);
//		else return decodeURI(unescape(r[2]));
	}
	return null;
}
/**
 * 将对象转换为url字符参数
 */
String.prototype.replaceAll = function(s1,s2){ 
	return this.replace(new RegExp(s1,"gm"),s2); 
}
function SetUrlParam(object) {
	var urlParam = "";
	if(object) {
		// 遍历属性值
		for(var p in object) {
			// 不传递方法参数
			if(typeof(object[p]) == "function"||typeof(object[p]) == "object") continue;
			// 不传递空值参数
			if(object[p] == null || object[p] == "") continue;
			urlParam += p + "=" + object[p] + "&";
		}
	}
	// 去掉末位的&
	urlParam = urlParam.substring(0, urlParam.length - 1);
	return urlParam;
};

/**
 * 将Url转换为json参数
 */
function GetUrlParam() {
	var jsonData= {};
	var reg = new RegExp("(^|&)" + name+ "=([^&]*)(&|$)");
	var r = window.location.search.substr(1);
	var data=r.split("&");
		for(var p in data) {
			// 不传递方法参数
			if(typeof(data[p]) == "function") continue;
			// 不传递空值参数
			if(data[p] == null || data[p] == "") continue;
			var string=data[p].split("=");
			var ret=decodeURI(string[1]);
			if(ret.indexOf("%")>=0) ret=decodeURI(unescape(string[1]));
			jsonData[string[0]]=ret;
		}
	return jsonData;
};
/***
 * 获取全局参数
 */
function getTopData(type){
	var ret=null;
		ret=eval("top."+type);
	if(ret==null)	{
		ret= GetQueryString(type);
		ret= JSON.parse(ret);
	}
	return ret;
}

/***
 * 验证页面的权限
 * @return
 */
function validationPage(resList,res){
	var validation=false;
	for(i in resList){
		if(resList[i].resName==res){
			validation =true;
			break;
		}
	}
//	if(!validation)
		//跳转到首页
}
//数组去除空元素
function replaceEmptyItem(arr){
    for(var i=0,len=arr.length;i<len;i++){
        if(!arr[i]|| arr[i]==''){
            arr.splice(i,1);
            len--;
             
        }
    }
}

function showLoading() {
	var $loadingToast = $('#loadingToast');
	if($loadingToast.length==0){
		var $loadingToast=$('			    <div id="loadingToast" class="weui_loading_toast" style="display:none;">'+
			        '<div class="weui_mask_transparent"></div>'+
			        '<div class="weui_toast">'+
			         '   <div class="weui_loading">'+
			          '      <div class="weui_loading_leaf weui_loading_leaf_0"></div>'+
			           '     <div class="weui_loading_leaf weui_loading_leaf_1"></div>'+
			            '    <div class="weui_loading_leaf weui_loading_leaf_2"></div>'+
			             '   <div class="weui_loading_leaf weui_loading_leaf_3"></div>'+
			              '  <div class="weui_loading_leaf weui_loading_leaf_4"></div>'+
			               ' <div class="weui_loading_leaf weui_loading_leaf_5"></div>'+
			                '<div class="weui_loading_leaf weui_loading_leaf_6"></div>'+
			                '<div class="weui_loading_leaf weui_loading_leaf_7"></div>'+
			                '<div class="weui_loading_leaf weui_loading_leaf_8"></div>'+
			                '<div class="weui_loading_leaf weui_loading_leaf_9"></div>'+
			                '<div class="weui_loading_leaf weui_loading_leaf_10"></div>'+
			                '<div class="weui_loading_leaf weui_loading_leaf_11"></div>'+
			            '</div>'+
			            '<p class="weui_toast_content">数据加载中</p>'+
			        '</div>'+
			    '</div>	');
		$("#container").append($loadingToast);
	}
    if ($loadingToast.css('display') != 'none') {
        return;
    }
    $loadingToast.show();
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
DateObjectFormat = function (object) { //author: meizz 
    var o = {
        "M": (object.month + 1)>9?(object.month + 1):("0"+(object.month + 1)), //月份 
        "d": object.date>9? object.date:("0"+ object.date), //日 
        "h":  object.hours>9? object.hours:("0"+ object.hours), //小时 
        "m":  object.minutes>9? object.minutes:("0"+ object.minutes), //分 
        "s": object.seconds>9? object.seconds:("0"+ object.seconds), //秒 
    };
    if(object.year>100) object.year='20'+(object.year-100);
    if(o.M)
  return object.year+"-"+o.M+"-"+o.d+" "+o.h+":"+o.m+":"+o.s;
}
/*
 * 判断数组是否存在某个值
 */
isHave=function(array,key,value){
	for(i in array){
		if(array[i][key]==value) return true;
	}
	return false;
}
 

/***
 * 复制到剪切板
 */
function jsCopy(id){ 
//    var e=document.getElementById(id);//对象是contents 
//    window.clipboardData.setData("Text", e.innerHTML);
//    e.select(); //选择对象 
//    document.execCommand("Copy"); //执行浏览器复制命令
	var text = document.getElementById(id);
    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("Copy"); //执行浏览器复制命令
        selection.empty();
        /*if(selection.setBaseAndExtent){
            selection.setBaseAndExtent(text, 0, text, 1);
        }*/
    } else {
//        alert("none");
    }
} 
/***
 * 保存图片
 */
function jsSave(imgURL){ 
	var iframe =$('<iframe height="0" width="0" src="'+imgURL+'" name="saveImage" id="saveImage"></iframe> '); 
	$("body").append(iframe);
	saveImage.document.execCommand('saveAs');
}
/**
 * 得到发送信息到现在的时间差
 * @param dateTime  类型："2016-12-21 10:07:47"
 * @returns  类型：1月4日 17:08
 */
function shortTime(dateTime){
	var now = new Date();
	var nowyear = now.getFullYear(),
		nowmonth = now.getMonth() + 1,
		nowday = now.getDate();
	if(!dateTime){
		return (now.getHours()>9?now.getHours():("0"+now.getHours()))+":"+(now.getMinutes()>9?now.getMinutes():("0"+now.getMinutes()));
	}
	var date_year = dateTime.substr(0,4);
	var date_month = parseInt(dateTime.substr(5,2));
	var date_day = parseInt(dateTime.substr(8,2));
	var date_time = dateTime.substr(11,5);
	
		if(date_year == nowyear && date_month == nowmonth){
			if(nowday == date_day){
				return date_time;
			}else if(nowday - date_day == 1)
				return "昨天&nbsp;" + date_time;
			else if(nowday - date_day == 2)
				return "前天&nbsp;" + date_time;
			else
				return (date_month>9?date_month:("0"+date_month)) + "月" +  (date_day>9?date_day:("0"+date_day))  + "日&nbsp;" + date_time;
		}else if(date_year == nowyear && date_month != nowmonth)
			return  (date_month>9?date_month:("0"+date_month))  + "月" +  (date_day>9?date_day:("0"+date_day)) + "日&nbsp;" + date_time;
		else
			return date_year + "年" +  (date_month>9?date_month:("0"+date_month))  + "月" +  (date_day>9?date_day:("0"+date_day)) + "日&nbsp;" + date_time;
}
/**
 * 得到发送信息到现在的时间差
 * @param dateTimeStamp  类型："2016-12-21 10:07:47"
 * @returns  几分钟前，几天前
 */
function getDateDiff(dateTimeStamp) {
	var minute = 1000 * 60,
	hour = minute * 60,
	day = hour * 24,
	halfamonth = day * 15,
	month = day * 30,
	year = month * 12;
    var now = new Date().getTime();
    var sendDate = new Date(dateTimeStamp).getTime();
    var diffValue = now - sendDate;
    if (diffValue < 0) {
    }
    var yearC = diffValue / year,
    	monthC = diffValue / month,
    	weekC = diffValue / (7 * day),
    	dayC = diffValue / day,
    	hourC = diffValue / hour,
    	minC = diffValue / minute;
    if (yearC >= 1) {
        result = parseInt(yearC) + "年前";
    } else if (monthC >= 1) {
        result = parseInt(monthC) + "个月前";
    } else if (weekC >= 1) {
        result = parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = parseInt(hourC) + "个小时前";
    } else if (minC >= 1) {
        result = parseInt(minC) + "分钟前";
    } else
        result = "刚刚";
    return result;
}

function getWayType(type,card){
	switch(type){
	case "7305":
		return "银联在线[****"+card.substring(card.length-4)+"]";
	case "7307":
		return "微信支付[公众号]";
	case "7308":
		return "微信支付[安卓APP]";
	case "7309":
		return "微信支付[PC扫码]";
	case "7310":
		return "微信支付[苹果APP]";
	case "7321":
		return "支付宝";
	}
}

function getDefaultImageByCertNo(certNo){
	var sex= getSexByCertNo(certNo);
	var birthYear=certNo.substring(6,10);
	var date=new Date();
	var year=date.getFullYear();
	var age=year-birthYear;
	if(age<20) age=10;
	else if(age<40) age=20;
	else if(age<55) age=40;
	else  age=60;
	var sexy=(sex=="0201"?"man":"woman");
	var icon=sexy+age;
	var src='/dssweb/res/images/personIcon/'+icon+'.png';
	return src;
}
function getDefaultImageByAgeSex(age,sex){
	if(age==null||age=="")
		age="1";
	age=age.replace("岁","");
	if(age.indexOf("月")>=0)
		age="1";
	if(age.indexOf("周")>=0)
		age="1";
	if(age.indexOf("天")>=0)
		age="1";
	if(age.indexOf("时")>=0)
		age="1";
	if(age.indexOf("分")>=0)
		age="1";
	if(age<20) age=10;
	else if(age<40) age=20;
	else if(age<55) age=40;
	else  age=60;
	var sexy=(sex=="男"?"man":"woman");
	var icon=sexy+age;
	var src='/dssweb/resource/images/personIcon/'+icon+'.png';
	return src;
}
function getAgeByCertNo(certNo){
	var birthYear=certNo.substring(6,10);
	var date=new Date();
	var year=date.getFullYear();
	var age=year-birthYear;
	return age;
}
function getSexByCertNo(certNo){
	//12 12 12 1990 0101 123 1
	var valid=certNo.substring(14,17);
	if(valid%2 ==0)
		return "0202";
	else
		return "0201";
}