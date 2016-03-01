;;

mainApp.factory('pdfService', function($q){
	return {
		pager : function(){ return new Pager($q, rootPath + '/broker/pdf/page'); }
	};
});

mainApp.factory('accountService', function($q){
	return {
		modeler : function(){ return new Modeler($q, rootPath + '/broker/account/get'); },
		pager : function(){ return new Pager($q, rootPath + '/broker/account/page'); },
		totaler : function(){return new Remoter($q, rootPath + '/broker/account/total');},
		order : function(){return new Remoter($q, rootPath + '/broker/account/order');},
		tradePager : function(){ return new Pager($q, rootPath + '/broker/account/trade/page');},
		tradeTotaler : function(){ return new Remoter($q, rootPath + '/broker/account/trade/total');},
		notdepositPager : function(){ return new Pager($q, rootPath + '/broker/account/notdeposit/page');}
	};
});

mainApp.factory('userService', function($q){
	return {
		pager : function(){ return new Pager($q, rootPath + '/broker/user/page'); }
	};
});

mainApp.factory('balanceService', function($q){
	return {
		pager : function(){ return new Pager($q, rootPath + '/broker/balance/page'); },
		totaler : function(){ return new Remoter($q, rootPath + '/broker/balance/total');}
	};
});

mainApp.factory('tradeService', function($q){
	return {
		pager : function(success, fail){ return new Pager($q, rootPath + '/broker/trade/page', success, fail); }
	};
});

mainApp.factory('tradeDetailService', function($q){
	return {
		pager : function(){ return new Pager($q, rootPath + '/broker/tradeDetail/page'); },
		totaler : function(){ return new Remoter($q, rootPath + '/broker/tradeDetail/total');}
	};
});

mainApp.factory('orderService', function($q){
	return {
		pager : function(){ return new Pager($q, rootPath + '/broker/order/page'); }
	};
});

mainApp.factory('assetsService', function($q){
	return {
		pager : function(){ return new Pager($q, rootPath + '/broker/assets/page'); }
	};
});

mainApp.factory('performanceService', function($q){
	return {
		modeler : function(){ return new Modeler($q, rootPath + '/broker/performance/get'); },
		pager : function(){ return new Pager($q, rootPath + '/broker/performance/page'); }
	};
});

mainApp.factory('passwordService', function($q){
	return {
		changer: function(){return new Remoter($q, rootPath + '/broker/password/change');}
	};
});

mainApp.factory('noticeService', function($q){
	return {
		modeler : function(){ return new Modeler($q, rootPath + '/broker/notice/get'); },
		pager : function(){ return new Pager($q, rootPath + '/broker/notice/page'); }
	};
});

mainApp.factory('marginService', function($q){
	return {
		pager : function(){ return new Pager($q, rootPath + '/broker/margin/page'); }
	};
});

mainApp.factory('onlineService', function($q){
	return {
		pager : function(){ return new Pager($q, rootPath + '/broker/online/page'); }
	};
});
