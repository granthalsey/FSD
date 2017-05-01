
var eua = angular.module("eua", ["angular.vertilize",
"ui.router",
'ui.bootstrap']);


eua.controller("base", function ($scope, $window, $rootScope) {



    $scope.banner = {};





    // refactor to directive
    // banner size logic
    var imgLoad = $("<img />");
    imgLoad.attr("src", 'images/hero-banner.png');
    imgLoad.unbind("load");
    var imageWidth = 0;
    var imageHeight = 0;
    var ratio = 0;

    imgLoad.bind("load", function () {

        // Get image sizes
        imageWidth = this.width;
        imageHeight = this.height;
        ratio = imageHeight / imageWidth;
        setBanner();


    });

    angular.element($window).bind("scroll", function () { setBanner(); });
    angular.element($window).bind("resize", function () { setBanner(); });
    var setBanner = function () {
        var windowWidth = $(window).width();
        var scrollHeight = $(window).scrollTop();
        var documentHeight = $(document).height();
        var MAX_BANNER_HEIGHT = 450;
        var scrollRatio = (documentHeight - scrollHeight) / documentHeight;
        scrollRatio = Math.pow(scrollRatio, 5);

        $scope.banner.height = Math.min(MAX_BANNER_HEIGHT, Math.max(0, parseInt(windowWidth * ratio * scrollRatio)));
        $scope.$apply();
    }
    $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

})



////////  states!


eua.config(function ($stateProvider, $urlRouterProvider) {
    // push states into array
    alert('');
    var states = [];

    states.push({
        name: 'home',
        url: '/home',
        templateUrl: 'templates/home.html'
    });
    states.push({
        name: 'profile',
        url: '/profile',

        templateUrl: 'templates/items.html'
    });
    states.push({
        name: 'donations',
        url: '/donations',

        templateUrl: 'templates/item.html'
    });

    states.push({
        name: 'fundraisingpage',
        url: '/fundraisingpage',

        templateUrl: 'templates/fundraisingpage.html'
    });
    // register states
    console.log(states);
    for (var i = 0; i < states.length; i++) {
        console.log(states);
        $stateProvider.state(states[i]);
    }

    $urlRouterProvider.otherwise("/home");

});


/*!
 * angular-vertilize 1.0.0
 * Christopher Collins
 * https://github.com/Sixthdim/angular-vertilize.git
 * License: MIT
 */
(function () {
    "use strict";

    var module = angular.module('angular.vertilize', []);

    // Vertilize Container
    module.directive('vertilizeContainer', [
      function () {
          return {
              restrict: 'EA',
              controller: [
                '$scope', '$window',
                function ($scope, $window) {
                    // Alias this
                    var _this = this;

                    // Array of children heights
                    _this.childrenHeights = [];

                    // API: Allocate child, return index for tracking.
                    _this.allocateMe = function () {
                        _this.childrenHeights.push(0);
                        return (_this.childrenHeights.length - 1);
                    };

                    // API: Update a child's height
                    _this.updateMyHeight = function (index, height) {
                        _this.childrenHeights[index] = height;
                    };

                    // API: Get tallest height
                    _this.getTallestHeight = function () {
                        var height = 0;
                        for (var i = 0; i < _this.childrenHeights.length; i = i + 1) {
                            height = Math.max(height, _this.childrenHeights[i]);
                        }
                        return height;
                    };

                    // Add window resize to digest cycle
                    angular.element($window).bind('resize', function () {
                        return $scope.$apply();
                    });
                }
              ]
          };
      }
    ]);

    // Vertilize Item
    module.directive('vertilize', [
      function () {
          return {
              restrict: 'EA',
              require: '^vertilizeContainer',
              link: function (scope, element, attrs, parent) {
                  // My index allocation
                  var myIndex = parent.allocateMe();

                  // Get my real height by cloning so my height is not affected.
                  var getMyRealHeight = function () {
                      var clone = element.clone()
                        .removeAttr('vertilize')
                        .css({
                            height: '',
                            width: element.width(),
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            visibility: 'hidden'
                        });
                      element.after(clone);
                      var realHeight = clone.height();
                      clone['remove']();
                      return realHeight;
                  };

                  // Watch my height
                  scope.$watch(getMyRealHeight, function (myNewHeight) {
                      if (myNewHeight) {
                          parent.updateMyHeight(myIndex, myNewHeight);
                      }
                  });

                  // Watch for tallest height change
                  scope.$watch(parent.getTallestHeight, function (tallestHeight) {
                      if (tallestHeight) {
                          element.css('height', tallestHeight);
                      }
                  });
              }
          };
      }
    ]);

}());


