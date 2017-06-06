(function () {
    'use strict';

    angular.module('app').controller('baseController', baseController);

    baseController.$inject = [
        '$scope',
        '$rootScope',
        '$window',
        '$state',
        '$stateParams'
    ];

    function baseController($scope, $rootScope, $window, $state, $stateParams) {
        var vm = this;
        vm.state = $scope.current = $state.current;

        $rootScope.$on('$stateChangeSuccess',
          function (event, toState, toParams, fromState, fromParams) {
              $state.current = toState;
              console.log('toState', toState);
          });

    }

})();

