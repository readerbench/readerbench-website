'use strict';

angular.module('urls')
.config(function ($stateProvider, $urlRouterProvider, Templates) {
    var Resolvers = angular.module('resolvers'),
        Modals = angular.module('modals');

    var views = {
        auth: {
            template: '<ui-view></ui-view>',
            controller: 'Auth'
        },
        logout: {
            templateUrl: Templates.auth.logout,
            controller: 'Logout'
        },
        main: {
            templateUrl: Templates.main,
            controller: ''
        },
        dashboard: {
            templateUrl: Templates.dashboard,
            controller: 'Dashboard'
        },
        dashboardSection: {
            template: '<div scroll-to-dashboard-section></div>'
        },
        header: {
            templateUrl: Templates.header,
            controller: 'Header'
        },
        sidebar: {
            templateUrl: Templates.sidebar,
            controller: 'Sidebar'
        },
        room: {
            templateUrl: Templates.room,
            controller: 'RoomCtrl'
        }
    };

    $urlRouterProvider
        .when('/', '/en/dashboard')
        .otherwise('/');

    $stateProvider
        .state('auth', {
            url: '/auth',
            views: {
                auth: views.auth
            },
            resolve: {
                translation: Resolvers.Translation
            },
            onEnter: function ($rootScope) {
                $rootScope.State.auth = true;
            },
            onExit: function ($rootScope) {
                $rootScope.State.auth = false;
            }
        })
        .state('auth.login', {
            url: '/login',
            templateUrl: Templates.auth.login,
            controller: 'Login'
        })
        .state('auth.signup', {
            url: '/signup',
            templateUrl: Templates.auth.signup,
            controller: 'Signup'
        })
        .state('auth.forgot', {
            url: '/forgot',
            templateUrl: Templates.auth.forgot,
            controller: 'Forgot'
        })
        .state('logout', {
            parent: null,
            url: '/auth/logout',
            views: {
                logout: views.logout
            }
        })
        .state('main', {
            url: '/:lang',
            abstract: true,
            views: {
                main: views.main
            },
            params: {
                lang: null
            },
            resolve: {
                auth: Resolvers.Auth,
                rooms: Resolvers.Dashboard,
                users: Resolvers.Friend,
                bookmarks: Resolvers.Bookmark({limit: 5}),
                translation: Resolvers.Translation
            }
        })
        .state('main.dashboard', {
            url: '/dashboard',
            views: {
                header: views.header,
                sidebar: views.sidebar,
                dashboard: views.dashboard
            }
        })
        .state('main.dashboard.modal', {
            url: '/m/:modal',
            onEnter: Modals.openModal(),
            onExit: Modals.closeModal
        })
        .state('main.dashboard.section', {
            url: '/s/:section',
            views: {
                'dashboard.section': views.dashboardSection
            }
        })
        .state('main.dashboard.section.modal', {
            url: '/m/:modal',
            onEnter: Modals.openModal(),
            onExit: Modals.closeModal
        })
        .state('main.chat', {
            abstract: true,
            views: {
                room: views.main
            }
        })
        .state('main.chat.room', {
            url: '/room/:roomId',
            views: {
                header: views.header,
                sidebar: views.sidebar,
                room: views.room
            },
            resolve: {
                roomMessages: Resolvers.Message
            },
            data: {
                channel: 'room'
            }
        })
        .state('main.chat.friend', {
            url: '/friend/:friendId',
            views: {
                header: views.header,
                sidebar: views.sidebar,
                room: views.room
            },
            resolve: {
                roomMessages: Resolvers.Message
            }
        })
        .state('main.chat.room.keyword', {
            url: '/keyword/:keyword',
            onEnter: Modals.openModal('keyword', {size: 'lg'}),
            onExit: Modals.closeModal,
            data: {
                parent: 'main.chat.room'
            }
        })
        .state('main.chat.room.export', {
            url: '/export',
            onEnter: Modals.openModal('exportTranscript'),
            onExit: Modals.closeModal,
            data: {
                parent: 'main.chat.room'
            }
        })
        .state('main.chat.room.modal', {
            url: '/m/:modal',
            onEnter: Modals.openModal(),
            onExit: Modals.closeModal
        })


        // State for global modals which are children of the
        // current state
        .state('modal', {
            url: '/m/:modal'
        });
});
