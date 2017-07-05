(function () {
    'use strict';

    angular
        .module('PurchaseTemplate')
        .controller('CartReviewController', CartReviewController)
        .component('cartReview', {
            templateUrl: '/Static/Templates/PurchaseTemplate/cartReview.aspx'+window.location.search,
            controller: 'CartReviewController',
            controllerAs: 'cartCtrl'
        });
    CartReviewController.$inject = ['PurchaseItemsService', 'CheckoutValidationService', 'PurchaseCartService'];

    function CartReviewController(PurchaseItemsService, CheckoutValidationService, PurchaseCartService) {
        var vm = this;
        vm.languageCode = serverSettings.language;
        vm.cartItems = PurchaseCartService.getItems();
        vm.PurchaseItemsService = PurchaseItemsService;
        vm.CheckoutValidationService = CheckoutValidationService;
        vm.changeQuantity = changeQuantity;
        vm.deleteItem = deleteItem;

        function changeQuantity(index) {
            var item = PurchaseItemsService.getPurchaseItem(vm.cartItems[index].purchaseItemID);
            if (vm.cartItems[index].quantity === undefined)
                vm.cartItems[index].quantity = item.availableQuantity;
            item.available = item.availableQuantity - vm.cartItems[index].quantity;
        }
        function deleteItem(index) {
            var item = PurchaseItemsService.getPurchaseItem(vm.cartItems[index].purchaseItemID);
            item.available = item.availableQuantity;
            vm.cartItems.splice(index, 1);
        }
    }
})();
