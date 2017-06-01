(function () {
    'use strict';

    angular
        .module("Fundraising")
        .factory("AddressRepository", addressRepository);

    addressRepository.$inject = ["$http"];

    function addressRepository($http) {
        return {
            // Calls
            getCountries: getCountries,
            getStates: getStates
        }

        function getCountries() {
            return "";
            //return $http({
            //    method: 'GET',
            //    url: '',
            //}).then(function (response) {
            //    return response.data;
            //}).catch(function (response) {
            //    throw response;
            //});
        }

        function getStates() {
            return "";
            //return $http({
            //    method: 'GET',
            //    url: '',
            //}).then(function (response) {
            //    return response.data;
            //}).catch(function (response) {
            //    throw response;
            //});
        }

    }
})();