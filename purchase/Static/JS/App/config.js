(function () {
    'use strict';

    angular.module('PurchaseTemplate')
	.config(config);

    function config($stateProvider, $urlRouterProvider) {
        var registerStatefulModal = function (stateName, component, parent, params, size, resolves) {
            params = params || {};
            resolves = resolves || angular.extend({}, resolves, { stateParams: ['$stateParams', function ($stateParams) { return $stateParams; }] });
            size = size || 'md';
            var modal;
            $stateProvider.state(stateName, {
                url: '/' + stateName,// I only use this for debugging
                modal: true,
                parent: parent || 'home',
                params: params,
                onEnter: [
                '$stateParams',
                /*'$previousState',*/
                '$uibModal',
                function ($stateParams, $uibModal, $previousState) {
                    //log('stateful modal enter', stateName, resolves);
                    /*$previousState.memo('modalInvoker');*/
                    modal = $uibModal.open({
                        animation: true,
                        component: component,
                        backdrop: 'static',
                        keyboard: false,
                        size: size,
                        resolve: resolves
                    });
                    // $scope.cancel functions should use modal.dismiss('cancel') or modal.dismiss('success') etc. to close the modal 
                    // so we can restore the previous state
                    modal.result.catch(function (reason) {
                        // log('modal dismiss', reason);
                        /*if (reason)
                        $previousState.go('modalInvoker');*/
                    });
                    modal.result.then(function (result) {
                        //log('modal close', result);
                    });
                    modal.result.finally(function () {
                        modal.$destroy();
                    });
                }
                ],
                onExit: function () {
                    if (modal) {
                        modal.close();
                    }
                }
            });
        }

        //todo this needs to be injected in. Don't reference window.location in the middle of the configs. 
        var states = [];
        var queryString = window.location.search;

        var homeState = {
            name: 'home',
            url: '/home',
		    templateUrl: 'static/templates/home.aspx' + queryString
	    };
        var itemsState = {
            name: 'items',
            url: '/items',
            controller: 'ItemsController',
		    templateUrl: 'Static/Templates/PurchaseTemplate/items.aspx' + queryString
	    };
        var itemState = {
            name: 'item',
            url: '/item',
            controller: 'ItemController',
            templateUrl: 'static/templates/item.html'
	    };
        /*var checkoutState = {
            name: 'checkout',
            url: '/checkout',
            controller: 'CheckoutController',
            templateUrl: 'Static/Templates/checkout.aspx' + queryString
	    };*/
        var productDetailsState = {
            name: 'productDetails',
            url: '/productDetails:id',
            component: 'productDetails'
	    };
        var purchaseInformationState = {
            name: 'purchaseInformation',
            url: '/purchaseInformation',
            component: 'purchaseInformation'
        };
	    var thankYouState = {
	        name: 'thankYou',
	        url: '/thank-you',
	        templateUrl: 'Static/Templates/PurchaseTemplate/thankYou.aspx' + queryString
	    };
	    var checkoutState = {
	        name: 'checkout',
	        url: '/checkout',
	        component: 'checkout'
	    }
        $stateProvider.state(homeState);
        $stateProvider.state(itemsState);
        $stateProvider.state(itemState);
        $stateProvider.state(checkoutState);
        $stateProvider.state(productDetailsState);
        $stateProvider.state(purchaseInformationState);
        $stateProvider.state(thankYouState);
        $urlRouterProvider.otherwise("/home");
    }
})();
