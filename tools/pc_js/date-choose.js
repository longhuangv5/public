/**
 * Created by Administrator on 2017/4/1 0001.
 */
!function () {
    'use strict'

    app.directive('dateChoose', ['$filter',function ($filter) {
        return {
            restrict: 'AE',
            template: '<div class="input-group date-choose">'
            + '<input class="form-control" type="text" ng-readonly="true" datepicker-popup="{{format}}" ng-model="chooseDate" is-open="opened" min-date="minDate" max-date="maxDate" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="required" close-text="关闭"/>'
            + '<div class="input-group-btn">'
            + '<button class="btn btn-default" ng-disabled="dateDisabled" ng-click="open($event)"><span class="glyphicon glyphicon-calendar"></span></button>'
            + '</div>'
            + '</div>',
            scope: {
                chooseDate:'=',
                dateDisabled:'=',
                minDate:'@',
                maxDate:'@'
            },
            controller: ['$scope',function ($scope) {
                $scope.clear = function () {
                    $scope.chooseDate = null;
                };
                // Disable weekend selection
                $scope.disabled = function (date, mode) {
                    return false;
                    // return(mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                };

                $scope.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.opened = !$scope.opened;
                };

                $scope.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1,
                    class: 'datepicker'
                };
            }],
            link:function (scope,element,attr) {
                scope.$watch('chooseDate',function (date) {
                    scope.chooseDate = $filter('date')(date,'yyyy-MM-dd');
                });
                if(attr.required){
                    scope.required = true;
                }
            }
        }
    }])
}()