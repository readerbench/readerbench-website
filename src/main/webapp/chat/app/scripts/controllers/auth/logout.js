/* jshint expr:true */
'use strict';

/**
 * Logout Controller
 */
angular.module('controllers')
.controller('Logout', function (Auth) {
    Auth.logOut();
});
