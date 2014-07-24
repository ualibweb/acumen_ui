angular.module('service.cache', [])

    .config(['DSCacheFactoryProvider', function(DSCacheFactoryProvider){
        DSCacheFactoryProvider.setCacheDefaults({

        })
    }])

    .run(['$http', 'DSCacheFactory', function($http, DSCacheFactory){
        DSCacheFactory('acumen', {
            maxAge: 900000, // Items added to this cache expire after 15 minutes.
            cacheFlushInterval: 6000000, // This cache will clear itself every hour.
            deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
        });

        $http.defaults.cache = DSCacheFactory.get('acumen');
    }])

    .factory('$cache', ['DSCacheFactory', function(DSCacheFactory){
        var cache = DSCacheFactory('acumen');
        return cache;
    }])