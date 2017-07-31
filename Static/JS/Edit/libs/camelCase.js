angular.module('camelCaseToHuman', []).filter('camelCaseToHuman', function () {
    return function (input) {
        if (input) {
            input = input.replace('-', ' ');
            return input.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1"); // haha what?
        }
        else
            return false;
    }
});