!function ($) {
    'use strict'

    app.directive('fileUpload', ['FileUploader', function (FileUploader) {
        return {
            restrict: 'EA',
            template: '<style>' +
            '.file-upload-lh > .file-choose{' +
            'height: 100px;' +
            'margin: 10px;' +
            'position: relative;' +
            '}' +
            '.file-upload-lh .progress{' +
            'position: absolute;' +
            'left: 0px;' +
            'bottom: 0px;' +
            'height: 3px;' +
            'width: 100%;' +
            '}' +

            '.file-upload-lh .file-delete,.file-upload-lh .img-delete,.file-upload-lh .img-watch{' +
            'cursor: pointer;' +
            'display: none;' +
            'position: absolute;' +
            'width: 100%;' +
            'left: 0px;' +
            '}' +

            '.file-upload-lh .file-delete{' +
            'height: 100%;' +
            'top: 0px;' +
            'background-color: rgba(0,0,0,0.5);' +
            '}' +

            '.file-upload-lh .img-delete{' +
            'height: 50%;' +
            'top: 50%;' +
            'background-color: rgba(0,0,0,0.3);' +
            '}' +

            '.file-upload-lh .img-watch{' +
            'height: 50%;' +
            'top: 0;' +
            'background-color: rgba(0,0,0,0.7);' +
            '}' +

            '.file-upload-lh .file-choose:hover .file-delete,.file-upload-lh .file-choose:hover .img-delete,.file-upload-lh .file-choose:hover .img-watch{' +
            'display: block;' +
            '}' +

            '.file-upload-lh .file-delete:after{' +
            'position: absolute;' +
            'width: 50px;' +
            'height: 50px;' +
            'left: 50%;' +
            'top: 50%;' +
            'margin-top: -25px;' +
            'margin-left: -25px;' +
            'text-align: center;' +
            'line-height: 50px;' +
            'font-size: 30px;' +
            'content: "✘";' +
            'color: red;' +
            '}' +

            '.file-upload-lh .img-delete:after{' +
            'position: absolute;' +
            'width: 50px;' +
            'height: 50px;' +
            'left: 50%;' +
            'top: 50%;' +
            'margin-top: -25px;' +
            'margin-left: -25px;' +
            'text-align: center;' +
            'line-height: 50px;' +
            'font-size: 25px;' +
            'content: "✘";' +
            'color: red;' +
            '}' +

            '.file-upload-lh .img-watch:after{' +
            'position: absolute;' +
            'width: 50px;' +
            'height: 50px;' +
            'left: 50%;' +
            'top: 50%;' +
            'margin-top: -25px;' +
            'margin-left: -25px;' +
            'text-align: center;' +
            'line-height: 50px;' +
            'font-size: 40px;' +
            'content: "☍";' +
            'transform: rotate(45deg);' +
            '-ms-transform:rotate(45deg);' +
            '-moz-transform:rotate(45deg);' +
            '-webkit-transform:rotate(45deg);' +
            '-o-transform:rotate(45deg);' +
            'color: red;' +
            '}' +

            '.file-upload-lh > button{' +
            'margin: 10px;' +
            'height: 100px !important;' +
            'width: 100px !important;' +
            '}' +

            '.opa-show{' +
            'opacity: 0.3;' +
            'transition: opacity 1s; ' +
            '-webkit-transition: opacity 1s;' +
            '}' +

            '.show-all{' +
            'opacity: 1 !important;' +
            '}' +

            '</style>' +
            '<div nv-file-drop="" uploader="uploader" class="file-upload-lh well clear">' +
            '<div ng-repeat="item in init" class="file-choose pull-left">' +
            '<div ng-if="!item.isImg">' +
            '<span style="font-size:24px;line-height:100px;padding:0px 10px;">{{item.name}}</span>' +
            '</div>' +
            '<div ng-if="item.isImg" class="img-menu">' +
            '<img style="height: 100px;" ng-src="{{filePath.download + item.src}}"/>' +
            '</div>' +
            '<div class="img-watch" ng-show="showDelete()" ng-click="watch(filePath.download + item.src);"></div>' +
            '<div class="img-delete" ng-show="showDelete()" ng-click="fileChange(item);"></div>' +
            // '<div class="file-delete" ng-show="showDelete()"></div>' +
            '</div>' +
            '<div ng-click="fileDelete(item);" ng-repeat="item in uploader.queue" class="file-choose pull-left">' +
            '<div class="opa-show" ng-class="{\'show-all\':item.hadSuccess}" ng-thumb="{file:item._file,height:100}" ng-if="uploader.isHTML5">' +
            '<canvas height="100"></canvas>' +
            '</div>' +
            '<div ng-if="!uploader.isHTML5">' +
            '<span style="font-size:24px;line-height:100px;padding:0px 10px;">{{item._file.name}}</span>' +
            '</div>' +
            '<div class="file-delete"></div>' +
            '<div class="progress progress-sm m-b-none m-t-xs">' +
            '<div class="progress-bar bg-info" ng-style="{ \'width\': item.progress + \'%\' }"></div>' +
            '</div>' +
            '</div>' +
            '<button ng-show="showButton()" type="button" class="btn btn-default pull-left" ng-click="choose()">+</button>' +
            '<input type="file" nv-file-select="" uploader="uploader" style="display: none;"/>' +
            '</div>',
            scope: {
                paths: '&',
                single: '@',
                noChange: '=',
                url: '@',
                fileType: '@',
                isCompress: '@',
                init: '=',
                maxSize: '@'
            },
            controller: ['$scope', 'pop', '$element', 'filePath', 'parkId', '$window', function ($scope, pop, $element, filePath, parkId, $window) {
                $scope.filePath = filePath;
                var maxSize = Number($scope.maxSize ? $scope.maxSize : (400 * 1024)),imageP = new RegExp(/^image/);
                var uploader = $scope.uploader = new FileUploader({
                    url: $scope.url + '?parkId=' + parkId + '&fileType=' + ($scope.fileType ? $scope.fileType : 1) + '&isCompress=' + ($scope.isCompress ? $scope.isCompress : 1),
                    autoUpload: true,
                    filters: [{
                        fn: function (item) {
                            if (item.size < maxSize || !imageP.test(item.type)) {
                                return true;
                            } else {
                                pop.toast('提示', '亲，文件过大，不要超过' + (maxSize > 1024 * 1024 ? maxSize / (1024 * 1024) + 'M' : (maxSize > 1024 ? maxSize / 1024 + 'K' : maxSize + 'B'))+'哦！', pop.types.warning);
                                $($element).find('input[type="file"]').val("");
                                return false;
                            }
                        }
                    }]
                });

                uploader.onWhenAddingFileFailed = function (item, filter, options) {
                    console.log('文件添加失败！');
                };

                uploader.onAfterAddingFile = function(fileItem) {
                    pop.wait('文件上传中，请稍候...');
                };

                uploader.onProgressItem = function (fileItem, progress) {
                    console.log(progress);
                };
                uploader.onProgressAll = function (progress) {
                    console.log('进度over！');
                };
                uploader.onSuccessItem = function (fileItem, response, status, headers) {
                    fileItem.hadSuccess = true;
                    pop.clear();
                    fileItem.response = response;
                    console.log(response);
                    change();
                };
                uploader.onErrorItem = function (fileItem, response, status, headers) {
                    pop.toast('提示', fileItem._file.name + '上传失败！', pop.types.warning);
                };

                $scope.$watch('init', function (newInit) {
                    uploader.clearQueue();
                    change();
                });

                $scope.showDelete = function () {
                    return !$scope.noChange;
                }

                $scope.watch = function (url) {
                    $window.open(url);
                }

                $scope.showButton = function () {
                    if ($scope.noChange) {
                        return false;
                    } else if ($scope.single) {
                        if (uploader.queue.length + ($scope.init ? $scope.init.length : 0) > 0) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                    return true;
                }

                $scope.fileDelete = function (item) {
                    item.remove();
                    change();
                }

                $scope.fileChange = function (item) {
                    if (!$scope.noChange) {
                        $scope.init.splice($scope.init.indexOf(item), 1);
                        change();
                    }
                }

                function change() {
                    $($element).find('input[type="file"]').val("");
                    var paths = [];
                    angular.forEach($scope.init, function (i) {
                        paths.push({name: i.name, src: i.src, id: i.id, minSrc: i.src});
                    });
                    angular.forEach(uploader.queue, function (q) {
                        if (q.response) {
                            angular.forEach(q.response.data, function (f) {
                                paths.push({name: f.name, src: f.path, id: f.id, minSrc: f.compressPath});
                            })
                        }
                    })
                    $scope.paths({queue: paths});
                }

            }],
            link: function (scope, element, attr) {
                element.find('button').on('click', function () {
                    $(element).find('input[type="file"]').click();
                });
            }
        }
    }])
}(jQuery)