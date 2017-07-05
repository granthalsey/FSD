(function () {
    'use strict';

    window.app = angular.module(
        'PurchaseTemplate',
        ['angular.vertilize',
    		'ui.router',
            'ui.bootstrap',
            'angular.filter',
            'ngAnimate',
            'ngSanitize',
            'ui.bootstrap.showErrors',
            'ngSanitize',
            'vcRecaptcha',
            'blockUI'
        ]
    );
})();
