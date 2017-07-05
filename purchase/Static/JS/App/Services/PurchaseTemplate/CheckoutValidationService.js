(function () {
    'use strict';

    angular.module('PurchaseTemplate')
    .service('CheckoutValidationService', CheckoutValidationService);

    CheckoutValidationService.$inject = ['PurchaseItemsService'];
    function CheckoutValidationService(PurchaseItemsService) {
        var service = {
            ccRegex: {
                visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
                mastercard: /^5[1-5][0-9]{14}$/,
                amex: /^3[47][0-9]{13}$/,
                discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
                diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
                email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            },
            getTotal: getTotal,
            validateEmail: validateEmail,
            validatePostalZip: validatePostalZip,
            validatePhoneNumber: validatePhoneNumber,
            GetCardType: GetCardType,
            validateCcNumber: validateCcNumber,
            validateCVC: validateCVC
        };

        return service;
        function getTotal(items)  {
            var total = 0;
            items.forEach(function (e) {
                total += (e.price * e.quantity);
            });
            return total;
        }
        function validateEmail(email) {
            if (email == undefined || service.ccRegex.email.test(email))
                return false;
            return true;
        }
        function validateCcNumber(ccNumber) {
            if (ccNumber != undefined)
                switch (GetCardType(ccNumber)) {
                    case "Visa":
                        if (service.ccRegex.visa.test(ccNumber))
                            return false;
                        break;
                    case "MasterCard":
                        if (service.ccRegex.mastercard.test(ccNumber))
                            return false;
                        break;
                    case "Amex":
                        if (service.ccRegex.amex.test(ccNumber))
                            return false;
                        break;
                    case "Discover":
                        if (service.ccRegex.discover.test(ccNumber))
                            return false;
                        break;
                    case "Diners":
                        if (service.ccRegex.diners.test(ccNumber))
                            return false;
                        break;
                    case "Switch":
                        if (service.ccRegex.discover.test(ccNumber))
                            return false;
                        break;
                    default:
                        return true;
                        break;
                }
            else
                return undefined;
                return true;
            }
        function GetCardType(number) {
            if (number != undefined) {
                // visa
                var re = new RegExp("^(?:4[0-9]{12}(?:[0-9]{3})?)$");
                if (number.match(re) != null)
                    return "Visa";

                // Mastercard
                re = new RegExp("^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$");
                if (number.match(re) != null)
                    return "MasterCard";

                // AMEX
                re = new RegExp("^3[47][0-9]{13}$");
                if (number.match(re) != null)
                    return "Amex";

                // Discover
                re = new RegExp("^6(?:011|5[0-9]{2})[0-9]{12}$");
                if (number.match(re) != null)
                    return "Discover";

                // Diners
                re = new RegExp("^6(?:011|5[0-9]{2})[0-9]{12}$");
                if (number.match(re) != null)
                    return "Diners";

                // Switch-maestro
                re = new RegExp("^6(?:011|5[0-9]{2})[0-9]{12}$");
                if (number.match(re) != null)
                    return "Switch";
                //wrong card
            }
        }
        function validateCVC(cvc) {
            if (cvc != undefined) {
                if (cvc == undefined || cvc.toString().length == 3)
            return false;
                return true;
        }
        }
        function validatePostalZip(country) {
            var regexPostalZip = "";
            switch (country) {
                case 'GB':
                    regexPostalZip = "(GIR|[A-Z]\\d[A-Z\\d]??|[A-Z]{2}\\d[A-Z\\d]??)[ ]??(\\d[A-Z]{2})";
                    break;
                case 'AU':
                    regexPostalZip = "^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$";
                    break;
                case 'NZ':
                    regexPostalZip = "\\d{4}";
                    break;
                case 'US':
                    regexPostalZip = "^\\d{5}([\\-]?\\d{4})?$";
                    break;
                case 'CA':
                    regexPostalZip = "^([ABCEGHJKLMNPRSTVXY]\\d[ABCEGHJKLMNPRSTVWXYZ])\\ {0,1}(\\d[ABCEGHJKLMNPRSTVWXYZ]\\d)$";
                    break;
                default:
                    ".+"
                    break;
            }
            return regexPostalZip;
        }
        function validatePhoneNumber(country) {
            var regexPhoneNumber = "";
            switch (country) {
                case 'GB':
                    regexPhoneNumber = "\\(?\\+[0-9]{1,3}\\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\\w{1,10}\\s?\\d{1,6})?";
                break;
                case 'AU':
                    regexPhoneNumber = "^0[0-8]\\d{8}$";
                    break;
                case 'NZ':
                    regexPhoneNumber = "^(?:(?:01\\d{9}|2\\d{7}) ){1,}(?:01\\d{9}|2\\d{7})$";
                    break;
                case 'US':
                    regexPhoneNumber = "^(\\([0-9]{3}\\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}|(\\([0-9]{3}\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$";
                    break;
                case 'CA':
                    regexPhoneNumber = "^(\\([0-9]{3}\\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}|(\\([0-9]{3}\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$";
                   break;
               default:
                    ".+"
                   break;
            }
            return regexPhoneNumber;
        }
    }
})();
