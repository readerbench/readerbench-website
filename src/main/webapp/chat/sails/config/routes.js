/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://links.sailsjs.org/docs/config/routes
 */

var allowedDomains = ['http://localhost:9000', 'http://localhost:8999', '*']

module.exports.routes = {

    '/': {
        view: 'homepage'
    },

    'GET /session': {
        controller: 'auth',
        action: 'getSessionId',
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    '/user': {
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    '/user/*': {
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    '/room': {
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    '/room/*': {
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    '/friend': {
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    '/friend/*': {
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    '/message': {
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    '/message/*': {
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    '/reply': {
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    '/bookmark': {
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    '/bookmark/*': {
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    'POST /feedback': {
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    'GET /transcript/export/:room': {
        controller: 'export',
        action: 'create',
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    'POST /language/detect': {
        controller: 'language',
        action: 'detect',
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    'POST /language/translate': {
        controller: 'language',
        action: 'translate',
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    'POST /upload/profile/picture/:user': {
        controller: 'upload',
        action: 'uploadPicture',
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    'POST /auth/login': {
        controller: 'auth',
        action: 'login',
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    'POST /auth/login/token': {
        controller: 'auth',
        action: 'tokenLogin',
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    'POST /auth/signup': {
        controller: 'auth',
        action: 'signup',
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    'POST /auth/forgot': {
        controller: 'auth',
        action: 'forgot',
        cors: {
            origin: allowedDomains.join(',')
        }
    },

    'POST /auth/logout': {
        controller: 'auth',
        action: 'logout',
        cors: {
            origin: allowedDomains.join(',')
        }
    },

};
