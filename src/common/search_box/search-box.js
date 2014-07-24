angular.module('searchBox', [])

    .directive('searchBox', ['$search', '$categories', function($search, $categories){
        return {
            restrict: 'AC',
            templateUrl: 'search_box/search-box.tpl.html',
            controller: function($scope){
                var cat = 'all';
                $scope.selected = angular.isDefined($search.category()) ? $search.category() : $categories[cat];

                $scope.search = function(){
                    $state.go('search', {q: $scope.query, category: cat});
                };

                this.select = function(category){
                    cat = category;
                    $scope.selected = $categories[category];
                };
            }
        }
    }])

    .directive('searchBoxCategory', [function(){
        return {
            require: '^searchBox',
            restrict: 'AC',
            link: function(scope, elm, attrs, searchBoxCtrl){
                $scope.select = function($event){
                    searchBoxCtrl.select(scope.key);
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.status.isopen = false;
                }
            }
        }
    }])