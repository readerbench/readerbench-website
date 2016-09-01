'use strict';

angular.module('ngModules', ['ngAnimate', 'ngSanitize']);
angular.module('3rdPartyModules', ['pascalprecht.translate', 'ngTagsInput',
    'duScroll', 'ui.router', 'ui.bootstrap.modal', 'ui.bootstrap.tooltip'])
.value('duScrollEasing', function (x) {
    // ease-out cubic
    return (--x) * x * x + 1;
});

angular.module('controllers.auth', []);
angular.module('controllers.modals', []);
angular.module('controllers', ['controllers.auth', 'controllers.modals']);
angular.module('directives', []);
angular.module('filters', []);
angular.module('models', []);
angular.module('resolvers', []);
angular.module('services', []);
angular.module('urls', ['templates']);
angular.module('modals', ['templates']);
angular.module('templates', []);


angular.module('chat', ['ngModules', '3rdPartyModules', 'controllers', 'models',
    'services', 'directives', 'filters', 'urls', 'modals', 'config'])
/**
 * Use html5 pushstate if supported
 */
.config(['$locationProvider', function ($locationProvider) {
//    $locationProvider.html5Mode(true);
}])
/**
 * Get default language and use it for the translation service
 */
.config(['$translateProvider', 'configProvider', function ($translateProvider, configProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix: '/chat/app/lang/',
        suffix: '.json'
    });
//    $translateProvider.preferredLanguage('en');

}])
.config(['configProvider', 'SocketProvider', function (configProvider, SocketProvider) {
    SocketProvider.connect(configProvider.config.socket);
}])
.run(['$rootScope', 'Socket', 'config', 'Auth', '$translate', '$templateCache', function ($rootScope, Socket, config, Auth, $translate, $templateCache) {

    $templateCache.put('template/modal/window.html', "<div tabindex=\"-1\" role=\"dialog\" class=\"modal fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\"><div class=\"modal-dialog\" ng-class=\"{'modal-sm': size == 'sm', 'modal-lg': size == 'lg'}\"><div class=\"modal-content\" ng-transclude></div></div></div>");

    $templateCache.put('template/modal/backdrop.html', "<div class=\"modal-backdrop fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1040 + (index && 1 || 0) + index*10}\"></div>");

    $templateCache.put('template/tooltip/tooltip-popup.html', "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\" ng-bind=\"content\"></div></div>");

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //you code goes here
        console.log(toParams);
        var language = toParams.lang;
        console.log("lang: " + language);
        $translate.use(language);
    });
    
    $rootScope.State = {loading: true};
    function rendered() {
        $rootScope.State.loading = false;
    }
    Auth.$loading.promise.then(rendered, rendered);

    Auth.setSessionId();
    Auth.check();
}]);
