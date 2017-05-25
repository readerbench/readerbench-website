"use strict";

angular.module('controllers').controller('PeopleController', ['$scope', function ($scope) {
    $scope.peopleListUPB = PeopleUPB;
    $scope.peopleListLSE = PeopleLSE;
    $scope.peopleListLMU = PeopleLMU;
    $scope.peopleListASU = PeopleASU;
    $scope.peopleListGSU = PeopleGSU;
    $scope.peopleListPrevious = PeoplePrevious;
}]);