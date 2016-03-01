var mainApp = angular.module('main',['ngAnimate']);
var ROOT_SCOPE = null;
mainApp.run(function($rootScope){
	ROOT_SCOPE = $rootScope;
	var menus = [
	    {title: '账户', tmpl: './tmpl/account.html', id: 'account'},
	    {title: '开户状况', tmpl: './tmpl/account.html',  id: 'user'},
	    {title: '在线账户', tmpl: './tmpl/account.html', id: 'online'},
	    {title: '报告', nodes:[
	        {title: '出入金报告', tmpl: './tmpl/account.html', id: 'balance'},
	        {title: '单量报告', tmpl: './tmpl/account.html', id: 'trade'},
	        {title: '已平仓报告', tmpl: './tmpl/account.html', id: 'tradeDetail'},
	        {title: '未平仓报告', tmpl: './tmpl/account.html', id: 'order'},
	        {title: '净值报告', tmpl: './tmpl/account.html', id: 'assets'}
	    ]},
	    {title: '未入金账户', tmpl: './tmpl/account.html', id: 'notdeposit'},
	    {title: '保证金', tmpl: './tmpl/account.html', id:'margin'},
	    {title: '历史结单', tmpl: './tmpl/account.html', id: 'pdf'},
	    {title: '修改密码', tmpl: './tmpl/account.html', id: 'password'},
	    {title: '公告栏', tmpl: './tmpl/account.html', id: 'notice'},
	    {title: '操作指引', tmpl: './tmpl/account.html', id: 'guide'}
	];
	
	$rootScope.mainMenu = new MainMenu(menus);
	$rootScope.pageTab = new PageTab();
	
	$rootScope.mainMenu.clickMenu(menus[0]);
});

