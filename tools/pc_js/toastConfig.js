/**
 * Created by Administrator on 2017/3/15 0015.
 */
(function () {
    'use strict'

    app.config(['$ocLazyLoadProvider',function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: [{
                name: 'toaster'
            }]
        });
    }])
        .run(['$ocLazyLoad','$rootScope',function ($ocLazyLoad,$rootScope) {
            $ocLazyLoad.load('toaster');
            var toaster = window.document.createElement('toaster-container');
            toaster.setAttribute('toaster-options',"{'position-class': 'toast-top-right', 'close-button':true}");
            $rootScope.$apply(function(){
                window.document.body.appendChild(toaster);
            });
        }])
})()