'use strict';

/**
 * Change language controller.
 *
 * @description
 * Changes the current application language.
 */
angular.module('controllers.modals')
.controller('changeLanguage', function ($scope, $translate, config) {
    $scope.language = config.language;

    $scope.changeLanguage = function (language) {
        if (language === config.language) {
            $scope.close();
        } else {
            $translate.use(language).then(function () {
                config.language = language;
                $scope.close();
            });
        }
    };
});
