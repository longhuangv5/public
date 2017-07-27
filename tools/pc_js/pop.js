/**
 * Created by Administrator on 2017/3/15 0015.
 */
!function() {
	'use strict'

	app.factory('pop', ['toaster', '$modal','$timeout', function(toaster, $modal,$timeout) {
		var type = {
			success: 'success',
			info: 'info',
			wait: 'wait',
			warning: 'warning',
			error: 'error'
		}

		var number = 0;
		var messages = ['正在与后台小哥哥积极交流...','拼命搬运数据中...','一大批数据正在赶来...'],idx = 0;

		return {
			toast: toast,
			wait:wait,
			clear:clear,
			dialog: dialog,
			types: type
		}
		
        // function wait() {
			// $('i.fa-save').removeClass('fa-save').addClass('fa-spinner').addClass('rotate-infinite').closest('button').attr('disabled','true');
        // }
        //
        // function clear() {
        //     $('i.fa-spinner').removeClass('rotate-infinite').removeClass('fa-spinner').addClass('fa-save').closest('button').removeAttr('disabled');
        // }

        function clear() {
            $timeout(function () {
				number--;
				if(number === 0){
					idx++;
					toaster.clear();
					$timeout(function () {
						idx--;
					},500);
                }
            },500);
        }

        function wait(text) {
			number++ ;
            if(number === 1)toaster.pop('wait', '',text ? text : messages[idx] ,-1);
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
}()