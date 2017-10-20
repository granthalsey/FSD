(function () {
    'use strict';

    angular.module("app").controller('pages', ['themeFactory', 'layoutFactory', '$scope', '$rootScope', 'uuid2', '$http', '$stateParams',
    function (themeFactory, layoutFactory, $scope, $rootScope, uuid2, $http, $stateParams) {
        var pageVM = this;
        pageVM.themeObj = themeFactory.getTheme();
        pageVM.availableFonts = [];
        //        pageVM.themeCss = themeFactory.getThemeCss();
        var applied = themeFactory.applyTheme(pageVM.themeObj);

        pageVM.updateThemePreview = function () {
            themeFactory.saveTheme(pageVM.themeObj);
            themeFactory.applyTheme(pageVM.themeObj);
        };


        //todo fill from event settings or somewhere
        pageVM.availableLanguges =
        {
            english: "English",
            french: "French"

        }
        pageVM.currentLanguage = 'english';

        pageVM.layout = {};

        var initLayout = function () {

            pageVM.layout = layoutFactory.getLayout(activePage);
            pageVM.treeLayout = []; //used for tree layout for d&d
            //push content into 
            for (var x in pageVM.layout.content) {
                log(pageVM.layout.content[x]);
                pageVM.treeLayout.push(pageVM.layout.content[x]);
            }
        }
        var activePage = $stateParams.page;
        pageVM.toggleActivePage = function (p) {
            log(p);
            activePage = p;
            initLayout();

        }
        pageVM.toggleActivePage(activePage);

        pageVM.isChildFriendly = layoutFactory.isChildFriendly;

        //syncs the left drag and drop to the right 
        $scope.$watch(
                   "pageVM.treeLayout",
                   function handleChange(newValue, oldValue) {
                       log('fired watch, syncing layout');
                       newValue !== oldValue ? pageVM.layout.content = pageVM.treeLayout : false;
                   }, true
               );


        $scope.$watch(
              "pageVM.themeObj",
              function handleChange(newValue, oldValue) {
                  log('fired watch, syncing theme');
                  newValue !== oldValue ? pageVM.updateThemePreview() : false;
              }, true
          );



        //// mock data - these should be broken into components etc
        pageVM.fundraiserLeaderBoard = {};
        pageVM.fundraiserLeaderBoard.fundraisers = [{ "first_name": "Dane", "last_name": "Jezzard", "amount raised": "694.56" }, { "first_name": "Jake", "last_name": "Bachman", "amount raised": "921.00" }, { "first_name": "Audy", "last_name": "Berntsson", "amount raised": "721.07" }, { "first_name": "Alf", "last_name": "Fitzroy", "amount raised": "534.15" }, { "first_name": "Friederike", "last_name": "Wyrill", "amount raised": "902.30" }, { "first_name": "Melloney            ", "last_name": "Ainslie", "amount raised": "995.51" }, { "first_name": "Ashlie", "last_name": "Ashfold", "amount raised": "903.65" }, { "first_name": "Boone", "last_name": "Hendriksen", "amount raised": "870.75" }, { "first_name": "Nicolais            ", "last_name": "Tombleson           ", "amount raised": "776.74" }, { "first_name": "Justino", "last_name": "Drogan", "amount raised": "738.59" }];


        //various UI controls
        pageVM.enableRearrange = false;

        pageVM.toggleEnableRerrange = function () {
            pageVM.enableRearrange = !pageVM.enableRearrange;
            pageVM.editingWidgetIndex = null;
            return pageVM.enableRearrange;
        }
        pageVM.editingWidgetIndex = null;
        pageVM.editWidget = function (i) {
            pageVM.setActiveTab('content');
            if (i === pageVM.editingWidgetIndex) {
                pageVM.editingWidgetIndex = null;
            } else {
                pageVM.editingWidgetIndex = i;
            }
            //todo angularize this
            $(".active.widget").removeClass('active');
            $('html, body').animate({
                scrollTop: $("#widget" + i).offset().top
            }, function () {
                $('.sticky-wrapper').scrollTop($('.sticky-wrapper').scrollTop() + $("#editor" + i).position().top);
                $("#widget" + i).addClass('active');
            });
            return pageVM.editingWidgetIndex;
        }

        pageVM.isCurrentEditingWidget = function (i) {
            return !!(i === pageVM.editingWidgetIndex);
        }

        $rootScope.$on('editWidget', function (event, i) {
            pageVM.editWidget(i);

        });
        pageVM.newSubItem = function (scope) {
            var newId = uuid2.newguid();
            var nodeData = scope.$modelValue;
            nodeData.content.push({
                "new": true,
                id: newId
            });
            pageVM.editWidget(newId);
        };
        pageVM.availableWidgets = layoutFactory.availableWidgets();
        pageVM.availableSizes = layoutFactory.availableSizes();

        pageVM.committWidget = function (scope) {
            log('committAddWidget', scope);
            scope.new ? delete scope.new : false;
        };

        //hacky tab logic - move to ui router tabs
        pageVM.activeTab = 'content';
        pageVM.isActiveTab = function (t) { return t === pageVM.activeTab };
        pageVM.setActiveTab = function (t) { return pageVM.activeTab = t };


        // hacky accordion logic
        pageVM.currentElementIndex = null;
        pageVM.isCurrentEditingElement = function (i) { return i === pageVM.currentElementIndex };
        pageVM.setActiveElementIndex = function (i) { return pageVM.currentElementIndex = i };

        //
        pageVM.colorPickerOptions = {};
        pageVM.colorPickerOptions.allowEmpty = true;
        pageVM.colorPickerOptions.alpha = true;
        pageVM.colorPickerOptions.format = 'rgb';
        pageVM.colorPickerOptions.swatchBootstrap = true;
        pageVM.colorPickerOptions.swatch = true;
        pageVM.colorPickerOptions.hue = true;
        pageVM.colorPickerOptions.saturation = true;
        pageVM.colorPickerOptions.round = false;
        // pageVM.colorPickerOptions.swatchOnly = true;
        pageVM.colorPickerOptions.swatchPos = 'left';
        pageVM.colorPickerOptions.clear = {
            show: true,
            label: 'Clear',
            class: 'btn btn-sm'
        },
        pageVM.colorPickerOptions.reset = {
            show: true,
            label: 'Reset',
            'class': 'btn btn-sm'
        }


        // font nonsense - move to  them service
        pageVM.findFont = function () {
            var apiUrl = [];
            apiUrl.push('https://www.googleapis.com/webfonts/v1/webfonts?');
            apiUrl.push('key=AIzaSyAqK4YTd1_hhVjJ8ZgbqIjrkRJIMSAXPeI');
            apiUrl.push('&sort=popularity');
            var url = apiUrl.join('');
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                response.data && response.data.items ? pageVM.availableFonts = response.data.items : response.items = [];
                pageVM.availableFonts = pageVM.availableFonts.slice(0, 200);

                var fontsToLoad = [];

                for (var i = 0; i < pageVM.availableFonts.length; i++) {
                    fontsToLoad.push(pageVM.availableFonts[i].family);

                }
                WebFont.load({
                    google: {
                        families: fontsToLoad
                    }
                });

            }, function errorCallback(response) {

            });
        }
        pageVM.findFont();
        pageVM.layout.pageType === 'event' ? pageVM.setActiveTab('design') : pageVM.setActiveTab('content');
        pageVM.isReadable = themeFactory.isReadable;
        pageVM.brighten = themeFactory.brightenColor;
        pageVM.darken = themeFactory.darkenColor;

    }]);

})();


