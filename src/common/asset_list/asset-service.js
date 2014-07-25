angular.module('service.assets', [])

    .factory('$assets', ['Restangular', '$cache', function(Restangular, $cache){
        return {
            list: function(repoID, page, limit){
                var list = Restangular.one('items', repoID).one('page', page).one('limit', limit).getList();

            }
        }
    }])