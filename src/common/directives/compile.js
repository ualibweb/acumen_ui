angular.module('directive.compile', [])

    .directive('compile', ['$compile', function($compile){
        return {
            restrict: 'AC',
            link: function(scope, elm, attrs){
                scope.$watch(
                    function(scope){
                        return scope.$eval(attrs.compile);
                    },
                    function(val){
                        elm.html(val);
                        $compile(elm.contents())(scope);
                    });
            }
        }
    }])