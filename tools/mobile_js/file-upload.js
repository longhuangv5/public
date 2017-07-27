!function ($) {
    'use strict'

    app.directive('fileUpload', ['FileUploader', function (FileUploader) {
        return {
            restrict: 'EA',
            template: '<style>' +
            '.file-upload-lh > .file-choose{' +
            'height: 80px;' +
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

            '.file-delete{' +
            'cursor: pointer;' +
            'position: absolute;' +
            'width: 30px;' +
            'height: 30px;' +
            'top: -10px;' +
            'right: -10px;' +
            'background-color: black;' +
            'border-radius: 50%;' +
            '}' +

            '.file-choose:hover .file-delete{' +
            'display: block;' +
            '}' +

            '.file-delete:after{' +
            'position: absolute;' +
            'width: 50px;' +
            'height: 50px;' +
            'left: 50%;' +
            'top: 50%;' +
            'margin-top: -25px;' +
            'margin-left: -25px;' +
            'text-align: center;' +
            'line-height: 50px;' +
            'font-size: 20px;' +
            'content: "✘";' +
            'color: red;' +
            '}' +

            '.file-upload-lh > button{' +
            'margin: 10px;' +
            'height: 80px !important;' +
            'width: 80px !important;' +
            '}' +

            '</style>' +
            '<div nv-file-drop="" uploader="uploader" class="file-upload-lh well clear">' +
            '<div ng-repeat="item in init" class="file-choose pull-left">' +
            '<div ng-if="!item.isImg">' +
            '<span style="font-size:24px;line-height:100px;padding:0px 10px;">{{item.name}}</span>' +
            '</div>' +
            '<div ng-if="item.isImg">' +
            '<img style="height: 80px;" ng-src="{{filePath.download + item.src}}"></img>' +
            '</div>' +
            '<div class="file-delete" ng-show="showDelete()" ng-click="fileChange(item);" ></div>' +
            '<div class="progress progress-sm m-b-none m-t-xs">' +
            '<div class="progress-bar bg-info" ng-style="{ \'width\': item.progress + \'%\' }"></div>' +
            '</div>' +
            '</div>' +
            '<div ng-repeat="item in uploader.queue" class="file-choose pull-left">' +
            '<div ng-thumb="{file:item._file,height:80}" ng-if="uploader.isHTML5">' +
            '<canvas height="80"></canvas>' +
            '</div>' +
            '<div ng-if="!uploader.isHTML5">' +
            '<span style="font-size:24px;line-height:80px;padding:0px 10px;word-break: keep-all;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item._file.name}}</span>' +
            '</div>' +
            '<div class="file-delete" ng-click="fileDelete(item);" ></div>' +
            '<div class="progress progress-sm m-b-none m-t-xs">' +
            '<div class="progress-bar bg-info" ng-style="{ \'width\': item.progress + \'%\' }"></div>' +
            '</div>' +
            '</div>' +
            '<button ng-show="showButton()" class="btn btn-default pull-left" ng-click="choose()">+</button>' +
            '<input ng-if="!isFile" accept="image/*" type="file" nv-file-select="" uploader="uploader" style="display: none;"/>' +
            '<input ng-if="isFile" type="file" nv-file-select="" uploader="uploader" style="display: none;"/>' +
            '</div>',
            scope: {
                paths: '&',
                single: '@',
                isFile:'@',
                noChange: '=',
                url: '@',
                fileUrl:'@',
                fileType: '@',
                isCompress: '@',
                init: '='
            },
            controller: ['$scope', 'pop', '$element', 'filePath', 'parkId', function ($scope, pop, $element, filePath, parkId) {
                $scope.filePath = filePath;
                var uploader = $scope.uploader = new FileUploader({
                    url: $scope.isFile ? ($scope.fileUrl + '?parkId=' + parkId):($scope.url + '?parkId=' + parkId + '&fileType=' + ($scope.fileType ? $scope.fileType : 1) + '&isCompress=' + ($scope.isCompress ? $scope.isCompress : 1)),
                    autoUpload: true
                });

                uploader.onWhenAddingFileFailed = function (item, filter, options) {
                    console.log('文件添加失败！');
                };

                uploader.onProgressItem = function (fileItem, progress) {
                    console.log(progress);
                };
                uploader.onProgressAll = function (progress) {
                    console.log('进度over！');
                };
                uploader.onSuccessItem = function (fileItem, response, status, headers) {
                    fileItem.response = response;
                    console.log(response);
                    if(response.result){
                        change();
                    }else{
                        pop.toast('提示', fileItem._file.name + '上传失败！', pop.types.warning);
                        $($element).find('input[type="file"]').val("");
                        fileItem.remove();
                    }
                };
                uploader.onErrorItem = function (fileItem, response, status, headers) {
                    pop.toast('提示', fileItem._file.name + '上传失败！', pop.types.warning);
                };

                $scope.$watch('init', function (newInit) {
                    uploader.clearQueue();
                });

                $scope.showDelete = function () {
                    return !$scope.noChange;
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