(function () {
    'use strict';

    angular.module('PurchaseTemplate')
    .service('ProductDetailsValidationService', ProductDetailsValidationService);

    ProductDetailsValidationService.$inject = ['PurchaseItemsService'];
    function ProductDetailsValidationService(PurchaseItemsService) {
        var service = {
            validateOrderQuantity: validateOrderQuantity,
            validateEmail: validateEmail,
            validateRequiredFields: validateRequiredFields,
            getErrors: getErrors,
            getLabels: getLabels
        };

        return service;

        function validateOrderQuantity(amount, purchaseItemID) {
            if (PurchaseItemsService.getItemMaxQuantity(purchaseItemID) < amount) {
                return false;
            }
            return true;
        }

        function validateEmail(email) {
            var emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (email !== undefined && emailRegEx.test(email)) {
                return true;
            }
            return false;
        }

        function validateRequiredFields(data) {
            if (data.senderName){
                var validate = true;
                Object.keys(data.senderName).forEach(function (key, index) {
                    if (data.senderName[index] === "" || data.senderEmail[index] === "" ||
                        data.recipientName[index] === "" || data.recipientEmail[index] === "" ||
                        !service.validateEmail(data.recipientEmail[index]) || !service.validateEmail(data.senderEmail[index]))
                        validate = false;
                });
                if (validate == false)
                    return false;
            }else
                return false;
            return true;
        }

        function getErrors(language) {
            if (language === "en-CA")
                return service.englishErrors;
            if (language === "fr-CA")
                return service.frenchErrors;
        }
        function getLabels(language) {
            if (language === "en-CA")
                return service.englishLabels;
            if (language === "fr-CA")
                return service.frenchLabels;
        }
    }
})();
