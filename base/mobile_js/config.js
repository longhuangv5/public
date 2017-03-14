(function(wd) {
	'use strict'
	wd.app =
		angular.module('app')
		.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
			function($controllerProvider, $compileProvider, $filterProvider, $provide) {
				wd.app.controller = $controllerProvider.register;
				wd.app.directive = $compileProvider.directive;
				wd.app.filter = $filterProvider.register;
				wd.app.factory = $provide.factory;
				wd.app.service = $provide.service;
				wd.app.constant = $provide.constant;
				wd.app.value = $provide.value;
			}
		]);
})(window)