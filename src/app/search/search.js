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
                resolve: ['$location', '$stateParams', '$search', function($location, $stateParams, $search){
                    var page = angular.isDefined($location.search('page')) ? $location.search('page') : 1;
                    var limit = angular.isDefined($location.search('limit')) ? $location.search('limit') : 20;
                    var params = angular.isDefined($stateParams.category.fq) ? $stateParams.category.fq : {};

                    return $search.results($stateParams.q, page, limit, params);
                }],
                templateUrl: 'search/search.tpl.html',
                controller: ['$scope', '$stateParams', function($scope, $stateParams){

                }]
            })
    }])