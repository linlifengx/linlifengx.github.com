
function MainMenu(menus){
	this.menus = menus;
	this.activeMenu = null;
	var _this = this;
	ROOT_SCOPE.$on('set_main_menu_active', function(event, menu){
		_this.activeMenu = menu;
	});
}

MainMenu.prototype.clickMenu = function(menu){
	if(!menu.tmpl){
		return;
	}
	this.activeMenu = menu;
	ROOT_SCOPE.$broadcast('main_menu_click', menu);
}

mainApp.directive('mainMenu', function(){
	return {
		restrict: 'AE',
		scope: {
			self: '=ref'
		},
		replace: true,
		template:'<ul class="menu">\
					<li ng-repeat="menu in self.menus track by $index">\
						<div ng-class="{active:menu===self.activeMenu}" ng-click="self.clickMenu(menu)">{{menu.title}}</div>\
						<ul class="menu" ng-if="menu.nodes">\
							<li ng-repeat="subMenu in menu.nodes track by $index">\
								<div ng-class="{active:subMenu===self.activeMenu}" ng-click="self.clickMenu(subMenu)">{{subMenu.title}}</div>\
							</li>\
						</ul>\
					</li>\
				</ul>'
	};
});