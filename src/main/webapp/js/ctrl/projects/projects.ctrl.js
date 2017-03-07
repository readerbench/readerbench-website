"use strict";

angular.module('controllers').controller('ProjectsController', ['$scope', function ($scope) {
    $scope.projectsList = Projects;
}])