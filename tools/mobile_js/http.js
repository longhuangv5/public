/**
 * Created by longHuang on 2017/1/20.
 */
!function () {
    'use strict'

    app.config(['$httpProvider', function ($httpProvider) {

        // 0618添加，为的是解决$post发送请求到后台，参数传递不过去问题 - start
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function (data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function (obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
        }];
    }]).factory("http", ['$http', 'pop', '$document', '$location', 'urlFileName', 'parkId', function ($http, pop, $document, $location, urlFileName, parkId) {

        return {
            get: get,
            post: post,
            put: put,
            del: del,
            getPath: getPath,
            sendParams: sendParams
        }

        function get(url, params, callback, fail) {
            send('GET', url, params, {}, callback, fail);
        }

        function post(url, params, data, callback, fail) {
            send('POST', url, params, data, callback, fail);

        }

        function put(url, params, data, callback, fail) {
            data._method = 'PUT';
            send('POST', url, params, data, callback, fail);

        }

        function del(url, params, callback, fail) {
            send('DELETE', url, params, {}, callback, fail);
        }

        function send(method, url, params, data, callback, fail) {
            // if (!params.parkId && !data.parkId) params.parkId = parkId ? parkId : 1;
            $http({
                method: method,
                url: getPath() + url,
                params: params,
                data: data
            }).then(function (res) {
                res = res.data;
                if (res.result) {
                    if (callback) callback(res.data);
                } else {
                    if (fail) fail(res);
                    serviceError(res);
                }
            }, function (res) {
                netError(res);
            });
        }

        function getPath() {
            return $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/' + urlFileName;
        }

        function serviceError(res) {
            if(res.goLogin){
                angular.isFunction(parent.goLogin) ? (parent.goLogin(getPath()+'login.jsp')) : (window.location.href = getPath()+'login.jsp');
            }else{
                pop.toast('错误提示', res.execMessage, pop.types.warning);
            }
        }

        function netError(res) {
            pop.toast('错误提示', '错误' + res.status + '!', pop.types.error);
        }

        function sendParams(navId, menuId, menuSubId) {
            var ifr = $document.getElementById('callbackIframe');
            if (ifr) {
                ifr.src = 'http://192.168.1.198:8020/frameback/callback.html?navId=' + navId + '&menuId=' + menuId + '&menuSubId=' + menuSubId;
            } else {
                ifr = $document.createElement('iframe');
                ifr.id = 'callbackIframe';
                ifr.src = 'http://192.168.1.198:8020/frameback/callback.html?navId=' + navId + '&menuId=' + menuId + '&menuSubId=' + menuSubId;
                ifr.style.display = 'none';
            }
            $document.body.appendChild(ifr);
        }
    }]);
}();