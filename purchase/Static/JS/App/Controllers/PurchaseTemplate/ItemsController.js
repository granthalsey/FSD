(function () {
    'use strict';

    angular.module('PurchaseTemplate')
        .controller('ItemsController', ItemsController)
        .component('items', {
        	templateUrl: 'Static/Templates/PurchaseTemplate/items.aspx' + window.location.search,
            controller: 'ItemsController',
            controllerAs: 'itemsCtrl'
        });

    ItemsController.$inject = [
                                        'PurchaseItemsService',
                                        'PurchaseItemsRepository',
                                        '$scope',
                                        '$filter',
                                        '$http',
                                        '$window',
                                        '$rootScope',
                                        '$location',
                                        '$stateParams'
    ];

    function ItemsController(PurchaseItemsService, PurchaseItemsRepository, $scope, $filter, $http, $window, $rootScope, $location, $stateParams) {
        var vm = this;
        vm.products = undefined;
        getPurchaseItems(serverSettings.eventId, serverSettings.language);
        PurchaseItemsService.getPurchaseItem($stateParams.id);

        vm.submitted = false;
        vm.language = "en-CA";
        vm.changeLanguage = changeLanguage;
        changeLanguage(vm.language);

        function getPurchaseItems(eventID, languageCode) {
            PurchaseItemsRepository.getPurchaseItems(eventID, languageCode, serverSettings.webGetServiceUrl).then(success).catch(error);
            function success(data) {
                vm.products = PurchaseItemsService.setPurchaseItems(data);
                vm.products.forEach(function (e) {
                    e['imageUrl'] = PurchaseItemsService.getImageWriteUrl(e.elementPropertyID);
                });
                console.log(vm.products);
                $scope.items = vm.products;
            }
            function error(error) {
                console.log(error);
            }
        }

        function changeLanguage(language) {
            // TODO: Fill in the ProductDetailsValidationService functionality for items
            //vm.errors = ProductDetailsValidationService.getErrors(language);
            //vm.labels = ProductDetailsValidationService.getLabels(language);
        }

        function success(data) {
            console.log(data);
        }
    }
})();