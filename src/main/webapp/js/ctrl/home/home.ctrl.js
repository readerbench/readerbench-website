"use strict";

angular.module('controllers').controller('HomeController', ['$scope', function ($scope) {
    $scope.browseSections = BrowseItems;
    $scope.aboutSections = AboutSections;
}]);