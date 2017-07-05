(function() {
    'use strict';

    angular.module('PurchaseTemplate')
    .service('PurchaseItemsService', PurchaseItemsService);

    PurchaseItemsService.$inject = ['PurchaseItemsRepository'];
    function PurchaseItemsService(PurchaseItemsRepository) {
        var service = {
            purchaseItems: undefined,
            languageItems: undefined,
            ImageWriterUrl: undefined,
            setPurchaseItems: setPurchaseItems,
            getPurchaseItem: getPurchaseItem,
            getPurchaseChildItem: getPurchaseChildItem,
            getItemMaxQuantity: getItemMaxQuantity,
            getImageWriteUrl: getImageWriteUrl,
            setImageWriteUrl: setImageWriteUrl,
            changeLanguage: changeLanguage
        };

        return service;
        function changeLanguage(languageCode) {
            if (languageCode == "en-FR")
                service.purchaseItems = service.languageItems.french;
            else
                service.purchaseItems = service.languageItems.english
        }
        function setImageWriteUrl(url){
            service.ImageWriterUrl = url;
        }
        function getImageWriteUrl(id){
            return service.ImageWriterUrl+id;
        }
        function setPurchaseItems(items) {
            var products = {
                english:[],
                french:[]
            };
            var childs = [];
            items.purchaseItems.rows.forEach( function(e){
                var i = 0;
                var temp = {};
                e.forEach(function(product){
                    temp[items.purchaseItems.columns[i]] = product;
                    i++;
                });
                
                if(temp.ParentPurchaseItemID != 0)
                    childs.push(temp);
                else
                    if (temp.languageCode == "en-CA")
                        products.english.push(temp);
                    else
                        products.french.push(temp);
            });
            childs.forEach(function (e) {
                if (e.languageCode == "en-CA")
                    var product = products.english.find(function (x) {
                        return x.purchaseItemID == e.ParentPurchaseItemID;
                    });
                else
                    var product = products.french.find(function (x) {
                        return x.purchaseItemID == e.ParentPurchaseItemID;
                    });
                if(product['childs'] === undefined){
                    product['childs'] = [];
                }
                product['childs'].push(e);
            });
            service.languageItems = products;
            service.purchaseItems = products.english;
            return service.purchaseItems;
        }
        function getPurchaseChildItem(parentPurchaseItemID, purchaseItemID) {
            var parentItem = service.getPurchaseItem(parentPurchaseItemID);
            if(parentItem)
                return parentItem.childs.find(function (x) {
                    return x.purchaseItemID === purchaseItemID
                });
        }
        function getPurchaseItem(purchaseItemID) {
            if(service.purchaseItems)
                return service.purchaseItems.find(function(x){
                    return x.purchaseItemID === purchaseItemID
                });
        }

        function getItemMaxQuantity(purchaseItemID) {
            if(service.purchaseItems)
                return service.purchaseItems.find(function(x){
                    return x.purchaseItemID === purchaseItemID
                }).maxPurchaseAllowed;
        }
      
    }
})();
