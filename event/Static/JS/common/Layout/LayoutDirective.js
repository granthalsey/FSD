(function () {

    angular.module('layout', []).directive('contentLayout', directive);


    function directive() {
        return {
            templateUrl: '/templates/edit/LayoutHelper.html',
            restrict: 'EA',
            scope: {
                layout: '='
            },
            replace: true,
            link: function (scope, element, attrs) {
                log('I\'m Helping');

            }
        }
    }

}());