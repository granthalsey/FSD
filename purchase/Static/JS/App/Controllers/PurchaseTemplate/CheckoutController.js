(function () {
    'use strict';

    angular.module('PurchaseTemplate')
        .controller('CheckoutController', CheckoutController)
        .component('checkout', {
            templateUrl: 'Static/Templates/PurchaseTemplate/purchaseInformation.aspx' + window.location.search,
            controller: 'CheckoutController',
            controllerAs: 'checkoutCtrl'
        });

    CheckoutController.$inject = [
                                        'UdfRepository',
                                        'UdfService',
                                        'PurchaseItemsService',
                                        'PurchaseItemsRepository',
                                        'EventRepository',
                                        'PurchaseCartService',
                                        'ProductDetailsValidationService',
                                        '$location',
                                        '$stateParams',
                                        '$scope',
    ];

    function CheckoutController(UdfRepository, UdfService, PurchaseItemsService, PurchaseItemsRepository, EventRepository, PurchaseCartService, ProductDetailsValidationService, $location, $stateParams, $scope) {
        var vm = this;
        vm.surveyQuestions = undefined;
        vm.languageCode = serverSettings.language;
        vm.changeLanguage = changeLanguage;
        if (UdfService.udfs === undefined)
            getUdfs(23961, "en-CA");
        else
            console.log('udfs are defined');

        vm.submitted = false;
        vm.udfInformation = [];
        vm.event = EventRepository;
        vm.datePicker = {
            opened: false
        };
        vm.format = "dd/mm/yyyy";
        vm.dateOptions = {
            formatYear: 'yyyy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        vm.altInputFormats = ['dd/mm/yyyy'];
        vm.validate = validate;
        changeLanguage(vm.languageCode);

        function getUdfs(eventID, languageCode) {
            UdfRepository.getUdfs(eventID, languageCode, serverSettings.webGetServiceUrl).then(success).catch(error);
            function success(data) {
                UdfService.setUdfs(data);

                vm.surveyQuestions = UdfService.setUdfs(data);
                console.log(vm.surveyQuestions);
                $scope.surveyQuestions = vm.surveyQuestions;
            }
            function error(error) {
                console.log(error);
            }
        }

        function submitCheckout(checkoutInfo, e) {
            e.preventDefault();
            console.log('checkoutInfo', checkoutInfo);
            console.log('valid?', $scope.submitCheckout.$valid);
        }

        function validate() {
            angular.forEach($scope.checkoutForm.$error.required, function (field) {
                field.$setDirty();
            });
        }

        function changeLanguage(languageCode) {
            /*if (languageCode == "en-FR")
                service.udfs = service.udfs.french;
            else
                service.udfs = service.udfs.english*/
        }
    }

})();