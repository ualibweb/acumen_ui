angular.module('service.search', [])

    .constant('$categories', {
        'all': {
            'title': 'All', 
            'placeHolder': 'Search all collections in Acumen'
        },
        'audio': {
            'title':'Audio',
            'placeHolder': 'Search for audio recordings',
            'searchParams': {
                'fq': '{!lucene}asset_type:audio'
            }
        },
        'books': {
            'title': 'Books',
            'placeHolder': 'Search for books',
            'searchParams':{
                'fq': '{!lucene}repo_loc:?0002*'
            }
        },
        'findingaids': {
            'title': 'Finding Aids',
            'placeHolder': 'Search finding aids',
            'searchParams':{
                'fq': '{!lucene}repo_loc:?n0003* +type:Archived'
            }
        },
        'images': {
            'title': 'Images',
            'placeHolder': 'Search for images',
            'searchParams':{
                'fq': '{!lucene}repo_loc:(?0001* OR ?0011*) +type:image'
            }
        },
        'manuscripts': {
            'title': 'Manuscript Materials',
            'placeHolder': 'Search manuscripts',
            'searchParams':{
                'fq': '{!lucene}repo_loc:?0003* -type:Archived'
            }
        },
        'maps': {
            'title': 'Maps',
            'placeHolder': 'Search for maps',
            'searchParams':{
                'fq': 'map AND asset_type:image -type:music'
            }
        },
        'research': {
            'title': 'Research',
            'placeHolder': 'Search research and dissertation materials',
            'searchParams':{
                'fq': '{!lucene}repo_loc:?0015*'
            }
        },
        'sheetmusic': {
            'title': 'Sheet Music',
            'placeHolder': 'Search for sheet music',
            'searchParams':{
                'fq': '{!lucene}repo_loc:?0004*'
            }
        },
        'universityarchives': {
            'title': 'University Archives',
            'placeHolder': 'Search archived university materials',
            'searchParams':{
                'fq': '{!lucene}repo_loc:?0006*'
            }
        }
    })

    .factory('$search', ['Restangular', function(Restangular){
        var query = '*:*';
        var params = {};
        return {
            results: function(q, page, limit, params){
                params = angular.isDefined(params) ? params : {};

                var search = Restangular.one('search', query).one('page', params.page).one('limit', params.limit);

                angular.forEach(params, function(val, key){
                    search.one(key, val);
                })

                return search.getList();
            }
        }
    }])