angular.module("themes").factory('themeFactory', function () {
    var PROPERTIES = {
        backgroundColor: 'background-color',
        textDecoration: 'text-decoration',
        color: 'color',
        backgroundImage: 'background-image',
        backgroundPosition: 'background-position',
        fontFamily: 'font-family'
    };
    var TYPES = {
        color: 'color',
        textDecoration: 'text-decoration',
        fontFamily: 'font-family',
        image: 'image'
    };

    var customFontQueue = [];
    var hardCodedTestTheme = {
        '.fs-wrap': {
            rules:
            [
                { property: PROPERTIES.backgroundColor, type: TYPES.color, value: '#ececec' },
                { property: PROPERTIES.backgroundImage, type: TYPES.image, value: 'url(https://daks2k3a4ib2z.cloudfront.net/5909fc7f818ecc0900827a34/5942a75cb9c7b610c22de743_5919bfdca6ce0e40ed98746a_iStock-624028878-min.jpg)' },
                { property: PROPERTIES.color, type: TYPES.color, value: 'rgb(39, 47, 54)' },
                { property: PROPERTIES.fontFamily, type: TYPES.fontFamily, value: 'Roboto' }
            ],

            displayName: 'Page'
        },
        a: {
            rules: [
                { property: PROPERTIES.color, type: TYPES.color, value: '#1BA6DF' },
                { property: PROPERTIES.textDecoration, type: TYPES.textDecoration, value: 'none' }
            ],
            states: {
                hover: [
                     { property: PROPERTIES.color, type: TYPES.color, value: '#0f6386' },
                    {
                        property: PROPERTIES.textDecoration,
                        type: TYPES.textDecoration,
                        value: 'underline'
                    }
                ]
            }, // todo hover, active, disabled etc,
            displayName: 'Text Links'

        },
        '.fs-primary-btn': {
            rules: [
                {
                    property: PROPERTIES.backgroundColor,
                    type: TYPES.color,
                    value: '#f27221'

                },
                 {
                     property: PROPERTIES.color,
                     type: TYPES.color,
                     value: '#ffffff'

                 },
                {
                    property: PROPERTIES.fontFamily,
                    type: TYPES.fontFamily,
                    value: 'Roboto'
                }
            ],
            displayName: 'Primary Buttons',
            validate: [0, 1],
            states: {
                hover: [
                         { property: PROPERTIES.color, type: TYPES.color, value: '#f27221' },
                { property: PROPERTIES.backgroundColor, type: TYPES.color, value: '#ffffff' }]

            }


        },
        '.fs-secondary-btn': {
            rules: [
               {
                   property: PROPERTIES.backgroundColor,
                   type: TYPES.color,
                   value: '#f27221'

               }],
            displayName: 'Secondary Buttons'

        },
        //'button': {
        //    displayName: 'button',
        //    rules: []
        //},
        'header-link': {
            rules: [
                { property: PROPERTIES.color, type: TYPES.color, value: '#fff' }
            ],
            displayName: 'Header Navigation'
        },
        'heading': {
            rules: [{ property: PROPERTIES.fontFamily, type: TYPES.fontFamily, value: 'Coming Soon' }],
            displayName: 'Headings'
        }


    };

    var service = {}


    var rulesToString = function (rule, prefix, key) {
        log('key', key);
        var tempStr = prefix + key;

        if (rule.property === PROPERTIES.fontFamily) //load font and wrap in quotes
        {
            customFontQueue.push(rule.value);
            // rule.value = "'" + rule.value + "'";
            // todo move this somewhere good

        }
        tempStr += '{';
        tempStr += rule.property + ": " + rule.value;
        tempStr += '}';
        tempStr += '\n';

        return tempStr;
    }

    var themeToCss = function (d) {
        var strTheme = '';
        var prefix = '.fs-custom ';


        angular.forEach(d, function (value, key) {

            switch (key) {//todo make this data driven with a mapping of mapped keys
                case 'heading':
                    for (var f = 1; f <= 5; ++f) {
                        angular.forEach(value.rules, function (rule) {
                            strTheme = strTheme += rulesToString(rule, '.fs-custom ', 'h' + f);
                        });
                    }
                    break;
                default:
                    angular.forEach(value.rules, function (rule) {
                        strTheme = strTheme += rulesToString(rule, prefix, key);
                    });
                    break;
            }


            //extract states from definition
            angular.forEach(value.states, function (stateRules, stateName) {
                angular.forEach(stateRules, function (rule) {
                    //we add each rule twice, for the class and the pseudo selector
                    var pseudoSelector = key + ':' + stateName;
                    var classSelector = key + '.' + stateName;
                    strTheme = strTheme += rulesToString(rule, prefix, pseudoSelector);
                    strTheme = strTheme += rulesToString(rule, prefix, classSelector);
                });
            });


        });

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

        //todo load font web font js
        //todo dedupe array
        WebFont.load({
            google: {
                families: customFontQueue
            }
        });
    }

    var isReadable = function (color_one, color_two) {
        log('hey ' + color_one, color_two);
        var r = true;
        var THRESHOLD = .5;

        if (tinycolor) {
            var c1 = tinycolor(color_one);
            var c2 = tinycolor(color_two);
            log(c1, c2);
            // if (c1.isValid() && c2.isValid()) {
            log(c1.isValid(), c2.isValid());
            r = tinycolor.isReadable(color_one, color_two, { level: "AA", size: "large" });
            //}



        }
        return r;


    };


    var theme = hardCodedTestTheme;
    service.getTheme = function () {
        return theme;
    }
    service.getThemeCss = function () {
        var css = themeToCss(theme);
        //  log('returning theme CSS', css);
        return css;
    }

    service.saveTheme = function (newTheme) {
        theme = newTheme;
        //  log('theme saved', theme);
        return theme;
    }
    service.applyTheme = function (theme) {
        $('#themeStyles').length ? $('#fs-theme').remove() : log('no theme block to remove');
        addcss(themeToCss(theme));
        return true;

    };
    service.types = TYPES;
    service.properties = PROPERTIES;
    service.isReadable = isReadable;


    return service;
})