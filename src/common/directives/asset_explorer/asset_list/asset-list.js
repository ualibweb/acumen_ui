angular.module('directive.assetList', [])



    .controller('AssetListCtrl', ['$scope', '$rootScope', 'assets', function($scope, $rootScope, assets){
        $scope.pager = {};

        $scope.list = assets.list().then(function(list){
            var listInfo = {
                first: ((list.metadata.page-1)*list.metadata.limit)+1,
                last: list.metadata.page*list.length
            };
            $scope.pager = {
                show: list.metadata.total > list.metadata.limit,
                total: list.metadata.total,
                perPage: list.metadata.limit,
                current: list.metadata.page,
                max: 16
            };
            $rootScope.emit('asset-list-loaded', listInfo);
            return list;
        });
    }])

    .directive('assetList', ['assets', function(){
        return {
            restrict: 'AC',
            controller: 'AssetListCtr',
            templateUrl: function(tElement, tAttrs){
                return 'asset_list/templates/asset-' + (angular.isDefined(tAttrs.type) ? tAttrs.type : 'list') + '.tpl.html';
            }
        }
    }])

    .directive('assetListItem', ['$filter', function($filter){
        return {
            require: '^assetList',
            restrict: 'AC',
            link: function(scope, elm, attrs, AssetListCtrl){
                scope.selected = AssetListCtrl.selected == scope.asset.repo_loc ? true : false;
                scope.pageNum = (scope.pager.current - 1) * scope.pager.perPage + scope.$index + 1;
                scope.asset.title = angular.isDefined(attrs.truncate) ? $filter('truncate')(scope.asset.title, attrs.truncate) : scope.asset.title;

                scope.select = function(){
                    AssetListCtrl.selected = scope.asset.repo_loc;
                }
            }
        }
    }])