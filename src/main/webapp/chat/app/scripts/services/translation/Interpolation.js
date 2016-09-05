'use strict';

angular.module('services')
.factory('Interpolation', function () {
    return {
        setLocale: function () {},

        interpolate: function (string, interpolateParams) {
            if (!angular.isObject(interpolateParams)) {
                return string;
            }
            string = string.split(' ');
            string = _.map(string, function (word) {
                var startIdx = word.indexOf('__'),
                    endIdx = word.lastIndexOf('__'),
                    solved = '';
                if (startIdx >= 0 && endIdx >= 0 && startIdx !== endIdx) {
                    solved = interpolateParams[word.slice(startIdx + 2, endIdx)];
                    if (!angular.isUndefined(solved)) {
                        word = word.slice(0, startIdx) + solved + word.slice(endIdx + 2);
                    }
                    return word;
                }
                return word;
            });
            return string.join(' ');
        }
    };
});
