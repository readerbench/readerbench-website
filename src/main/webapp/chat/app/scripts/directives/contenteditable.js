'use strict';

angular.module('directives')
.directive('contenteditable', function ($sce, $timeout) {
    function setEndOfContenteditable(contentEditableElement) {
        var range, selection;
        if (document.createRange) {
            range = document.createRange();
            range.selectNodeContents(contentEditableElement);
            range.collapse(false);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
        else if (document.selection) {
            range = document.body.createTextRange();
            range.moveToElementText(contentEditableElement);
            range.collapse(false);
            range.select();
        }
    }
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        scope: {
            submit: '=submit'
        },
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) {
                return; // do nothing if no ng-model
            }

            // Specify how UI should be updated
            ngModel.$render = function () {
                element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
            };

            // Listen for change events to enable binding
            element.on('blur keyup change', function (event) {
                scope.$apply(read);
                if (event.keyCode === 13) {
                    return scope.submit();
                }
            });

            // Write data to the model
            function read() {
                var html = element.text();
                // When we clear the content editable the browser leaves a <br> behind
                // If strip-br attribute is provided then we strip this out
                if (attrs.stripBr && html === '<br>') {
                    html = '';
                }
                ngModel.$setViewValue(html);
            }

            element.html(ngModel);
            $timeout(function () {
                setEndOfContenteditable(element[0]);
            }, 50);
        }
    };
});
