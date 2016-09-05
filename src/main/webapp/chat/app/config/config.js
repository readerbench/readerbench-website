//config test1
'use strict';
angular.module('config', [])
.provider('config', function () {
    var server = 'http://localhost:1337/';
    this.$get = function () {
        return this.config;
    };
    this.config = {
        socket: 'http://localhost:1337/',
        api: {
            'export': server + 'transcript/export/:roomId',
            uploadPicture: server + 'upload/profile/picture/:userId',
            language: {
                detect: server + '/language/detect',
                translate: server + 'language/translate'
            },
        },
        cdn: '',
        desktop: {
            host: '',
            dashboard: '#dashboard/desktop',
            reset: '#auth/reset/{hash}'
        },
        language: window.location.pathname.split('/')[1],
        /* List of enabled languages */
        languages: {
            'en': 'English',
            'de': 'Deutsch',
            'fr': 'Français',
            'es': 'Español',
            'it': 'Italiano',
            'pt-br': 'Português'
        },
        cookie: {
            language: 'lang',
            sid: 'sails.sid',
            token: 'sails.sidToken',
            secure: false
        },
        logServer: '',
        timeouts: {
            notification: 4000
        },
        features: {
            debug: true
        },
        session: {
            userInactivityTimer: 6000 * 1000, //6000 seconds
            ttlToMiliseconds: 1000 // converter value from seconds to miliseconds.
        }
    };
});
