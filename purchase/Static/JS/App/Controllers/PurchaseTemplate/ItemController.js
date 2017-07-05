
app.controller("ItemController", function ($scope, $window, $rootScope) {


    var randomImageUrl = function () {
        return 'https://placeimg.com/' + (Math.floor(Math.random() * 3) + 600) + '/' + (Math.floor(Math.random() * 300) + 600) + '/any';
    }
    $scope.active = 0;
    $scope.slides = [
    { img: randomImageUrl(), id: 0 }, { img: randomImageUrl(), id: 1 }, { img: randomImageUrl(), id: 2 }]
    $scope.banner = {};
    $scope.setSlide = function (i) {
        $scope.active = i;
    }




})