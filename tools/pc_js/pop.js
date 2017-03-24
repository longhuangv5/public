/**
 * Created by Administrator on 2017/3/15 0015.
 */
(function() {
	'use strict'

	app.factory('pop', ['toaster', '$modal', function(toaster, $modal) {
		var types = {
			success: 'success',
			info: 'info',
			wait: 'wait',
			warning: 'warning',
			error: 'error'
		}

		return {
			toast: toast,
			dialog: dialog,
			types: types
		}

		function toast(title, message, type) {
			toaster.pop(type, title, message);
		}

		function dialog(title, message, callback) {
			var site = {
				title: title,
				message: message,
				callback: callback
			}
			$modal.open({
				template: '<div class="modal-header">' +
								'<button type="button" class="close" ng-click="mm.close()"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
								'<h4 class="modal-title">{{mm.site.title}}</h4>' +
							'</div>' +
							'<div class="modal-body">' +
								'<span style="line-height: 30px;vertical-align:top;" ng-bind-html="mm.site.message"></span>' +
							'</div>' +
							'<div class="modal-footer">' +
								'<button type="button" class="btn btn-info" ng-click="mm.ok()">{{mm.site.addInfo ? mm.site.addInfo : "确定"}}</button>' +
								'<button type="button" class="btn btn-default" ng-click="mm.close()">取消</button>' +
							'</div>',
				controller:"popModalCtrl",
				controllerAs:'mm',
				resolve:{
					site:function(){
						return site;
					}
				},
				backdrop:'static',
				size:"xs",
				keyboard:false
			})
		}
	}])
	.controller('popModalCtrl',['site','$modalInstance',function(site,$modalInstance){
		var mm = this;
		mm.site = site;
		
		mm.close = function(){
			$modalInstance.close();
		}
		
		mm.ok = function(){
			$modalInstance.close();
			if(mm.site.callback)mm.site.callback();
		}
	}])
})()