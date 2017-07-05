(function () {
    'use strict';

    app.controller('BaseController', ['EventService','EventRepository','PurchaseItemsService','$window', '$rootScope', '$scope',
        function (EventService, EventRepository, PurchaseItemsService, $window, $rootScope, $scope) {


            $scope.banner = {};
            // refactor to directive
            // banner size logic
            var imgLoad = $("<img />");
            imgLoad.attr("src", 'images/hero-banner.png');
            imgLoad.unbind("load");
            var imageWidth = 0;
            var imageHeight = 0;
            var ratio = 0;
            PurchaseItemsService.setImageWriteUrl($scope.url);
            EventService.setLanguage($window.serverSettings.language);
            EventService.setEventId($window.serverSettings.eventId);
            EventService.setWebGetServiceUrl($window.serverSettings.webGetServiceUrl);
            EventService.setImageWriterUrl($window.serverSettings.imageWriterUrl);
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
            getEvent();
            function getEvent() {
                EventRepository.getEvent($window.serverSettings.eventId, $window.serverSettings.language, $window.serverSettings.webGetServiceUrl).then(success).catch(error);
                function success(data) {
                    EventService.setEvent(data);
                }
                function error(error) {
                    console.log(error);
                }
            }
        }])


})();
