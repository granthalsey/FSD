(function () {
    'use strict';

    angular.module("public", [

        //Modules
        'layout',
        "themes",
        'youtubeEmbedUtils'
    ]).config(config);


    function config() {
        log('Welcome to the edit app');
    };
})();