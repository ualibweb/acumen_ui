angular.module('acumen.home', [])

    .config(['$stateProvider', function($stateProvider){
        $stateProvider.state('home', {
            url: '',
            templateUrl: 'home/home.tpl.html'
        })
    }])