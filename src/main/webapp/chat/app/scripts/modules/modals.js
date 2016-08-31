'use strict';

/**
 * Modal controller
 */
angular.module('modals')
.service('Modals', function (Templates) {
    var templates = Templates.modal;
    // Global modals which can be displayed on top
    // of current state
    return {
        'new-room': {
            templateUrl: templates.newRoom,
            controller: 'newRoom'
        },
        'invite-friend': {
            templateUrl: templates.inviteFriend,
            controller: 'inviteFriend'
        },
        'my-profile': {
            templateUrl: templates.myProfile,
            controller: 'myProfile'
        },
        'change-language': {
            templateUrl: templates.changeLanguage,
            controller: 'changeLanguage'
        },
        'feedback': {
            templateUrl: templates.feedback,
            controller: 'feedback'
        }
    };
});

angular.module('modals')
.openModal = function (modalName, options) {
    return function ($rootScope, $state, $stateParams, $modal, Templates, Modals) {
        // create a new blank scope and add a close method, which will be reused
        // on all modals
        var scope = $rootScope.$new(true),
            globalParams = {
                windowClass: 'modal-flex'
            };
        if (options) {
            angular.extend(globalParams, options);
        }
        scope.close = function () {
            $stateParams.modalInstance.dismiss();
        };

        if (modalName) {
            $stateParams.modalInstance = $modal.open(angular.extend({
                templateUrl: Templates.modal[modalName],
                controller: modalName,
                scope: scope
            }, globalParams));
        } else {
            if (Modals[$stateParams.modal]) {
                $stateParams.modalInstance = $modal.open(
                    angular.extend({}, Modals[$stateParams.modal], {scope: scope}, globalParams));
            } else {
                $state.go('main.dashboard');
            }
        }
        $stateParams.modalInstance.result.then(function () {}, function () {
            var parent = $state.current.data && $state.current.data.parent;
            if (parent) {
                $state.go($state.current.data.parent);
            } else {
                var modalIdx = $state.current.name.indexOf('.modal');
                $state.go($state.current.name.substring(0, modalIdx));
            }
            $stateParams.modalInstance = null;
        });
    };
};

angular.module('modals').closeModal = function ($stateParams) {
    if ($stateParams.modalInstance) {
        $stateParams.modalInstance.close();
    }
};

angular.module('modals')
.run(['$rootScope', '$state', function ($rootScope, $state) {
    $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {

        if (_.contains(['modal'], toState.name)) {
            event.preventDefault();
            $state.go(fromState.name + '.' + toState.name,
                angular.extend({}, fromParams, toParams));
        }
    });
}]);
