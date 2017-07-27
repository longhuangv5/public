/**
 * Created by Administrator on 2017/3/15 0015.
 */
!function () {
    'use strict'

    app.config(['$ocLazyLoadProvider',function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: [{
                name: 'ui.validate'
            },{
                name:'angularFileUpload'
            }]
        });
    }])
        .run(['$ocLazyLoad','$rootScope',function ($ocLazyLoad,$rootScope) {
            $ocLazyLoad.load(['ui.validate','angularFileUpload']);
        }])
}()