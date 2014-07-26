angular.module('acumen.collection', [])

    .config('$stateProvider', function($stateProvider){
        $stateProvider.state('colleciton', {
            url: '/{repoID:[a-zA-Z][0-9]+[_0-9]*}',
            resolve: {
                metadata: ['$stateParams', '$metadata', function($stateParams, $metadata){
                    return $metadata.get($stateParams.repoID);
                }]
            },
            templateUrl: 'collection/collection.tpl.html',
            controller: ['$scope', '$metadata', function($scope, $metadata){
                $scope.title = $sce.trustAsHtml($metadata.metadata.title);
                $scope.metadata = $metadata[0];
                $scope.file = $metadata.metadata;
                $scope.total = parseInt($metadata.metadata.children.assets) + parseInt($metadata.metadata.children.metadata);
            }]
        })
    })