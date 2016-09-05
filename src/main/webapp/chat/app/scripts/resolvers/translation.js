'use strict';

/**
 * Translation resolver which returns a resolved promise only when
 * the translation service has been set up (it uses a language and
 * the ajax call getting the json with the language has been returned)
 */
angular.module('resolvers').Translation = function ($translate, config) {
    return $translate.use(config.language);
};

angular.module('resolvers').Translation.$inject = ['$translate', 'config'];
