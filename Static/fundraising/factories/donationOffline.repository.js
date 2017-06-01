(function () {
    'use strict';

    angular
        .module("Fundraising")
        .factory("DonationOfflineRepository", donationOfflineRepository);

    donationOfflineRepository.$inject = ["$http"];

    function donationOfflineRepository($http) {
        return {
            // Calls
            sendDonationOffline: sendDonationOffline
        }

        function sendDonationOffline(data) {
            return "";
            //return $http({
            //    method: 'POST',
            //    url: '',
            //    data: data,
            //}).then(function (response) {
            //    return response.data;
            //}).catch(function (response) {
            //    throw response;
            //});
        }

    }
})();