angular.module('acumen.search', [])

    .config(['$stateProvider', '$urlMatcherFactoryProvider', '$categories', function ($stateProvider, $urlMatcherFactoryProvider, $categories) {
        $stateProvider
            .state('search', {
                url: '/search/{category}/{q}',
                params: {
                    category: {
                        type: {
                            encode: function(val){
                                return val;
                            },
                            decode: function(val){
                                return $categories[val];
                            },
                            is: function(arg){
                                return angular.isDefined($categories[arg]);
                            }
                        }
                    },
                    q: {
                        value: '*:*'
                    }
                },
                resolve: {
                    results: ['$location', '$stateParams', '$search', function($location, $stateParams, $search){
                        var page = angular.isDefined($location.search('page')) ? $location.search('page') : 1;
                        var limit = angular.isDefined($location.search('limit')) ? $location.search('limit') : 20;

                        return $search.results($stateParams.q, page, limit, $stateParams.category);
                    }]
                },
                onEnter: ['$cache', 'results', function(){

                }],
                templateUrl: 'search/search.tpl.html',
                controller: ['$scope', '$stateParams', 'results', function($scope, $stateParams, results){
                    $scope.results = results;
                    $scope.search = {
                        page: results.metadata.page,
                        limit: results.metadata.limit,
                        numFound: results.metadata.numFound,
                        queryTime: results.metadata.queryTime
                    };

                    $scope.pageChanged = function(){
                        $location.search('page', $scope.page);
                    };
                }]
            })
    }])