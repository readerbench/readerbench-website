'use strict';

/**
 *
 */
angular.module('controllers.modals')
.controller('newRoom', function ($scope, $state, $q, $focus, User, Room) {
    $focus($scope, 'name');

    $scope.room = {
        name: '',
        isPrivate: 'public',
        friends: []
    };

    $scope.submit = function () {
        var members = _.map($scope.room.friends, function (friend) {
            return friend.id
        });
        members.push(User.user.id);
        Room.create({
            name: $scope.room.name,
            user: User.user.id,
            isPrivate: $scope.room.isPrivate === 'public',
            users: members
        });
        $scope.close();
    };

    $scope.friends = function(search) {
        var deferred = $q.defer(),
            friends = [];

        search = search.toLowerCase();

        _.each(User.objects, function (friend) {
            if (friend.id !== User.user.id &&
                    friend.name.toLowerCase().indexOf(search) === 0) {
                friends.push({
                    text: friend.name,
                    id: friend.id
                });
            }
        });

        deferred.resolve(friends);
        return deferred.promise;
    };
});
