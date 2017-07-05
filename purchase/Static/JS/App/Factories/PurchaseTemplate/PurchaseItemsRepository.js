(function () {
    'use strict';

    angular
        .module('PurchaseTemplate')
        .factory('PurchaseItemsRepository', PurchaseItemsRepository);

    PurchaseItemsRepository.$inject = ['$http'];

    function PurchaseItemsRepository($http) {
        var service = {
            getPurchaseItems: getPurchaseItems
        };
        return service;

        function getPurchaseItems(eventID, languageCode, url) {
            return $http({
                method: 'POST',
                url: url + '/PurchaseItems',
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
