angular.module('directive.assetList', [])

    .run(['$http', 'DSCacheFactory', function($http, DSCacheFactory){
        DSCacheFactory('assets', {
            maxAge: 900000, // Items added to this cache expire after 15 minutes.
            cacheFlushInterval: 6000000, // This cache will clear itself every hour.
            deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
        });

        $http.defaults.cache = DSCacheFactory.get('assets');
    }])

    .controller('AssetListCtrl', ['$scope', 'assets', function($scope, assets){
        $scope.list = assets.list();
    }])

    .directive('assetList', ['assets', function(){
        return {
            restrict: 'AC',
            templateUrl: function(tElement, tAttrs){
                return 'asset_list/templates/asset-' + (angular.isDefined(tAttrs.type) ? tAttrs.type : 'asset-list') + '.tpl.html';
            },
            link: function(scope, elm, attrs){
                $scope.pager = attrs.pager;
            }
        }
    }])

    .directive('assetListItem', ['$filter', function($filter){
        return {
            require: '^assetList',
            restrict: 'AC',
            link: function(scope, elm, attrs){
                scope.pageNum = (scope.pager.current - 1) * scope.pager.perPage + scope.$index + 1;
                scope.asset.title = angular.isDefined(attrs.truncate) ? $filter('truncate')(scope.asset.title, attrs.truncate) : scope.asset.title;
            }
        }
    }])