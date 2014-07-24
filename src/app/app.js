angular.module('acumen', [
        'acumen.home',
        'acumen.services',
        'acumen.directives',
        'ui.router',
        'ui.bootstrap',
        'chieffancypants.loadingBar',
        'ngAnimate',
        'restangular',
        'angular-data.DSCacheFactory'
    ])

    .config(['RestangularProvider', function (RestangularProvider){
        RestangularProvider.setBaseUrl(ENV_PATH + 'api');

        RestangularProvider.addResponseInterceptor( function(data, operation, what, url, response, deferred) {
            var extractedData;
            /*console.log({
             'data': data,
             'operation': operation,
             'what': what,
             'url': url,
             'response': response,
             'deferred': deferred
             });*/
            extractedData = data.data;
            if (data.metadata){
                extractedData.metadata = data.metadata;
            }
            if (data.msg){
                extractedData.msg = data.msg;
            }
            return extractedData;
        });
    }])

    .run(['$cache', '$rootScope', function($cache, $rootScope){

    }])