/**
 * Created by Administrator on 2017/3/15 0015.
 */
!function() {
	'use strict'

	app.factory('pop', ['$rootScope', function($rootScope) {
		var type = {
			success: 'success',
			info: 'info',
			wait: 'wait',
			warning: 'warning',
			error: 'error'
		}

		return {
			toast: toast,
			dialog: dialog,
			types: type
		}

		function toast(title, message, type) {
            $rootScope.$broadcast('alert-alert',{
                content:message,
                type:type
            })
		}

		function dialog(title, message, callback) {
            $rootScope.showConfirm = function() {
               $ionicPopup.confirm({
                    title: title,
                    template: message
                }).then(function(res) {
                    if(res) {
                        callback();
                    }
                });
            };
		}
	}]);
	app.directive('toasterContainer',['$rootScope','$timeout',function ($rootScope,$timeout) {
		return{
            restrict:'EA',
			template:'<div style="position: absolute;left: 0px;top: 0px;height: auto;width: 90%;z-index: 9999;margin:5%;opacity: 0.9;text-align: center">'+
							'<div ng-repeat="item in errors" class="alert animate-repeat fade-in-out" ng-class="{\'success\':\'alert-success\',\'info\':\'alert-info\',\'warning\':\'alert-warning\',\'error\':\'alert-danger\'}[item.type]">{{item.content}}<\/div>'+
						'<\/div>',
			link:function (scope,element,attr) {
                scope.errors = [];

                scope.$on('alert-alert',function (w,data) {
                    scope.errors.push(data)
                    $timeout(function () {
                        scope.errors.shift();
                    },3000)
                })
            }
		}
    }]);
    app.run(['$rootScope',function ($rootScope) {
        var toaster = window.document.createElement('toaster-container');
        $rootScope.$apply(function(){
            window.document.body.appendChild(toaster);
        });
    }])
}()