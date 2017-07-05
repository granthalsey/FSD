(function () {
    'use strict';

    angular
        .module('PurchaseTemplate')
        .factory('EventRepository', EventRepository);

    EventRepository.$inject = ['$http'];

    function EventRepository($http) {
        var service = {
            getEvent: getEvent
        };
        return service;

        function getEvent(eventID, languageCode, url) {
            return $http({
                method: 'POST',
                url: url + '/getEvent',
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
