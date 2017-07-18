(function () {
    'use strict';

    angular.module("public").controller('home', ['$scope', 'themeFactory', 'layoutFactory', function ($scope, themeFactory, layoutFactory) {


        $scope.themeObj = themeFactory.getTheme();
        $scope.themeCss = themeFactory.getThemeCss();
        var applied = themeFactory.applyTheme($scope.themeObj);
        log('theme applied', applied);


        $scope.layout = layoutFactory.getLayout();
        log('layout', layoutFactory.getLayout());

    }]);
})();


