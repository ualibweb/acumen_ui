angular.module('directive.assetExplorer', ['service.assets', 'directive.assetList'])

    .controller('AssetExplorerCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
        $rootScope.$on('asset-list-loaded', function(listInfo){
            $scope.listInfo = listInfo;
        });
    }])

    .directive('assetExplorer', [function(){
        return {
            restrict: 'AC',
            templateUrl: function(tElement, tAttrs){
                return 'common/asset_explorer/' + (angular.isDefined(tAttrs.template) ? tAttrs.template : 'asset-explorer') + '.tpl.html';
            },
            link: function($scope, elm, attrs){

            }
        }
    }])