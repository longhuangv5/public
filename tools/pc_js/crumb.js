/**
 * Created by longHuang on 2017/3/22.
 */
!function() {
    'use strict'

    app.directive('crumb', ['historyUtils','helpService', '$location', function(historyUtils,helpService, $location) {
        return {
            restrict: 'EA',
            template:'<div class="padder-md" style="display: inline-block;">'
            +'<ul class="m-b-none" style="padding:0px;">'
            +'<li ng-repeat="t in titles track by $index" style="display: inline-block" ng-click="drump(t.url)" ng-class="{\'text-muted pointer\':$index < titles.length-1}">'
            +'<span ng-show="$index != 0"><b style="padding:0 5px;color:#ccc;">/<\/b>{{t.name}}<\/span>'
            +'<span ng-show="$index == 0"><i class="icon-home m-r-xs"><\/i>{{t.name}}<i ng-if="head && msid" class="icon-question m-l text-muted" style="cursor: pointer" ng-click="help($event)" tooltip-placement="bottom" tooltip="帮助"></i><\/span>'
            +'<\/li>'
            +'<\/ul>'
            +'<\/div>',
            scope: {
                title: '@',
                head:'='
            },
            controller:['$scope',function ($scope) {
                $scope.msid = $location.search().lhmsid;
                $scope.name = $location.search().lhname;
                $scope.help = function (e) {
                    if(!$scope.msid)return false;
                    helpService.open($scope.msid);
                    e.stopPropagation();
                }
            }],
            link: function(scope, element, attr) {
                scope.url = $location.url();

                scope.$watch('title', function(newTitle) {
                    if(!newTitle) {
                        return;
                    }
                    if(scope.head && scope.name)newTitle = scope.name;
                    historyUtils.add({ name: newTitle, url: scope.url, head: attr.head });
                    scope.titles = historyUtils.getAll();
                    //跳转事件
                    scope.drump = function(url) {
                        if(url == scope.url) return;
                        $location.url(url);
                        $location.replace();
                    }
                })
            }
        }
    }]);

    app.factory('historyUtils', [function() {
        var his = [];
        return {
            add: add,
            getAll: getAll
        }

        function add(url) {
            if(url.head) {
                his = [];
                his.push(url);
            } else {
                var i = haveName(his, url);
                i = i == -1 ? have(his, url) : i;
                if(i != -1) {
                    his.splice(i, 1, url);
                    his.splice(i + 1, his.length - (i + 1));
                } else {
                    if(his.length > 7) his.shift();
                    his.push(url);
                }
            }
        };

        function getAll() {
            return his;
        };

        function have(p, c) {
            var flag = -1;
            angular.forEach(p, function(o, i) {
                if(o.url.split('?')[0] == c.url.split('?')[0]) {
                    flag = i;
                    return;
                }
            })
            return flag;
        }

        function haveName(p, c) {
            var flag = -1;
            angular.forEach(p, function(o, i) {
                if(o.name == c.name) {
                    flag = i;
                    return;
                }
            })
            return flag;
        }
    }])
}()