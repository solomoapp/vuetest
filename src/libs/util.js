var document = window.document, navigator = window.navigator, location = window.location;
/**
 * 通用工具
 * 
 * @namespace
 */
var util = {};

/**
 * 对象基础处理
 * @namespace
 */
util.object = {

	/**
	 * 合并多个Object对象，参数个数不限，后面的对象将覆盖前面对象中的相同属性，忽略为null或undefined的参数及其后面的参数
	 * 
	 * @return {Object} 合并后的对象
	 */
	combine : function () {
		var objs = Array.prototype.slice.call(arguments, 0);
		var res = {};
		for (var i = 0, obj; obj = objs[i]; i++) {
			for (var k in obj) {
				res[k] = obj[k];
			}
		}
		return res;
	},
	
	/**
	 * 用对象路径取一个JSON对象中的子对象引用
	 * @static
	 * @param {object} obj 源对象
	 * @param {string} path 对象获取路径
	 * @returns {object|string|number|function}

		* @example
		* util.object.route(
				{ "a" : 
					{ "b" :
						{ "c" : "Hello World"
						}
					}
				},
				"a.b.c"
			); //返回值："Hello World"
		*/
	route : function(obj, path){
		obj = obj || {};
		path = String(path);

		var r = /([\d\w_]+)/g, m;
	
		r.lastIndex = 0;

		while ((m = r.exec(path)) !== null) {
			obj = obj[m[0]];
			if (obj === undefined || obj === null) {
				break;
			}
		}

		return obj;
	}
	
};


// --------------------------------------------华丽的分割线---------------------------------------------

/**
 * dom 接口封装
 * 
 * @namespace
 */
util.dom = {
	/**
	 * 获取对象的可视区域宽度
	 *
	 * @param {object} [doc=document] 所需检查的页面document引用
	 * @returns {number}
	 * @example util.dom.getClientWidth(document);
	 */
	getClientWidth : function(doc) {
		var _doc = doc || document;
		return _doc.compatMode == "CSS1Compat" ? _doc.documentElement.clientWidth : _doc.body.clientWidth;
	},
	
		/**
	 * 获取对象的可视区域高度
	 *
	 * @param {object} [doc=document] 所需检查的页面document引用
	 * @returns {number}
	 * @example util.dom.getClientHeight(document);
	 */
	getClientHeight : function(doc) {
		var _doc = doc || document;
		return _doc.compatMode == "CSS1Compat" ? _doc.documentElement.clientHeight : _doc.body.clientHeight;
	},

	/**
	 * 获取对象scrollWidth的值
	 *
	 * @param {object} [doc=document] 所需检查的页面document引用
	 * @returns {number}
	 * @example util.dom.getScrollWidth(document);
	 */
	getScrollWidth : function(doc) {
		var _doc = doc || document;
		return Math.max(_doc.documentElement.scrollWidth, _doc.body.scrollWidth);
	},
	
	/**
	 * 获取对象scrollHeight的值
	 *
	 * @param {object} [doc=document] 所需检查的页面document引用
	 * @returns {number}
	 * @example util.dom.getScrollHeight(document);
	 */
	getScrollHeight : function(doc) {
		var _doc = doc || document;
		return Math.max(_doc.documentElement.scrollHeight, _doc.body.scrollHeight);
	},
	
	/**
	 * 获取对象scrollLeft的值
	 *
	 * @param {object} [doc=document] 所需检查的页面document引用
	 * @returns {number}
	 * @example util.dom.getScrollLeft(document);
	 */
	getScrollLeft : function(doc) {
		var _doc = doc || document;
		return (_doc.defaultView && _doc.defaultView.pageXOffset) || Math.max(_doc.documentElement.scrollLeft, _doc.body.scrollLeft);
	},
	
	/**
	 * 获取对象的scrollTop的值
	 *
	 * @param {object} [doc=document] 所需检查的页面document引用
	 * @returns {number}
	 * @example util.dom.getScrollTop(document);
	 */
	getScrollTop : function(doc) {
		var _doc = doc || document;
		return (_doc.defaultView && _doc.defaultView.pageYOffset) || Math.max(_doc.documentElement.scrollTop, _doc.body.scrollTop);
	}
	
	};

// --------------------------------------------华丽的分割线---------------------------------------------

/**
 * cookie工具
 * 
 * @namespace
 */

util.cookie = {

	/**
	 * 获取指定名称的cookie值
	 *
	 * @param {String} name cookie名称
	 * @return {String} 获取到的cookie值
	 * @example
	 * 		util.cookie.get('value1'); //获取cookie
	 */
	get : function(name) {
		var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"), m = document.cookie.match(r);
		return (!m ? "" : m[1]);
	}
	
};

// --------------------------------------------华丽的分割线---------------------------------------------

/**
 * 统计
 * 
 * @namespace
 */

util.stat = {

	/**
	 * 点击统计
	 * 
	 * @param {String} [tag = cate.art] 统计标识
	 * @param {String} [path = location.pathname] 统计路径
	 */
	click : function (tag, path) {
		if(!tag){
			return;
		}
		if(typeof(__page) == 'string'){
			path = path || __page || window.location.pathname;
		}else{
			path = path || window.location.pathname;
		}
		var arr = ['_trackEvent', path], tagarr = tag.split('.');
		for(var i=0,len=tagarr.length; i<len && i<3; i++){
			tagarr[i] && arr.push(tagarr[i]);
		}
		window._hmt && window._hmt.push(arr);
	},

	/**
	 * 测速统计
	 * 
	 * @param {Array} timeStamps 绝对时间点
	 * @param {String} [path = location.pathname] 统计路径
	 * @value flag1=css加载完成时间
	 *        flag2=css到js加载前时间
	 *        flag3=js加载完成时间
	 *        flag4=js运行完成时间
	 */
	time : function (timeStamps, path) {
		if(typeof(__page) == 'string'){
			path = path || __page || window.location.pathname;
		}else{
			path = path || window.location.pathname;
		}
		timeStamps.push(new Date());
		for(var i=1,len=timeStamps.length; i<len; i++){
			window._hmt && window._hmt.push(['_trackEvent', path, 'speed', 'flag'+i, timeStamps[i]-timeStamps[0]]);
		}
	},

	/**
	 * CGI返回码统计
	 * 
	 * @param {String} path cgi路径
	 * @param {Number} type 成功失败(1=成功,2=失败,3=逻辑失败)
	 * @param {Number} code 状态码
	 * @param {Number} time 延时单位ms
	 */
	code : function (path, type, code, time) {
		if (!path && !type && !code && !time) {
			return;
		}
		window._hmt && window._hmt.push(['_trackEvent', 'api:'+path, type, code, time]);
	}

};

// --------------------------------------------华丽的分割线---------------------------------------------

/**
 * 计算
 * 
 * @namespace
 */

util.acc = {

	/**
	 * 除法函数
	 * 
	 * @param {Number} arg1 被除数
	 * @param {Number} arg2 除数
	 * @return {Number} arg1除以arg2的精确结果
	 */
	div : function (arg1, arg2) {
		if(!arg1 || !arg2){
			return arg1 / arg2;
		}
		var t1 = 0, t2 = 0, r1, r2;
		try{t1 = arg1.toString().split(".")[1].length;}catch(e){}
		try{t2 = arg2.toString().split(".")[1].length;}catch(e){}
		r1 = Number(arg1.toString().replace(".", ""));
		r2 = Number(arg2.toString().replace(".", ""));
		return (r1 / r2) * Math.pow(10, t2 - t1);
	},

	/**
	 * 乘法函数
	 * 
	 * @param {Number} arg1 被乘数
	 * @param {Number} arg2 乘数
	 * @return {Number} arg1乘以arg2的精确结果
	 */
	mul : function (arg1, arg2) {
		if(!arg1 || !arg2){
			return arg1 * arg2;
		}
		var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
		try{m += s1.split(".")[1].length;}catch(e){}
		try{m += s2.split(".")[1].length;}catch(e){}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	},

	/**
	 * 加法函数
	 * 
	 * @param {Number} arg1 被加数
	 * @param {Number} arg2 加数
	 * @return {Number} arg1加上arg2的精确结果
	 */
	add : function (arg1, arg2) {
		if((typeof(arg1)!='number' && typeof(arg1)!='string') || (typeof(arg2)!='number' && typeof(arg2)!='string')){
			return arg1 + arg2;
		}
		var r1, r2, m;
		try{r1 = arg1.toString().split(".")[1].length;}catch(e){r1 = 0;}
		try{r2 = arg2.toString().split(".")[1].length;}catch(e){r2 = 0;}
		m = Math.pow(10, Math.max(r1, r2));
		return (parseInt(util.acc.mul(arg1, m), 10) + parseInt(util.acc.mul(arg2, m), 10)) / m;

	},

	/**
	 * 减法函数
	 * 
	 * @param {Number} arg1 被减数
	 * @param {Number} arg2 减数
	 * @return {Number} arg1减去arg2的精确结果
	 */
	sub : function (arg1, arg2) {
		if(!arg1 || !arg2){
			return arg1 - arg2;
		}
		var r1, r2, m, n;
		try{r1 = arg1.toString().split(".")[1].length;}catch(e){r1 = 0;}
		try{r2 = arg2.toString().split(".")[1].length;}catch(e){r2 = 0;}
		m = Math.pow(10, Math.max(r1, r2));
		n = (r1 >= r2) ? r1 : r2;
		return ((util.acc.mul(arg1, m) - util.acc.mul(arg2, m)) / m).toFixed(n);

	}

};

// --------------------------------------------华丽的分割线---------------------------------------------

/**
 * 获取浏览器缩放比例
 * 
 * @return {Number} 缩放比例
 */
util.detectZoom = function() {
	var ratio = 0,
		screen = window.screen,
		ua = navigator.userAgent.toLowerCase();

	if (window.devicePixelRatio !== undefined) {
		ratio = window.devicePixelRatio;
	}else if (~ua.indexOf('msie')) {
		if (screen.deviceXDPI && screen.logicalXDPI) {
			ratio = screen.deviceXDPI / screen.logicalXDPI;
		}
	}else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
		ratio = window.outerWidth / window.innerWidth;
	}

	if (ratio) {
		ratio = Math.round(ratio * 100);
	}

	return Math.floor(ratio);
};

/**
 * 获取反跨站请求伪造攻击令牌
 * 
 * @return {Number} 反跨站请求伪造攻击令牌
 */
util.getToken = function (name) {
	var str = util.cookie.get(name || 'userCode');
	var hash = 5381;
	for (var i = 0, len = str.length; i < len; ++i) {
		hash += (hash << 5) + str.charCodeAt(i);
	}
	return hash & 0x7fffffff;
};

/**
 * 追加URL参数
 * 
 * @param {String} url 原URL
 * @param {Object} param 追加参数
 * @param {Boolean} [forHash = false] 是否作为hash追加
 * @return {String} 新URL
 */
util.appendUrlParam = function (url, param, forHash) {
	if (!url) {
		return '';
	}
	if (!param) {
		return url;
	}
	var p = [];
	for (var k in param) {
		p.push(encodeURIComponent(k) + '=' + encodeURIComponent(param[k]));
	}
	p = p.join('&');
	var hash = url.split('#');
	url = hash[0].split('?');
	hash = hash[1] ? ('#' + hash[1]) : '';
	param = url[1] ? ('?' + url[1]) : '';
	url = url[0];
	var v = forHash ? hash : param;
	v = v ? v.lastIndexOf('&') == v.length - 1 ? (v + p) : (v + '&' + p) : ('?' + p);
	if (forHash) {
		hash = v;
	} else {
		param = v;
	}
	return url + param + hash;
};

/**
 * 获取url query参数或hash参数
 * 
 * @param {String} name 参数名
 * @return {String} 参数值
 */
util.getUrlParam = function (name) {
	var re = new RegExp('(?:\\?|#|&)' + name + '=([^&#?]*)(?:\\?|$|&|#)', 'i');
	var m = re.exec(window.location.href);
	return m ? m[1] : '';
};

/**
 * 金额千分位
 * 
 * @param {Number|String} num 参数名
 * @return {String} 千分位格式的数字
 */
util.toThousands = function(num){
	if(typeof(num)!='number' && typeof(num)!='string'){
		return num;
	}
	var re = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
	return num.toString().replace(re, "$1,");
};
util.toThousands00 = function(num){
	if(typeof(num)!='number' && typeof(num)!='string'){
		return num;
	}
	var n = parseFloat(num).toFixed(2);
	var re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
	var str = n.replace(re, "$1,");
	return str;
};

/**
 * 获取字串的长度,中文算两个字节
 * 
 * @param {String} str 参数名
 * @return {Number} 字符串长度
 */
util.getStrLength = function(str){
	str = str || '';
	str = str.toString();
	var oLength = str.length;
	var l = 0;
	for(var i = 0; i < oLength; i++){
		if(str.substring(i, i + 1).match(/[\u4e00-\u9fa5]/)){
			l += 2;
		}else{
			l += 1;
		}
	}
	return l;
};

/**
 * 银行卡号格式化
 * 
 * @param {String} num 参数名
 * @return {String} 每隔四位加入一个空格
 */
util.formatCTNum = function(num){
	return num.replace(/[^0-9]/g, '').replace(/(\d{4})(?!$)/g, '$1 ');
};

/**
 *  说明：过滤XSS
 *  @return {String} 生成的内容
 */
util.xss = function (val) {
	if(typeof(val) == 'number'){
		return val;
	}else{
		val = val || '';
		return val.toString().replace(/&(?!w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\n/g, '<br />');
	}
};

/**
 *  说明：时间转换，将秒转换为X天X小时X分X秒
 *  p_nSecondTime：需要转换的以秒为单位的数据
 *  @return {String} 生成的内容
 */
util.convertSecToDay = function (p_nSecondTime) {
	var time = parseInt(p_nSecondTime) + "秒";
	if(parseInt(p_nSecondTime,10)>= 60){
		var second = parseInt(p_nSecondTime,10) % 60;
		var min = parseInt(p_nSecondTime / 60,10);
		time = min + "分" + second + "秒";
		if( min >= 60 ){
			min = parseInt(p_nSecondTime / 60,10) % 60;
			var hour = parseInt( parseInt(p_nSecondTime / 60,10) /60 );
			time = hour + "小时" + min + "分" + second + "秒";
			if( hour >= 24 ){
				hour = parseInt( parseInt(p_nSecondTime / 60,10) /60 ,10) % 24;
				var day = parseInt( parseInt( parseInt(p_nSecondTime / 60,10) /60 ,10) / 24 ,10);
				time = day + "天" + hour + "小时" + min + "分" + second + "秒";
			}
		}
	}
	return time;
};

/**
 * 日期格式化
 * 
 * @param {Number/String} time 时间戳或时间字符串
 * @param {String} fmt 格式模型
 * @param {boolean} forEng 中/英文模式
 * @return {String} 格式化的日期
 */
util.formatDate = function (time, fmt, forEng) {
	if(!time){
		return time;
	}
	/*if(typeof(time) == 'string') {
		time = time.substr(0, 10).replace(/\D/g, '/') + ' ' + (time.substr(11).replace(/\D/g, ':') || '00:00:00');
	}*/
	time = new Date(time);
	/**
	 * @function 取数字子串
	 * @param {Any} s 待取内容，将转换为字符串形式
	 * @param {Number} n 预期数字字符个数
	 * @param {Number} m 用于规范n的最多个数，0不限制
	 * @param {Number} [o=0] &1-是(1)否(0)补0 &2-是(1)否(0)强制截断数字 &4-在数字前(0)或后(1)补足前后导0(如果设置为补0) - 或 - 截断前(0)或后(1)面的数字(如果设置为强制截断) &8-是(1)否(0)删除前后导0
	 */
	var ss = function (s, n, m, o) {
		s = (s + '').split('');
		m && (n = Math.min(n, m));
		o = o || 0;
		var l = s.length;
		if (o & 1) {
			for (var i = l; i < n; i++) {
				(o & 4) ? s.push(0) : s.unshift(0);
			}
		}
		if (n < l && (o & 2)) {
			if (o & 4) {
				s = s.slice(0, n);
			} else {
				s = s.slice(l - n, l);
			}
		}
		s = s.join('');
		(o & 8) && (s = s.replace(/^0*(.+?)0*$/, '$1'));
		return s;
	};
	return fmt.replace(/(y|M|d|h|H|m|s|f|F|t)+/g, function (match) {
		var c = match.charAt(0), l = match.length;
		switch (c) {
			case 'y':
				return ss(time.getFullYear(), l, 4, 2);
			case 'M':
				if (l <= 2) {
					return ss(time.getMonth() + 1, l, 2, 1);
				}
				return (forEng ? (l == 3 ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']) : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'])[time.getMonth()];
			case 'd':
				if (l <= 2) {
					return ss(time.getDate(), l, 2, 1);
				}
				return (forEng ? (l == 3 ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday ', 'Friday', 'Saturday']) : ['周日', '周一', '周二', '周三', '周四', '周五', '周六'])[time.getDay()];
			case 'h':
				return ss((time.getHours() % 12) || 12, l, 2, 1);
			case 'H':
				return ss(time.getHours(), l, 2, 1);
			case 'm':
				return ss(time.getMinutes(), l, 2, 1);
			case 's':
				return ss(time.getSeconds(), l, 2, 1);
			case 'f':
				return ss(time.getMilliseconds(), l, 0, 7);
			case 'F':
				return ss(time.getMilliseconds(), l, 0, 14);
			case 't':
				return ss(time.getHours() >= 12 ? (forEng ? 'PM' : '下午') : (forEng ? 'AM' : '上午'), l, 2, 6);
			default:
				return match;
		}
	});
};

/**
 * 金额格式化
 * 
 * @param {Number/String} Num 金额字符串
 * @return {String} 格式化的金额
 */
util.Arabia2Chinese = function (Num) {
	Num = Num || '0';
	Num = Num.toString();
	if(Number(Num)==0) {
		return "";
	}
	for(var i=Num.length-1; i>=0; i--) {
		Num = Num.replace(",","");
		Num = Num.replace(" ","");
	}
	Num = Num.replace("￥","");
	if(isNaN(Num)) {
		return "请检查小写金额是否正确";
	}
	var part = String(Num).split(".");
	var newchar = "";
	for(i=part[0].length-1; i>=0; i--) {
		if(part[0].length > 10) {
			return "位数过大，无法计算";
		}
		var tmpnewchar = "";
		var perchar = part[0].charAt(i);
		switch(perchar) {
			case "0": tmpnewchar="零" + tmpnewchar ;break;
			case "1": tmpnewchar="壹" + tmpnewchar ;break;
			case "2": tmpnewchar="贰" + tmpnewchar ;break;
			case "3": tmpnewchar="叁" + tmpnewchar ;break;
			case "4": tmpnewchar="肆" + tmpnewchar ;break;
			case "5": tmpnewchar="伍" + tmpnewchar ;break;
			case "6": tmpnewchar="陆" + tmpnewchar ;break;
			case "7": tmpnewchar="柒" + tmpnewchar ;break;
			case "8": tmpnewchar="捌" + tmpnewchar ;break;
			case "9": tmpnewchar="玖" + tmpnewchar ;break;
		}
		switch(part[0].length-i-1) {
			case 0: tmpnewchar = tmpnewchar +"元" ;break;
			case 1: if(perchar!=0)tmpnewchar= tmpnewchar +"拾" ;break;
			case 2: if(perchar!=0)tmpnewchar= tmpnewchar +"佰" ;break;
			case 3: if(perchar!=0)tmpnewchar= tmpnewchar +"仟" ;break;
			case 4: tmpnewchar= tmpnewchar +"万" ;break; 
			case 5: if(perchar!=0)tmpnewchar= tmpnewchar +"拾" ;break;
			case 6: if(perchar!=0)tmpnewchar= tmpnewchar +"佰" ;break;
			case 7: if(perchar!=0)tmpnewchar= tmpnewchar +"仟" ;break;
			case 8: tmpnewchar= tmpnewchar +"亿" ;break;
			case 9: tmpnewchar= tmpnewchar +"拾" ;break;
		}
		newchar = tmpnewchar + newchar;
	} 
	if(Num.indexOf(".")!=-1) {
		if(part[1].length > 2) {
			part[1] = part[1].substr(0,2);
		}
		for(i=0; i<part[1].length; i++) {
			tmpnewchar = "";
			perchar = part[1].charAt(i);
			switch(perchar) {
				case "0": tmpnewchar="零" + tmpnewchar ;break;
				case "1": tmpnewchar="壹" + tmpnewchar ;break;
				case "2": tmpnewchar="贰" + tmpnewchar ;break;
				case "3": tmpnewchar="叁" + tmpnewchar ;break;
				case "4": tmpnewchar="肆" + tmpnewchar ;break;
				case "5": tmpnewchar="伍" + tmpnewchar ;break;
				case "6": tmpnewchar="陆" + tmpnewchar ;break;
				case "7": tmpnewchar="柒" + tmpnewchar ;break;
				case "8": tmpnewchar="捌" + tmpnewchar ;break;
				case "9": tmpnewchar="玖" + tmpnewchar ;break;
			}
			if(i==0)tmpnewchar =tmpnewchar + "角";
			if(i==1)tmpnewchar = tmpnewchar + "分";
			newchar = newchar + tmpnewchar;
		} 
	} 
	while(newchar.search("零零") != -1) 
	newchar = newchar.replace("零零", "零");
	newchar = newchar.replace("零亿", "亿");
	newchar = newchar.replace("亿万", "亿");
	newchar = newchar.replace("零万", "万");
	newchar = newchar.replace("零元", "元");
	newchar = newchar.replace("零角", "");
	newchar = newchar.replace("零分", "");
	if (newchar.charAt(newchar.length-1) == "元" || newchar.charAt(newchar.length-1) == "角") 
	newchar = newchar+"整";
	return newchar;
};

export default util;