!function ($) { //多页多选问题
    'use strict'

    app.directive('pageCheck', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            controller: ['$scope', '$element', function ($scope, $element) {
                var checked = $scope.checkList ? $scope.checkList : [];
                $scope['checkList'] = checked;

                //点击全选时 可选项k:字段v:属性数组
                $scope['changeAll'] = function (list, name, k, v) {
                    if (list.lhchked) {
                        angular.forEach(list, function (l) {
                            l.lhchked = true;
                            (checked.indexOf(l[name]) == -1) && (k ? (v.indexOf(l[k]) != -1) : true) && checked.push(l[name]);
                        });
                    } else {
                        angular.forEach(list, function (l) {
                            l.lhchked = false;
                            checked.splice(checked.indexOf(l[name]), 1);
                        });
                    }
                }

                //点击list中的checkbox时
                $scope['changeItem'] = function (l, list, name) {
                    if (l.lhchked) {
                        checked.push(l[name]);
                    } else {
                        checked.splice(checked.indexOf(l[name]), 1);
                    }
                    if (list.every(function (i) {
                            return i.lhchked
                        })) {
                        list.lhchked = true;
                    } else {
                        list.lhchked = false;
                    }
                }

                //当list数值更新时主controller调用
                $scope['refreshList'] = function (list, name) {
                    angular.forEach(list, function (l) {
                        (checked.indexOf(l[name]) != -1) && (l.lhchked = true);
                    });
                }

                $scope['clearChecked'] = function () {
                    $scope['checkList'] = checked = [];
                }
            }],
            link:function (scope,element) {
                addClick();
                function addClick() {
                    $(element).on('click', function (e) { 
                        if (e.target && e.target.nodeName.toUpperCase() == "I") {
                            $(e.target).closest('tr').find('input[type="checkbox"]').click();
                            return false;
                        } else {
                            $(e.target).closest('tr').find('input[type="checkbox"]').click();
                        }
                    })
                }
            }
        }
    }])
}(jQuery)