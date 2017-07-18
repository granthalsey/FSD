(function () {
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
        pageVM.treeLayout = [];
        //push content into 
        for (var x in pageVM.layout.content) {
            log(pageVM.layout.content[x]);
            pageVM.treeLayout.push(pageVM.layout.content[x]);
        }

        pageVM.isChildFriendly = layoutFactory.isChildFriendly;
        $scope.$watch(
                   "pageVM.treeLayout",
                   function handleChange(newValue, oldValue) {
                       log('fired watch, syncing layout');
                       pageVM.layout.content = pageVM.treeLayout;
                   },
                   true
               );


    }]);
})();


