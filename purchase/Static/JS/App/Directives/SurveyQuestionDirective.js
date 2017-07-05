angular.module('PurchaseTemplate').directive('surveyQuestion', ['$compile', function ($compile) {
    var controller = ['$scope', '$filter', '$timeout', '$rootScope', function ($scope, $filter, $timeout, $rootScope) {

    }];
    return {
        template: '<div class="form-group"></div>',
        transclude: true,
        controller: controller,
        replace: true,
        link: function (scope, element, attrs) {
            var el = angular.element('<div"></div>');

            var textboxMarkup = '<input type="text" class="form-control" floating-label ng-model="input.value" ng-required="input.isRequired" placeholder = "{{input.label}}" />';
            var textareaMarkup = '<textarea class="form-control" ng-model="input.value" ng-required="input.isRequired" ng-required="input.isRequired" placeholder = "{{input.label}}"></textarea>';
            var selectMarkup = '<div><select class="form-control" ng-required="input.isRequired" placeholder = "{{input.label}}" ng-model="input.select" ng-options="a as a.Name for a in input.activities track by a.Name" ng-required="input.isRequired"><option value="">-- {{input.label}} --</option></select></div>';
            var multiselectMarkup = '<div><ui-select multiple ng-model="input.select" close-on-select="false" class="form-input" title="Multi Select" ng-required="input.isRequired"><ui-select-match placeholder="{{input.label}}" >{{$item.Name}}</ui-select-match><ui-select-choices repeat="i in input.activities | filter:$select.search">{{i.Name}}</ui-select-choices></ui-select></div>';
            var numberMarkup = '<input type="number" min="0" class="form-control" ng-model="input.value" ng-required="input.isRequired"/>';
            var currencyMarkup = '<div><input type="text" floating-label class="form-control" name="currency" ng-model="input.value" ng-currency currency-symbol="{{donation.Currency.Symbol}}" min="minimum" placeholder = "{{input.label}}" ng-required="input.isRequired" /></div>';
            var checkboxMarkup = '<div class="checkbox"><input floating-label type="checkbox" ng-model="input.checked" id="{{input.CustomFieldGuid}}" /><label for="{{input.CustomFieldGuid}}" ng-required="input.isRequired">{{input.label}} </label></div>';
            var dateMarkup = '<div class="dropdown">\
                                    <a class="dropdown-toggle" id="custom-dropdown-' + scope.input.CustomFieldGuid + '" role="button" data-toggle="dropdown" data-target="#" href="#">\
                                    <div class="input-group">\
                                        <input type="text" floating-label placeholder = "{{input.label}}" class="form-control" value="{{ input.Date | date: \'MM/dd/yyyy\' }}" ng-required="input.isRequired"/>\
                                        <span class="input-group-addon">\
                                            <i class="glyphicon glyphicon-calendar"></i>\
                                        </span>\
                                    </div>\
                                    </a>\
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel" ng-show="isEditing">\
                                    <datetimepicker data-ng-model="input.Date" data-datetimepicker-config="{dropdownSelector: \'#custom-dropdown-' + scope.input.CustomFieldGuid + '\', minView:\'day\' }" />\
                                    </ul>\
                                </div>';

            switch (scope.input.inputType) {
                case 1:

                    el.append(textboxMarkup);
                    break;
                case 2:
                    el.append(checkboxMarkup);
                    break;
                case 3:
                    el.append(selectMarkup);
                    break;
                case 4:
                    el.append(multiselectMarkup);
                    break;
                case 5:
                    el.append(dateMarkup);
                    break;
                case 6:
                    el.append(numberMarkup);
                    break;
                case 7:
                    el.append(currencyMarkup);
                    break;
                case 8:
                    el.append(textareaMarkup);
                    break;
            }
            $compile(el)(scope);
            element.append(el);
        }
    }
}]);