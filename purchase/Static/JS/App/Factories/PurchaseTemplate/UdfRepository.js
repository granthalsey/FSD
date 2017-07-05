(function () {
    'use strict';

    angular
        .module('PurchaseTemplate')
        .factory('UdfRepository', UdfRepository);

    UdfRepository.$inject = ['$http'];

    function UdfRepository($http) {
        var service = {
            getUdfs: getUdfs
        };
        return service;

        function getUdfs(eventID, languageCode, url) {
            return $http({
                method: 'POST',
                url: url + '/udfs',
                data: {
                    eventID: eventID,
                    languageCode: languageCode
                },
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
