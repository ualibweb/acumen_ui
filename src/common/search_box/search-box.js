angular.module('searchBox', [])

    .directive('searchBox', ['$cache', '$categories', function($cache, $categories){
        return {
            restrict: 'AC',
            templateUrl: 'search_box/search-box.tpl.html',
            controller: function($scope){
                var cat = 'all';
                $scope.categories = $categories;
                $scope.selected = angular.isDefined($cache.info('acumen.search')) ? $cache.get('acumen.search') : $categories[cat];

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