/**
 * Created by Administrator on 2017/3/31 0031.
 */
!function () {
    'use strict'

    app.factory('searchData',[function () {
        var dataList = {};
        return {
            setData:setData,
            getData:getData
        }

        function setData(key,value,str,scope,obj) {
            dataList[key] = value;
            var vs = value[str] ? JSON.parse(value[str]) : undefined;
            angular.forEach(vs,function (l,k) {
                scope[obj[k]] = l;
            })
        }

        function getData(key,params) {
            angular.forEach(params,function (v,k,params) {
                if(!v){
                    delete params[k];
                }
            });
            return angular.extend({},dataList[key] ? dataList[key] : {},params) ;
        }
    }])
}()