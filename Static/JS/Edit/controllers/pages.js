(function () {
    'use strict';

    angular.module("app").controller('pages', ['themeFactory', function (themeFactory) {
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


    }]);
})();


