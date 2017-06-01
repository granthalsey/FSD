(function () {
    'use strict';

    angular.module('public')
        .config(config);


    function config($stateProvider, $urlRouterProvider, $locationProvider) {
        var states = [];

        states.push({
            name: 'hello',
            url: '/home',
            controller: 'home',
            templateUrl: '/templates/public/home.html'
        });


        //  $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/home");

        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    }
})();