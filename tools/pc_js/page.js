!function() {//分页及分页缓存、分页刷新问题
	'use strict'

	app.factory('pageService', ['$timeout', '$location', '$window', function($timeout, $location, $window) {
			var session = $window.sessionStorage.getItem('PageCache');
			var cache = {};
			if(session != "{}" && session !== 'null') {
				add(cache, JSON.parse(session));
			}
			return {
				init: init,
				saveInfo: saveInfo,
				backToOne: backToOne,
				getCache: cache
			}

			//带有分页的界面置顶调用
			function init(key, scope, callback,size) {
				if(cache[$location.url()+key]) {
					scope.page = cache[$location.url()+key].page;
				}
				cache[$location.url()+key] = scope;
				scope.page = {
					numPage: scope.page ? (scope.page.numPage ? scope.page.numPage : 1) : 1,
					total: scope.page ? (scope.page.total ? scope.page.total : 1) : 1,
					itemsPerPage: size ? size : 10,
					maxSize: 8,
					current: scope.page ? (scope.page.current ? scope.page.current : 1) : 1,
					timeout: undefined
				}

				scope.$watch('page.current', function(page) {
					if(scope.page.timeout) {
						$timeout.cancel(scope.page.timeout);
						scope.page.timeout = undefined;
					}
					scope.page.timeout = $timeout(function() {
						if(page > scope.page.numPage) {
							page = scope.page.current = scope.page.numPage;
							return false;
						} else if(page < 1) {
							page = scope.page.current = 1;
							return false;
						}
						//TODO
						callback(page,scope.page.itemsPerPage);
					}, 500);
				});
			}

			function add(cache, session) {
				angular.forEach(session, function(v, k) {
					cache[k] = v;
				});
			}
			
			//分页数据返回时调用，用以告知总页数与总条数
			function saveInfo(scope, numPage, total) {
				scope.page.numPage = numPage;
				scope.page.total = total;
			}

			//回到首页
			function backToOne(scope,callback) {
				if(scope.page.current == 1){
					callback();
				}else{
                	scope.page.current = 1;
				}
            }
		}])
		.run(['$window', 'pageService', function($window, pageService) {
			$window.whenRefresh = function() {
				var session = pageService.getCache;
				var newSession = {};
				angular.forEach(session, function(v, k) {
					v = { page: v.page };
					newSession[k] = v;
				});
				$window.sessionStorage.setItem('PageCache', JSON.stringify(newSession));
			}
		}])
		.directive('paginationLh', [function() {
			return {
				restrict: 'EA',
				replace: 'true',
				template: '<div class="pagination-hl pull-right"><pagination boundary-links="true" items-per-page="page.itemsPerPage" total-items="page.total" ng-model="page.current" max-size="page.maxSize" num-pages="page.numPage" rotate="false"  class="pagination-sm pull-right" previous-text="上一页" next-text="下一页" first-text="首页" last-text="尾页" style="margin: 10px 20px !important;"><\/pagination>' +
					'<span style="line-height: 52px;height:52px;" class="pull-right"><input style="width: 38px;height: 27px;text-align: center;border: 1px solid #dee5e7;border-radius: 2px;vertical-align: middle;margin-right:5px;position: relative;top: -2px;" ng-model="page.current"/>/{{page.numPage}} 页&nbsp;&nbsp;&nbsp;&nbsp;共 {{page.total}} 条</span></div>',
				scope: {
					page: '='
				}
			}
		}])
}()