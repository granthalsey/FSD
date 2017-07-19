﻿(function () {
    'use strict';

    angular.module("app").controller('pages', ['themeFactory', 'layoutFactory', '$scope',
    function (themeFactory, layoutFactory, $scope) {
        var pageVM = this;
        pageVM.themeObj = themeFactory.getTheme();
        pageVM.themeCss = themeFactory.getThemeCss();
        var applied = themeFactory.applyTheme(pageVM.themeObj);
        log('theme applied', applied);
        pageVM.updateThemePreview = function () {
            log('theme change!');
            themeFactory.saveTheme(pageVM.themeObj);
            themeFactory.applyTheme(pageVM.themeObj);
        };

        pageVM.layout = {};

        pageVM.layout = layoutFactory.getLayout();
        pageVM.treeLayout = []; //used for tree layout for d&d
        //push content into 
        for (var x in pageVM.layout.content) {
            log(pageVM.layout.content[x]);
            pageVM.treeLayout.push(pageVM.layout.content[x]);
        }

        pageVM.isChildFriendly = layoutFactory.isChildFriendly;

        //syncs the left drag and drop to the right 
        $scope.$watch(
                   "pageVM.treeLayout",
                   function handleChange(newValue, oldValue) {
                       log('fired watch, syncing layout');
                       newValue !== oldValue ? pageVM.layout.content = pageVM.treeLayout : false;
                   }, true
               );


    }]);

    //// mock data - these should be broken into components etc
    pageVM.fundraiserLeaderBoard = {};
    pageVM.fundraiserLeaderBoard.fundraisers = [{ "first_name": "Dane", "last_name": "Jezzard", "amount raised": "694.56" }, { "first_name": "Jake", "last_name": "Bachman", "amount raised": "921.00" }, { "first_name": "Audy", "last_name": "Berntsson", "amount raised": "721.07" }, { "first_name": "Alf", "last_name": "Fitzroy", "amount raised": "534.15" }, { "first_name": "Friederike", "last_name": "Wyrill", "amount raised": "902.30" }, { "first_name": "Melloney            ", "last_name": "Ainslie", "amount raised": "995.51" }, { "first_name": "Ashlie", "last_name": "Ashfold", "amount raised": "903.65" }, { "first_name": "Boone", "last_name": "Hendriksen", "amount raised": "870.75" }, { "first_name": "Nicolais            ", "last_name": "Tombleson           ", "amount raised": "776.74" }, { "first_name": "Justino", "last_name": "Drogan", "amount raised": "738.59" }];










})();


