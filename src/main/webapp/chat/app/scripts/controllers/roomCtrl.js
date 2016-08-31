'use strict';

/**
 * Dashboard controller
 * Handles services touch events
 * Handles search route updates and shows marketing card modals based on search params
 */
angular.module('controllers')
.controller('RoomCtrl', function ($scope, $state, $stateParams, $timeout, $focus,
        Alert, Language, User, Room, Message, Reply, Bookmark) {

    $focus($scope, 'postbox');
    $scope.User = User;
    $scope.Message = Message;
    $scope.Bookmark = Bookmark;
    $scope.roomId = +$stateParams.roomId || +$stateParams.friendId;
    $scope.room = Room.data[$scope.roomId];
    $scope.languages = [['English', 'en'], ['Español', 'es'], ['Français', 'fr'], ['Deutch', 'de'], ['Italiano', 'it'], ['Português', 'pt-br'], ['Romanian', 'ro']];

    $scope.init = function () {
        $scope.msg = {
            message: '',
            reply: {},
            user: User.user.id
        };
    };

    $scope.send = function () {
        var replies = [];
        angular.forEach($scope.msg.reply, function (value, msgId) {
            if (value) {
                replies.push(+msgId);
            }
        });

        delete $scope.msg.reply;

        $scope.msg.createdAt = (new Date()).toISOString();
        $scope.msg.room = $scope.roomId;
        //Language.detect($scope.msg.content).then(function (data) {
        //$scope.msg.language = data.data.language;
        Message.create($scope.msg).then(function (message) {
            if (replies.length) {
                Reply.create({message: message.id, messages: replies}).then(function (reply) {
                    Message.update(message.id, {reply: reply.id});
                });
            }
            Room.update($scope.roomId, {lastMessageAt: $scope.msg.createdAt});
            $scope.init();
        });
    };

    $scope.translate = function (message, to) {
        Language.translate(message.message, to).then(function (translatedText) {
            message.message = translatedText;
            $focus($scope, 'postbox');
        });
    };

    $scope.editMessage = function (message) {
        if (message && message.id) {
            $scope.edit = message;
            message.editedMessage = message.message;
            $focus($scope, 'message');
        } else {
            $scope.edit = false;
        }
    };

    $scope.updateMessage = function () {
        var message = $scope.edit;
        Message
        .update(message.id, {message: message.editedMessage})
        .then(function (data) {
            Alert.success('Succesfully updated the message.');
            $scope.editMessage(null);
        }, function (err) {
            Alert.error('Failed to update the message.');
            $scope.editMessage(null);
        });
    };

    $scope.highlight = function (messages) {
        $scope.isHighlight = {};
        angular.forEach(messages, function (id) {
            $scope.isHighlight[id] = true;
        });

        $timeout(function () {
            $scope.isHighlight = {};
        }, 3500);
    };

    $scope.init();
});
