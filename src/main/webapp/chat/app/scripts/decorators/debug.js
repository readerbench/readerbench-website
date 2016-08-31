/* jshint bitwise: false */
'use strict';

/**
 * $log.debug decorator for pretty printing
 */
angular.module('decorators')
.config(['$provide', function ($provide) {
    $provide.decorator('$log', ['$delegate', 'config',
        function ($delegate, config) {

        if (!config.features.debug) {
            $delegate.debug = function () {};
            return $delegate;
        }

        $delegate.debug = function (options) {
            var msg = options.msg,
                cmd = options.cmd,
                color = '#888',
                type = 'debug';

            if (options.type === 'RCV') {
                color = 'blue';
            }

            if (~cmd.indexOf('.ERROR') || ~cmd.indexOf('.AUTH_NEEDED') ||
                    ~cmd.indexOf('INTERNAL_ERROR')) {
                color = 'red';
            }

            console[type]('%c' + options.type + ' %c' + cmd,
                'color: ' + color, 'background: #222;' +
                'color: white', msg);

            if (angular.isArray(msg) && console.table) {
                console.table(msg);
            }
        };

        return $delegate;
    }]);
}]);
