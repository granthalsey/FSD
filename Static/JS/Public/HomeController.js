(function () {
    'use strict';

    angular.module("public").controller('home', ['$scope', 'themeFactory', 'layoutFactory', function ($scope, themeFactory, layoutFactory) {


        $scope.themeObj = themeFactory.getTheme();

        var applied = themeFactory.applyTheme($scope.themeObj);
        //        log('theme applied', applied);


        $scope.layout = layoutFactory.getLayout('event');


    }]);
})();


