(function () {
    'use strict';

    angular.module("app", [
        "ui.router",
        'ngAnimate',
        'layout',
        "themes",
        'hl.sticky',
        'ui.tree',
        'angularUUID2',
        'ui.select',
        'color.picker',
        'camelCaseToHuman'

    //    'youtubeEmbedUtils'
    ]).config(config);


    function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        var states = [];
        //$httpProvider.interceptors.push(function () {
        //    //todo remove this one we have proper versioning/bundling
        //    var __version_number = Math.random();
        //    return {
        //        'request': function (config) {
        //            // !!config.cached represents if the request is resolved using 
        //            //      the angular-templatecache
        //            if (!config.cached) {
        //                config.url += ((config.url.indexOf('?') > -1) ? '&' : '?')
        //                  + config.paramSerializer({ v: __version_number });
        //            } else if (config.url.indexOf('no-cache') > -1) {
        //                // if the cached URL contains 'no-cache' then remove it from the cache
        //                config.cache.remove(config.url);
        //                config.cached = false; // unknown consequences
        //                // Warning: if you remove the value form the cache, and the asset is not
        //                //          accessible at the given URL, you will get a 404 error.
        //            }
        //            return config;
        //        }
        //    }
        //});
        states.push({
            name: 'home',
            url: '/home',
            controller: 'home',
            controllerAs: "homeVM",
            templateUrl: '/templates/edit/home.html'
        });
        states.push({
            name: 'pages',
            url: '/pages/:page',
            //parent: 'home',
            // controller: 'pages',
            views: {
                'main': {
                    templateUrl: '/templates/edit/editPage.html',
                    controller: 'pages',
                    controllerAs: "pageVM"
                },
                'secondaryNavigation': {
                    templateUrl: '/templates/edit/pageSelector.html'

                }
            },
            templateUrl: '/templates/edit/home.html'

        });

        states.forEach(function (state) {
            $stateProvider.state(state);
            console.log(state);
        });
        //  $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/home");
    };
})();