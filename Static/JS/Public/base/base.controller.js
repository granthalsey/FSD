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


        var PROPERTIES = {
            backgroundColor: 'background-color',
            textDecoration: 'text-decoration',
            color: 'color'
        }
        var TYPES = {
            color: 'color',
            textDecoration: 'text-decoration'
        }

        var theme = {
            wrap: {
                rules:
                [
                    { property: PROPERTIES.backgroundColor, type: TYPES.color, value: '#ccc' }
                ],
                displayName: 'Body'
            },
            link: {
                rules: [
                    { property: PROPERTIES.color, type: TYPES.color, value: '#1BA6DF' },
                    { property: PROPERTIES.textDecoration, type: TYPES.textDecoration, value: 'none' }],
                states: {
                    hover: [{
                        property: PROPERTIES.textDecoration, type: TYPES.textDecoration, value: 'underline'
                    }]
                },// todo hover, active, disabled etc,
                displayName: 'Text Links'

            },
            header: {

            },
            'primary-btn': {

            },
            'secondary-btn': {

            }


        };

        var rulesToString = function (rule, prefix, key) {
            var tempStr = prefix + key;
            tempStr += '{';
            tempStr += rule.property + ": " + rule.value;
            tempStr += '}';
            tempStr += '\n';
            return tempStr;
        }

        var themeToCss = function (d) {
            var strTheme = '';
            var prefix = '.fs-custom .fs-';


            angular.forEach(d, function (value, key) {

                //extract rules from definition
                angular.forEach(value.rules, function (rule) {
                    strTheme = strTheme += rulesToString(rule, prefix, key);
                });

                //extract states from definition
                angular.forEach(value.states, function (stateRules, stateName) {
                    console.log('state', stateRules);
                    angular.forEach(stateRules, function (rule) {
                        //we add each rule twice, for the class and the pseudo selector
                        var pseudoSelector = key + ':' + stateName;
                        var classSelector = key + '.' + stateName;
                        strTheme = strTheme += rulesToString(rule, prefix, pseudoSelector);
                        strTheme = strTheme += rulesToString(rule, prefix, classSelector);
                    });
                });


            });


            console.log(strTheme);
            return strTheme;
        }

        function addcss(css) {
            var head = document.getElementsByTagName('head')[0];
            var s = document.createElement('style');
            s.setAttribute('type', 'text/css');
            if (s.styleSheet) {   // IE
                s.styleSheet.cssText = css;
            } else {                // the world
                s.appendChild(document.createTextNode(css));
            }
            head.appendChild(s);
        }

        addcss(themeToCss(theme));

      


    }

})();

