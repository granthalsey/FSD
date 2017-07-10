angular.module("themes").factory('themeFactory', function () {
    var PROPERTIES = {
        backgroundColor: 'background-color',
        textDecoration: 'text-decoration',
        color: 'color',
        backgroundImage: 'background-image',
        backgroundPosition: 'background-position'
    };
    var TYPES = {
        color: 'color',
        textDecoration: 'text-decoration'
    };

    var hardCodedTestTheme = {
        wrap: {
            rules:
            [
                { property: PROPERTIES.backgroundColor, type: TYPES.color, value: '#ececec' }
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
            rules: [{
                property: PROPERTIES.backgroundColor, type: TYPES.color, value: '#f27221'

            }
            ]


        },
        'secondary-btn': {

        },
        'button': {
            displayName: 'button',
            rules: []
        },
        'header-link': {
            rules: [
                { property: PROPERTIES.color, type: TYPES.color, value: '#fff' }
            ],
            displayName: 'Header Navigation'
        }


    };






    var service = {}


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
                log('rts', rulesToString(rule, prefix, key));
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
        s.id = 'fs-theme';
        if (s.styleSheet) {   // IE
            s.styleSheet.cssText = css;
        } else {                // the world
            s.appendChild(document.createTextNode(css));
        }
        head.appendChild(s);
    }

    var theme = hardCodedTestTheme;
    service.getTheme = function () {
        return theme;
    }
    service.getThemeCss = function () {
        var css = themeToCss(theme);
        log('returning theme CSS', css);
        return css;
    }

    service.saveTheme = function (newTheme) {
        theme = newTheme;
        log('theme saved', theme);
        return theme;
    }
    service.applyTheme = function (theme) {
        $('#themeStyles').length ? $('#fs-theme').remove() : log('no theme block to remove');
        addcss(themeToCss(theme));
        return true;

    };
    service.types = TYPES;
    service.properties = PROPERTIES;

    return service;
})