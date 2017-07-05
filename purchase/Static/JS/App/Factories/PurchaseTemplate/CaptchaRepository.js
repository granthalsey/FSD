(function () {
    'use strict';

    angular
        .module('PurchaseTemplate')
        .factory('CaptchaRepository', CaptchaRepository);

    CaptchaRepository.$inject = ['$http'];

    function CaptchaRepository($http) {
        var service = {
            getCaptchaSettings: getCaptchaSettings
        };
        return service;

        function getCaptchaSettings(url) {
            return $http({
                method: 'POST',
                url: url+'/recaptchaTokens',
                data: '',
                crossDomain: true,
                params: {
                },
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            })
			.then(success)
			.catch(error);
        }


        function success(response) {
            return JSON.parse(RJSON.transform(response.data.d));
        }

        function error(error) {
            console.log(error);
            return error;
        }

    }
})();
