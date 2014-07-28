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

    .service('acumen', [function(){
        var self = this;
        var _labels = ['collections', 'items', {'audio': 'tracks', 'video': 'clips', 'defaultLabel': 'pages'}];

        this.level;
        this.levels = {};

        this.getLevel = function(repoID, assetType){
            assetType = angular.isDefined(assetType) ? assetType : false;
            var label;
            var level = repoID.match(/_/g) || [];
            level = level.length;

            if (self.levels.keys().length > 0){
                for (var i = 0; i < level; i++){
                    if (angular.isDefined(self.levels[i]) && repoID.indexOf(self.levels[i].repoID) < 0){
                        self.levels = {};
                        break;
                    }
                }
            }

            label = level < 2 ? _labels[3][assetType] : _labels[level];
            angular.extend(self.levels, {level: {repoID: repoID, label: label}});
        };
    }])