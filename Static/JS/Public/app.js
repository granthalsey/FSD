(function () {
    'use strict';

    angular.module("public", [

        //Modules
        'layout',
        "themes"
    ]).config(config);


    function config() {
        log('Welcome to the edit app');
    };
})();