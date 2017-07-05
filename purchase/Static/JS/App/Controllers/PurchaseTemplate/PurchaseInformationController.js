(function () {
    'use strict';

    angular.module('PurchaseTemplate')
            .controller('PurchaseInformationController', PurchaseInformationController)
            .component('purchaseInformation', {
                templateUrl: '/Static/Templates/PurchaseTemplate/purchaseInformation.aspx' + window.location.search,
                controller: 'PurchaseInformationController',
                controllerAs: 'checkoutCtrl'
            });

    PurchaseInformationController.$inject = [
                                        'UdfRepository',
                                        'UdfService',
                                        'PurchaseItemsService',
                                        'PurchaseItemsRepository',
                                        'EventRepository',
                                        'EventService',
                                        'CaptchaRepository',
                                        'PurchaseCartService',
                                        'CheckoutValidationService',
                                        '$location',
                                        '$stateParams',
                                        'CountriesService',
                                        'blockUI',
                                        '$scope'
    ];

    function PurchaseInformationController(UdfRepository, UdfService, PurchaseItemsService, PurchaseItemsRepository, EventRepository, EventService, CaptchaRepository, PurchaseCartService, CheckoutValidationService, $location, $stateParams, CountriesService, blockUI, $scope) {
        var vm = this;
        $stateParams.id = parseInt($stateParams.id);
        vm.language = serverSettings.language;
        vm.shippAsBill = true;
        vm.CheckoutValidationService = CheckoutValidationService;
        vm.CaptchaRepository = CaptchaRepository;
        vm.EventService = EventService;
        vm.shippAsBill = true;
        vm.submitted = false;
        vm.shipping = {};
        vm.billing = {};
        vm.creditCard = {};
        vm.changeData = changeData;
        vm.shipping.country = "US";
        vm.billing.country = "US";
        vm.billing.addressType = "1";
        vm.shipping.addressType = "1";
        changeData(vm.shippAsBill);
        vm.countries = CountriesService;
        vm.getKey = getKey;
        vm.submit = submit;
        vm.event = EventRepository;
        vm.titles = EventService.getTitleIds();
        vm.shipping.title = vm.titles[0].TitleID.toString();
        vm.billing.title = vm.titles[0].TitleID.toString();
        vm.organizationName = EventService.getOrganizationName();
        vm.activateName = activateName;
        vm.datePicker = {
            opened: false
        };
        vm.format = "MM/yyyy";
        vm.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        vm.altInputFormats = ['M!/d!/yyyy'];
        vm.validate = validate;
        activateName();
        getKey();
        function activateName() {
            var emailStr = document.getElementById("emailPermission").innerHTML;
            var emailRes = emailStr.replace("%OrganizationName%", vm.organizationName);
            document.getElementById("emailPermission").innerHTML = emailRes;

            var mailStr = document.getElementById("mailPermission").innerHTML;
            var mailRes = mailStr.replace("%OrganizationName%", vm.organizationName);
            document.getElementById("mailPermission").innerHTML = mailRes;
        };
        function validate() {
            angular.forEach($scope.checkoutForm.$error.required, function (field) {
                field.$setDirty();
            });
        }
        function changeData() {
            if (vm.shippAsBill === true) {
                vm.billing = vm.shipping;
            } else if (vm.shippAsBill !== true) {
                vm.billing = {
                    addressType: "1",
                    country: "US",
                    title: vm.titles[0].TitleID.toString()
                };
            }
        }
        
        function getKey() {
            CaptchaRepository.getCaptchaSettings(serverSettings.webGetServiceUrl).then(success).catch(error);
            function success(data) {
                vm.captchaKey = data.siteKey
                vm.captchaStoken = data.stoken;
            }
            function error(error) {
                console.log(error);
            }
        }
        function submit() {

        }
              
    }
})();
