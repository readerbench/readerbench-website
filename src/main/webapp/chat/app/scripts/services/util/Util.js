'use strict';

/**
 * @ngdoc service
 * @name services.Util
 *
 * @description
 * Utility service to be reused across the application.
 */

angular.module('services')
.factory('Util', function ($window, $document, $translate) {
    var Util = {
        /**
         * @ngdoc function
         * @name services.Util#getScreenWidth
         * @methodOf services.Util
         * @function
         *
         * @description
         * On mobile devices, screen.availWidth stays the same regardless of the orientation
         * of the device.
         *
         * @returns {Number} The screen width.
         */
        getScreenWidth: function () {
            var orientation = Math.abs($window.orientation) - 90 === 0 ? 'landscape' : 'portrait';
            return (orientation === 'landscape') ? screen.availHeight : screen.availWidth;
        },

        /**
         * @ngdoc function
         * @name services.Util#setWindowTtitle
         * @methodOf services.Util
         * @function
         *
         * @description
         * Set the document title to the given string.
         *
         * @param {String} title Sets a new title for the document.
         */
        setWindowTitle: function (title) {
            $document.prop('title', $translate(title));
        },

        /**
         * @ngdoc function
         * @name services.Util.getNameFromEmail
         * @methodOf services.Util
         * @function
         *
         * @description
         * Tries to extract the real name from an email address.
         *
         * @param {String} email The given email address.
         * @returns {String} The real name based on the given email address.
         */
        getNameFromEmail: function (email) {
            var name = email ? email.split('@')[0] : '';

            if (name) {
                name = name.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s\s+/g, ' ');
            }

            return Util.toTitleCase(name);
        },

        /**
         * @ngdoc function
         * @name services.Util.getNameFromEmail
         * @methodOf services.Util
         * @function

         * @description
         * Capitalizes first letter of each word.
         *
         * @param {String} string The string to be titleized.
         * @returns {String} The titleized version of the given string.
         */
        toTitleCase: function (string) {
            return string.replace(/\w\S*/g, function (word) {
                return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
            });
        }
    };

    return Util;
});
