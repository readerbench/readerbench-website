'use strict';
/**
 * @description
 * Displays the user name or email
 */
angular.module('filters')
.filter('userName', function () {

    return function (user) {
        if (user.name) {
            return user.name;
        } else {
            return user.email;
        }

        return '';
    };
});
