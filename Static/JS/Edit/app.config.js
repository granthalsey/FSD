(function () {
    'use strict';

    angular.module('edit')
        .config(config);


    function config($stateProvider, $urlRouterProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        // $urlRouterProvider.otherwise("/home");
        var states = [];
        states.push({
            name: 'home',
            url: '/home',
            controller: 'home',
            controllerAs: "homeVM",
            templateUrl: '/templates/edit/home.html'
        });


        //  $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/home");

        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    }
})();