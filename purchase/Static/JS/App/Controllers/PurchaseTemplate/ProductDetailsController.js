(function () {
    'use strict';

    angular.module('PurchaseTemplate')
            .controller('ProductDetailsController', ProductDetailsController)
            .component('productDetails', {
                templateUrl: '/Static/Templates/PurchaseTemplate/productDetails.aspx' + window.location.search,
                controller: 'ProductDetailsController',
                controllerAs: 'detailsCtrl'
            });

    ProductDetailsController.$inject = [
                                        'EventService',
                                        'UdfRepository',
                                        'UdfService',
                                        'PurchaseItemsService',
                                        'PurchaseItemsRepository',
                                        'PurchaseCartService',
                                        'ProductDetailsValidationService',
                                        '$location',
                                        '$stateParams',
    ];

    function ProductDetailsController(EventService, UdfRepository, UdfService, PurchaseItemsService, PurchaseItemsRepository, PurchaseCartService, ProductDetailsValidationService, $location, $stateParams) {
        var vm = this;
        $stateParams.id = parseInt($stateParams.id);
        vm.products = undefined;
        vm.language = EventService.getLanguage();
        if (PurchaseItemsService.purchaseItems === undefined)
            getPurchaseItems(EventService.getEventId(), vm.language);
        else
            setInitialValues();
        vm.submitted = false;
        vm.addToCart = addToCart;
        vm.purchaseInformation = [];
        vm.showEcard = true;
        vm.ProductDetailsValidationService = ProductDetailsValidationService;
        vm.PurchaseCartService = PurchaseCartService;
        vm.purchaseInformation.quantity = "1";
        vm.purchaseInformation.attribute = "0";
        vm.changeRealProduct = changeRealProduct;
        vm.datePicker = {
            opened: 'false'
        };
        vm.format = "dd-MMMM-yyyy";
        vm.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        vm.altInputFormats = ['M!/d!/yyyy'];
        vm.active = 0;
        vm.openCalendar = openCalendar;
        vm.purchaseInformation.senderNameDirty = [];
        vm.purchaseInformation.senderEmailDirty = [];
        vm.purchaseInformation.recipientNameDirty = [];
        vm.purchaseInformation.recipientEmailDirty = [];
        function openCalendar() {
            angular.element(document.getElementsByClassName("uib-datepicker-current")[0]).removeClass("btn");
            angular.element(document.getElementsByClassName("uib-clear")[0]).removeClass("btn");
            angular.element(document.getElementsByClassName("uib-close")[0]).removeClass("btn");
        }
        function changeRealProduct(purchaseItemID) {
            vm.realProduct = vm.product.childs.find(function (x) {
                return x.purchaseItemID === parseInt(purchaseItemID)
            });
            if (vm.realProduct.available == undefined)
                vm.realProduct.available = vm.realProduct.availableQuantity;
            if (vm.realProduct.maxPurchaseAllowed === undefined)
                vm.realProduct.maxPurchaseAllowed = vm.realProduct.availableQuantity;
            vm.purchaseInformation.quantity = "1";
        }
        function getPurchaseItems(eventID, languageCode) {
            PurchaseItemsRepository.getPurchaseItems(eventID, languageCode, EventService.getWebGetServiceUrl()).then(success).catch(error);
            function success(data) {
                PurchaseItemsService.setPurchaseItems(data);
                PurchaseItemsService.changeLanguage(vm.language);
                setInitialValues();
            }
            function error(error) {
                console.log(error);
            }
        }
        function setInitialValues() {
            vm.product = PurchaseItemsService.getPurchaseItem($stateParams.id);
            vm.realProduct = vm.product;
            if (vm.realProduct.available == undefined)
                vm.realProduct.available = vm.realProduct.availableQuantity;
            vm.items = PurchaseItemsService.purchaseItems.slice();
            var index = 0;
            var i = 0;
            vm.items.forEach(function (e) {
                e.url = PurchaseItemsService.getImageWriteUrl(e.elementPropertyID);
                if (e === vm.product)
                    index = i;
                i++;
            });
            vm.items.splice(index, 1);
            if (vm.items.length > 3)
                vm.moreSize = vm.items.length - 3;
            else
                vm.moreSize = 0;
           
            vm.url = PurchaseItemsService.getImageWriteUrl(vm.product.elementPropertyID);
            //vm.cart = data;
            vm.product['slides'] = [];
            vm.product.slides.push(vm.url);
            vm.product.slides.push(PurchaseItemsService.getImageWriteUrl(13802481));
            vm.product.slides.push(vm.url);
            vm.product.slides.push(vm.url);
            if (vm.product.maxPurchaseAllowed > 10 || vm.product.maxPurchaseAllowed == 0)
                vm.product.maxPurchaseAllowed = 10;
            if (vm.product.childs !== undefined) {
                vm.product.childs.forEach(function (e) {
                    if (e.maxPurchaseAllowed > 10 || e.maxPurchaseAllowed == 0)
                        e.maxPurchaseAllowed = 10;
                    if (e.available < e.maxPurchaseAllowed)
                        e.maxPurchaseAllowed = e.quantity;
                });
            } else {
                if (vm.product.maxPurchaseAllowed > 10 || vm.product.maxPurchaseAllowed == 0)
                    vm.product.maxPurchaseAllowed = 10;
                if (vm.product.available < vm.product.maxPurchaseAllowed)
                    vm.product.maxPurchaseAllowed = vm.product.available;
            }

        }

        function addToCart() {
            vm.submitted = true;
            if (vm.realProduct.available > 0) {
                console.log((ProductDetailsValidationService.validateRequiredFields(vm.purchaseInformation)));
                if (vm.realProduct.eCardStatus != "Disabled" && !ProductDetailsValidationService.validateRequiredFields(vm.purchaseInformation)) {
                    for(var i = 0; i< parseInt(vm.purchaseInformation.quantity); i++){
                        vm.purchaseInformation.senderEmailDirty[i] = true;
                        vm.purchaseInformation.senderNameDirty[i] = true;
                        vm.purchaseInformation.recipientEmailDirty[i] = true;
                        vm.purchaseInformation.recipientNameDirty[i] = true;
                    }
                    return;
                }
                if ((vm.realProduct.childs != undefined || vm.realProduct.ParentPurchaseItemID != 0 ) && vm.purchaseInformation.attribute == "0") {
                    return;
                }
                vm.realProduct.available -= parseInt(vm.purchaseInformation.quantity);
                vm.purchaseInformation.purchaseItemID = vm.realProduct.purchaseItemID;
                vm.purchaseInformation.ParentPurchaseItemID = vm.realProduct.ParentPurchaseItemID;
                PurchaseCartService.addItem(vm.purchaseInformation);
                if (vm.realProduct.available < vm.realProduct.maxPurchaseAllowed) {
                    vm.realProduct.maxPurchaseAllowed = vm.realProduct.available;
                    vm.purchaseInformation.quantity = "1"
                }
            }
        }
    }
})();
