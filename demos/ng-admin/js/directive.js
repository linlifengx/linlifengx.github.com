;;
mainApp.directive('myTable', function(){
	return {
		restrict: 'AE',
		scope: {
			titles: '=',
			rows: '=',
			op: '=',
			optext: '@',
			pager: '=',
			dblclick: '='
		},
		template: 
			'<div class="data-table">\
				<div class="titles">\
					<div class="titles-inner">\
						<table>\
							<thead>\
								<tr>\
									<th ng-repeat="title in titles track by $index">\
										<div ng-style="{width:title.widthStr}">\
											<div class="resizer" ng-mousedown="mousedown(title, $event)"></div>\
											<div class="title">{{title.text}}</div>\
										</div>\
									</th>\
									<th ng-if="op">\
										<div ng-style="{width:opTitle.widthStr}">\
											<div class="resizer" ng-mousedown="mousedown(opTitle, $event)"></div>\
											<div class="title">操作</div>\
										</div>\
									</th>\
								</tr>\
							</thead>\
						</table>\
					</div>\
				</div>\
				<div class="datas">\
					<table>\
						<tbody>\
							<tr ng-repeat="data in rows track by $index" ng-class="{select: selectData==data}" ng-click="select(data)" ng-dblclick="dblclick(data)">\
								<td ng-repeat="title in titles"><div ng-style="{width:title.widthStr}">{{data[title.name]}}</div></td>\
								<td ng-if="op"><div ng-style="{width:opTitle.widthStr}"><a href="#" ng-click="op(data)">{{optext}}</a></div></td>\
							</tr>\
						</tbody>\
					</table>\
				</div>\
			</div>',
		controller: function($scope, $element, $document){
			if($scope.op){
				$scope.opTitle = {width: 100, widthStr: '100px'};
			}
			$scope.$watch('titles', function(){
				if($scope.titles){
					$.each($scope.titles, function(i,o){
						o.widthStr = o.width+'px';
					});
				}
			});
			

			$scope.selectData = null;
			$scope.select = function(data){
				$scope.selectData = data;
			};

			var resizeTitle = null;
			var origin_left = 0;
			$scope.mousedown = function(title, $event){
				resizeTitle = title;
				origin_left = $event.pageX;
				$('body').addClass('table-resizing');
				$document.on('mousemove', mousemove);
		        $document.on('mouseup', mouseup);
			};

			function mousemove(e){
				if(resizeTitle){
					var move = e.pageX - origin_left;
					if(move > 0){
						resizeTitle.width += move;
						resizeTitle.widthStr = resizeTitle.width+'px';
					}else{
						if(resizeTitle.width + move < 40){
							move = Math.ceil(40 - resizeTitle.width);
						}
						resizeTitle.width += move;
						resizeTitle.widthStr = resizeTitle.width+'px';
					}
					origin_left = origin_left + move;
					$scope.$apply();
				}
			}

			function mouseup(e){
				resizeTitle = null;
				origin_left = 0;
				$('body').removeClass('table-resizing');
				$document.off('mousemove', mousemove);
		        $document.off('mouseup', mouseup);
			}
			
			setTimeout(function(){
				$element.find('.datas').scroll(function(){
					var scrollLeft = $(this).scrollLeft();
					$element.find('.titles').scrollLeft(scrollLeft);
				});
			});
		}
	};
});

mainApp.directive('paginate', function(){
	return {
		restrict: 'AE',
		scope: {
			pager: '='
		},
		template: 
			'<div class="paginate">\
				<span>共{{pager.total}}条记录, 每页显示{{pager.pageSize}}条记录, 共{{pager.totalPage}}页, 当前第{{pager.pageNo}}页</span>\
				<a ng-click="pager.first()" class="first" ng-class="{disable:pager.isFirst}">&lt;&lt;第一页</a>\
				<a ng-click="pager.prev()" ng-class="{disable:!pager.hasPrev}">&lt;上一页</a>\
				<a>{{pager.pageNo}}</a>\
				<a ng-click="pager.next()" ng-class="{disable:!pager.hasNext}">下一页&gt;</a> \
				<a ng-click="pager.last()" ng-class="{disable:pager.isLast}" class="last">最后一页&gt;&gt;</a>\
				<a ng-click="pager.page()" class="refresh">刷新</a>\
			</div>'
	};
});

