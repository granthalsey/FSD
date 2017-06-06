(function () {
    'use strict';

    angular.module("app", [
        "ui.router"
        //Modules

    ]).config(config);


    function config($stateProvider, $urlRouterProvider, $locationProvider) {
        var states = [];
        states.push({
            name: 'home',
            url: '/home',
            controller: 'home',
            controllerAs: "homeVM",
            templateUrl: '/templates/edit/home.html'
        });
        states.push({
            name: 'pages',
            url: '/pages',
            parent: 'home',
            controller: 'pages',
            controllerAs: "pageVM"
        });

        states.forEach(function (state) {
            $stateProvider.state(state);
            console.log(state);
        });
        //  $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/home");
    };

})();