'use strict';

angular.module('templates')
.constant('Templates', {
    auth: {
        login: '/chat/app/views/auth/login.html',
        forgot: '/chat/app/views/auth/forgot.html',
        reset: '/chat/app/views/auth/reset.html',
        signup: '/chat/app/views/auth/signup.html'
    },
    main: '/chat/app/views/main.html',
    header: '/chat/app/views/header.html',
    sidebar: '/chat/app/views/sidebar.html',
    dashboard: '/chat/app/views/dashboard.html',
    room: '/chat/app/views/room.html',
    modal: {
        myProfile: '/chat/app/views/modals/my-profile.html',
        changeLanguage: '/chat/app/views/modals/change-language.html',
        feedback: '/chat/app/views/modals/feedback.html',
        newRoom: '/chat/app/views/modals/new-room.html',
        inviteFriend: '/chat/app/views/modals/invite-friend.html',
        keyword: '/chat/app/views/modals/keyword.html',
        exportTranscript: '/chat/app/views/modals/export-transcript.html'
    },
    alert: '/chat/app/views/alert.html'
});
