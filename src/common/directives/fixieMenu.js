angular.module('directive.fixieMenu', [])

    .directive('fixieMenu', ['$window', function($window){
        return {
            restrict: 'AC',
            link: function(scope, elm, attrs){
                var fixieClass = angular.isDefined(attrs.fixieMenuClass) ? attrs.fixieMenuClass : 'fixie';
                var offset = angular.isNumber(attrs.fixieMenuOffset) ? attrs.fixieMenuOffset : document.getElementById(attrs.fixieMenuOffset).getBoundingClientRect().top;
                offset -= 20;
                angular.element($window).bind('scroll', fixieScroll);

                function fixieScroll(ev){
                    if (this.pageYOffset > offset) {
                        var width = elm.css('width');
                        elm.addClass(fixieClass);
                        elm.css('width', width);
                    }
                    else {
                        elm.removeClass(fixieClass);
                        elm.css('width', 'auto');
                    }
                    scope.$apply();
                }

                scope.$on('$destroy', function(){
                    angular.element($window).unbind('scroll', fixieScroll);
                });
            }
        }
    }])