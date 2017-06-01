(function () {
    'use strict';

    angular.module('edit')
        .config(config);


    function config($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/home");
    }
})();