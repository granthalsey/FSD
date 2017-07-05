(function() {
    'use strict';

    angular.module('PurchaseTemplate')
    .service('PurchaseCartService', PurchaseCartService);

    PurchaseCartService.$inject = ['PurchaseItemsService'];
    function PurchaseCartService(PurchaseItemsService) {
        var service = {
            items: [],
            getItems: getItems,
            getItem: getItem,
            addItem: addItem,
            getCartSize: getCartSize
        };

        return service;
        
        function addItem(item) {
            var eCardsInfo = [];
            if (item.senderName) {
                var i = 0;
                Object.keys(item.senderName).forEach(function (key, index) {
                    var temp = {
                        senderName: item.senderName[index],
                        senderEmail: item.senderEmail[index],
                        recipientName: item.recipientName[index],
                        recipientEmail: item.recipientEmail[index]
                    }
                    if (item.futureDate)
                        temp['futureDate'] = item.futureDate[index];
                    i++;
                    eCardsInfo.push(temp);
                });
            }
            var itemExist = service.getItem(item.purchaseItemID);
            if (itemExist) {
                itemExist.quantity += parseInt(item.quantity);
                if(eCardsInfo.length > 0)
                    itemExist.eCardsInfo.push(eCardsInfo);
                return;
            }
            if (item.ParentPurchaseItemID != 0) {
                var itemInfo = PurchaseItemsService.getPurchaseChildItem(item.ParentPurchaseItemID, item.purchaseItemID);
                itemInfo.url = PurchaseItemsService.getPurchaseItem(item.ParentPurchaseItemID).url;
            }
            else
                var itemInfo = PurchaseItemsService.getPurchaseItem(item.purchaseItemID);
            var temp = {
                purchaseItemID: item.purchaseItemID,
                quantity: parseInt(item.quantity),
                price: itemInfo.price,
                title: itemInfo.title,
                ItemAttribute: itemInfo.ItemAttribute,
                ParentPurchaseItemID: itemInfo.ParentPurchaseItemID,
                url: itemInfo.url,
                availableQuantity: itemInfo.availableQuantity,
                eCardsInfo: eCardsInfo
            }
            temp.price = Number(temp.price.replace(/[^0-9\.]+/g, ""));
            service.items.push(temp);
        }
        function getCartSize() {
            var size = 0;
            service.items.forEach(function (e) {
                size += parseInt(e.quantity);
            });
            return size;
        }
        function getItem(purchaseItemID) {
            if (service.items)
                return service.items.find(function (x) {
                    return x.purchaseItemID === purchaseItemID
                });
        }
        function getItems() {
            return service.items;
        }
}
})();
