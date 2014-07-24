angular.module('filter.truncate', [])

    .filter('truncate', function () {
        return function (text, length, end) {
            if (angular.isDefined(text)){
                if (isNaN(length))
                    length = 10;

                if (end === undefined)
                    end = "...";

                if (text.length <= length || text.length - end.length <= length) {
                    return text;
                }
                else {
                    return String(text).substring(0, length-end.length) + end;
                }
            }
        };
    });