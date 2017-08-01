(function () {

    angular.module("layout").directive('contentLayout', directive);


    function directive() {
        return {
            templateUrl: '/templates/edit/LayoutHelper.html',
            restrict: 'EA',
            scope: {
                layout: '=',
                edit: '=',
                language:'='
            },
            replace: true,
            controller: function ($scope, $rootScope) {
                $rootScope.$broadcast('hey');

                $scope.editWidget = function (i) {
                    $rootScope.$broadcast('editWidget', i);
                };

            },
            link: function (scope, element, attrs) {
                log('I\'m Helping');

            }
        }
    }

}());