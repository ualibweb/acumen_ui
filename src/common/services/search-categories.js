angular.module('service.searchCategories', [])

    .factory('searchCategories', [function(){

        return {
            fq: function(cat){
                return categories[cat].fq;
            },
            all: function(){
                return categories;
            }
        };
    }])