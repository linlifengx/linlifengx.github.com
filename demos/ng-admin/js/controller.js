mainApp.controller('account', function($scope, $rootScope){
	$scope.titles = [
	    {width: 100, text: '服务商代号', name: 'ibcode'},
 		{width: 100, text: '账户', name: 'login'},
 		{width: 100, text: '姓名', name: 'name'},
 		{width: 100, text: '余额', name: 'balance'},
 		{width: 100, text: '平台', name: 'platformName'}
 	];
 	$scope.list = [
 		{ibcode:'aa11', login: 12311, name: '测试1', balance: 1212.12, platformName: '平台1'},
 		{ibcode:'aa11', login: 12312, name: '测试2', balance: 1212.12, platformName: '平台1'},
 		{ibcode:'aa11', login: 12313, name: '测试4', balance: 1212.12, platformName: '平台2'},
 		{ibcode:'aa11', login: 12314, name: '测试5', balance: 1212.12, platformName: '平台1'},
 		{ibcode:'aa11', login: 12315, name: '测试1', balance: 1212.12, platformName: '平台2'},
 		{ibcode:'aa11', login: 12316, name: '测试1', balance: 1212.12, platformName: '平台3'},
 		{ibcode:'aa11', login: 12317, name: '测试1', balance: 1212.12, platformName: '平台1'},
 		{ibcode:'aa11', login: 12318, name: '测试1', balance: 1212.12, platformName: '平台1'},
 		{ibcode:'aa11', login: 12319, name: '测试1', balance: 1212.12, platformName: '平台1'},
 		{ibcode:'aa11', login: 12321, name: '测试1', balance: 1212.12, platformName: '平台4'},
 		{ibcode:'aa11', login: 12331, name: '测试1', balance: 1212.12, platformName: '平台1'},
 		{ibcode:'aa11', login: 12341, name: '测试1', balance: 1212.12, platformName: '平台1'},
 		{ibcode:'aa11', login: 12351, name: '测试1', balance: 1212.12, platformName: '平台1'},
 		{ibcode:'aa11', login: 12361, name: '测试1', balance: 1212.12, platformName: '平台2'},
 		{ibcode:'aa11', login: 12371, name: '测试1', balance: 1212.12, platformName: '平台2'},
 		{ibcode:'aa11', login: 12381, name: '测试1', balance: 1212.12, platformName: '平台1'},
 		{ibcode:'aa11', login: 12391, name: '测试1', balance: 1212.12, platformName: '平台1'},
 		{ibcode:'aa11', login: 12111, name: '测试1', balance: 1212.12, platformName: '平台1'},
 		{ibcode:'aa11', login: 12211, name: '测试1', balance: 1212.12, platformName: '平台1'}
 	];

 	$scope.total = $scope.list.reduce(function(result, u){return result+u.balance});

 	$scope.$parent.$page.setShouldClose(function(){
 		return confirm('sadfsadfsdf');
 	});
});
