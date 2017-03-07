"use strict";

angular.module('controllers').controller('HeaderController',
    ['$scope', '$window', function ($scope, $window) {
        if (_isNotMobile) $scope.hamburgerMenu = true;
        $scope.openMenu = function () {
            $scope.hamburgerMenu = !$scope.hamburgerMenu;
        };
        // angular.element($window).bind("scroll", function() {
        // console.log("in scroll")
        // if (this.pageYOffset >= 70) {
        // $scope.isFixed = false;
        // console.log( $scope.isFixed)
        // } else {
        // $scope.isFixed = true;
        // console.log( $scope.isFixed)
        // }
        // return $scope.isFixed;
        // })
}])