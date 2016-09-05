/* jshint bitwise: false */
'use strict';

angular.module('filters')
.filter('findKeywords', function ($sce, $stateParams, Data) {
    var keywords = [];
    var getKeywords = function (children) {
        angular.forEach(children, function (child) {
            keywords.push(child.name);
            if (child.children.length > 0) {
                getKeywords(child.children);
            }
        });
    };

    getKeywords(Data.children);

    return function (msg) {
        angular.forEach(keywords, function (keyword) {
            var start, end, tokens = msg.toLowerCase().match(/\S+/g);
            if (tokens.indexOf(keyword.toLowerCase()) >= 0) {
                start = msg.toLowerCase().indexOf(keyword.toLowerCase());
                end = start + keyword.length;
                msg = msg.substring(0, start) + '<a href="room/' + $stateParams.roomId + '/keyword/' + keyword +
                    '" class="keyword">' + msg.substring(start, end) + '</a>' + msg.substring(end);
            }
        });

        return $sce.trustAsHtml(msg);
    };
});
