'use strict';

/**
 * User model
 * Stores user's data and profile info
 */
angular.module('models')
.factory('User', function (Model) {

    var User = Model.extend({
        channel: '/user',
        init: function (userData) {
            userData.id = +userData.id;
            this.user = userData;
            this.deferred.resolve(userData);
        },

        updateModel: function (model) {
            this.$super.prototype.updateModel.call(this, model);
            if (model.id === this.user.id) {
                angular.extend(this.user, model);
            }
        }
    });

    return new User();
});
