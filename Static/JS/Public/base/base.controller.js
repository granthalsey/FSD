(function () {
    'use strict';

    angular
        .module('public')
        .controller('base', baseController);

    baseController.$inject = [
        '$scope',
        '$rootScope',
        '$window',
        '$state',
        '$stateParams'
    ];

    function baseController($scope, $rootScope, $window, $state, $stateParams) {
        var baseVm = this;
        baseVm.state = $scope.current = $state.current;

        $rootScope.$on('$stateChangeSuccess',
          function (event, toState, toParams, fromState, fromParams) {
              $state.current = toState;
          });

      


    }

})();

