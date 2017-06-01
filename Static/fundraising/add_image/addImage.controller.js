(function () {
    'use strict';

    angular.module("Fundraising")
        .controller("AddImageController", addImageController)
        .component("addImage", {
            templateUrl: "static/fundraising/add_image/add-image.html",
            controller: "AddImageController",
            controllerAs: "vmAddImage"
        });

    addImageController.$inject = [
        "$scope",
        "$rootScope",
        "$state",
        "$stateParams",
        "FundraisingRepository"
    ];

    function addImageController($scope, $rootScope, $state, $stateParams, fundraisingRepository) {
        var vm = this;
        vm.hasImage = false;
        vm.imageUrl = "";
        vm.imageUrl = $stateParams.imageUrl;
        vm.imageSelected = {};
        vm.sendImages = sendImages;
        vm.imageStrings = [];
        vm.eventImages = "";
        vm.imageSelected = imageSelected;
        vm.uploadEventImage = uploadEventImage;
        vm.selected = -1;

        activate();


        function activate() {
            vm.eventImages = fundraisingRepository.geteventPageImages();
            if (vm.eventImages) {
                vm.eventImages = fundraisingRepository.getcategoryImages();
            }
        }

        function imageSelected(data, url) {
            vm.imageStrings = [];
            vm.imageStrings[0] = url;
            vm.selected = data;
        }

        function sendImages() {

            var imageObject = vm.imageSelected.files;

            angular.forEach(imageObject, function (flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    var uri = event.target.result;
                    vm.imageStrings[i] = uri;
                    $state.go('fundraising.edit', { imageObject: vm.imageStrings[0] });
                };
                fileReader.readAsDataURL(flowFile.file);
            });
        }

        function uploadEventImage() {

            $state.go('fundraising.edit', { imageObject: vm.imageStrings[0] });
        }


    }
})();