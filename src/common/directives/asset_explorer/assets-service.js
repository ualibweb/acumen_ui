angular.module('service.assets', [])

    .run(['$http', 'DSCacheFactory', function($http, DSCacheFactory){
        DSCacheFactory('assets', {
            maxAge: 900000, // Items added to this cache expire after 15 minutes.
            cacheFlushInterval: 6000000, // This cache will clear itself every hour.
            deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
        });

        $http.defaults.cache = DSCacheFactory.get('assets');
    }])

    .factory('assets', ['Restangular', '$cache', function(Restangular, $cache){
        var clearCache = function(repoID){
            if ($cache.info(repoID)) $cache.remove(repoID);
        }

        return {
            list: function(repoID, page, limit){
                return Restangular.one('items', repoID).one('page', page).one('limit', limit).getList();
            },
            details: function(repoID){
                return Restangular.one('items', repoID).all('details').getList();
            },
            tags: function(repoID){
                return Restangular.one('items', repoID).all('tags').getList();
            },
            addTags: function(repoID, tags){
                clearCache(repoID);
                return Restangular.one('tags', repoID).all('tags').post(tags);

            },
            transcripts: function(repoID){
                return Restangular.one('items', repoID).all('transcripts').getList();
            },
            addTranscript: function(repoID, transcript){
                clearCache(repoID);
                return Restangular.one('transcripts', repoID).all('transcript').post(transcript);
            }
        }
    }]);