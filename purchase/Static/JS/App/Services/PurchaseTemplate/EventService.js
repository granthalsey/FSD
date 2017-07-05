(function () {
    'use strict';

    angular.module('PurchaseTemplate')
    .service('EventService', EventService);

    EventService.$inject = [];
    function EventService() {
        var service = {
            event: undefined,
            eventSettings: undefined,
            paygateways: [],
            titleIDs: [],
            language: undefined,
            eventId: undefined,
            webGetServiceUrl: undefined,
            imageWriteUrl: undefined,
            organizationName: undefined,
            setEvent: setEvent,
            getEvent: getEvent,
            setLanguage: setLanguage,
            getLanguage: getLanguage,
            setEventId: setEventId,
            getEventId: getEventId,
            setWebGetServiceUrl: setWebGetServiceUrl,
            getWebGetServiceUrl: getWebGetServiceUrl,
            setImageWriterUrl: setImageWriterUrl,
            getImageWriterUrl: getImageWriterUrl,
            getOrganizationName: getOrganizationName,
            getTitleIds: getTitleIds
        };
        return service;
        function getPaygateway(CreditCardTypeID) {
            if (service.paygateways)
                return service.paygateways.find(function (x) {
                    return x.CreditCardTypeID === CreditCardTypeID;
                });
        }
        function setEvent(data) {
            service.eventSettings = data.eventSettings;
            service.organizationName = data.eventSettings.EventName;
            data.paygateways.rows.forEach(function (e) {
                var i = 0;
                var temp = {};
                e.forEach(function (x) {
                    temp[data.paygateways.columns[i]] = x;
                    i++;
                });
                switch (temp.CreditCardTypeID) {
                    case "Amex":
                        temp.logoUrl = "https://www.firstgiving.com/images/logo/logo_ccAmex.gif";
                        break;
                    case "Diners":
                        temp.logoUrl = "https://www.firstgiving.com/images/logo/logo_ccDiners.gif";
                        break;
                    case "MasterCard":
                        temp.logoUrl = "https://www.firstgiving.com/images/logo/logo_ccMC.gif";
                        break;
                    case "Maestro":
                        temp.logoUrl = "https://www.firstgiving.com/images/logo/logo_ccMaestro.gif";
                        break;
                    case "Visa":
                        temp.logoUrl = "https://www.firstgiving.com/images/logo/logo_ccVisa.gif";
                        break;
                }
                service.paygateways.push(temp);
            });
            data.titleIDs.rows.forEach(function (e) {
                var i = 0;
                var temp = {};
                e.forEach(function (x) {
                    temp[data.titleIDs.columns[i]] = x;
                    i++;
                });
                service.titleIDs.push(temp);
            });
        }
        function getTitleIds() {
            return service.titleIDs;
        }
        function getPaygateways() {
            return service.paygateways;
        }
        function getEvent() {
            return service.event;
        }
        function setLanguage(data) {
            service.language = data;
        }
        function getLanguage() {
            return service.language;
        }
        function getOrganizationName() {
            return service.organizationName;
        }
        function setEventId(data) {
            service.eventId = data;
        }
        function getEventId() {
            return service.eventId;
        }
        function setWebGetServiceUrl(data) {
            service.webGetServiceUrl = data;
        }
        function getWebGetServiceUrl() {
            return service.webGetServiceUrl;
        }
        function setImageWriterUrl(data) {
            service.imageWriteUrl = data;
        }
        function getImageWriterUrl() {
            return service.imageWriteUrl;
        }
    }
})();
