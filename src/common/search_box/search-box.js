angular.module('searchBox', [])

    .directive('searchBox', ['$search', function($search){
        return {
            restrict: 'AC',
            templateUrl: 'search_box/search-box.tpl.html',
            controller: function($scope){
                $scope.selected = angular.isDefined($search.current) ? $search.current : $search.categories['all'];

                this.select = function(category){

                }
            }
        }
    }])

    .directive('searchBoxCategory', [function(){
        return {
            require: '^searchBox',
            restrict: 'AC',
            link: function(scope, elm, attrs){

            }
        }
    }])