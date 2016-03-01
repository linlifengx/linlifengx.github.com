
function Page(id, title, tmplUrl, menu){
	this.id = id;
	this.title = title;
	this.tmplUrl = tmplUrl;
	this.menu = menu;
}

Page.prototype.setShouldClose = function(fn){
	this.shouldClose = fn;
}

Page.prototype.shouldClose = function(){
	return true;
}

function PageTab(){
	this.pages = [];
	this.activeIndex = null;
	var _this = this;
	ROOT_SCOPE.$on('main_menu_click', function(event, menu){
		_this.add(menu.id, menu.title, menu.tmpl, menu);
	});
}

PageTab.prototype.getIndex = function(id){
	for(var i=0;i<this.pages.length;i++){
		var p = this.pages[i];
		if(p.id == id){
			return i;
		}
	}
	return -1;
}

PageTab.prototype.add = function(id, title, tmplUrl, menu){
	var index = this.getIndex(id);
	if(index == -1){
		this.pages.push(new Page(id, title, tmplUrl, menu));
		this.active(this.pages.length-1);
		return true;
	}else{
		this.active(index);
		return false;
	}
}

PageTab.prototype.active = function(index){
	this.activeIndex = index;
	if(index > -1){
		ROOT_SCOPE.$broadcast('set_main_menu_active', this.pages[index].menu);
	}else{
		ROOT_SCOPE.$broadcast('set_main_menu_active', null);
	}

}

PageTab.prototype.close = function(index){
	var page = this.pages[index];
	if(page.shouldClose()){
		this.pages.splice(index, 1);
		if(this.activeIndex > index) {
			this.active(this.activeIndex - 1);
		}else if(this.activeIndex == index){
			if(this.pages.length == 0){
				this.active(-1);
			}else if(index < this.pages.length){
				this.active(index);
			}else{
				this.active(index -1);
			}
		}
	}else{
		this.active(index);
	}
}


mainApp.directive('pageTabNav', function(){
	return {
		restrict: 'AE',
		scope: {
			pageTab: '='
		},
		replace: true,
		template:
			'<div class="nav-tabs">\
				<div ng-repeat="page in pageTab.pages track by page.id" class="nav-tab" ng-class="{active:pageTab.activeIndex == $index}" ng-click="pageTab.active($index)">\
					<span class="title">{{page.title}}</span><i class="close" ng-click="pageTab.close($index)"></i>\
				</div>\
			</div>'
	};
});

mainApp.directive('pageTabPanel', function(){
	return {
		restrict: 'AE',
		scope: {
			pageTab: '='
		},
		replace: true,
		template:
			'<div class="tab-panels">\
				<div ng-repeat="$page in pageTab.pages track by $page.id" class="panel" ng-class="{active:pageTab.activeIndex == $index}">\
					<div ng-include="$page.tmplUrl"></div>\
				</div>\
			</div>'
	};
});