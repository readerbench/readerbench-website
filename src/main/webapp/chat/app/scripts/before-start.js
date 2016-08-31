'use strict';
/**
 *  Add / to pathname if is missing from the end of the string
 */
//if (window.location.href.indexOf('#') !== -1 && window.location.pathname.slice(-1) !== '/') {
//    window.location.pathname = window.location.pathname + '/';
//}

//(function () {
//
//    var defaultLanguage = 'en',
//        base = window.location.pathname.split('#')[1],
//        head = document.getElementsByTagName('head')[0],
//        regEx = /^(([a-z]{2}\-[a-z]{2})|([a-z]{2}))$/i;
//
//    /**
//        Add html tag
//     */
//    function addTag(tag, attrs) {
//        var elem = document.createElement(tag),
//            name;
//
//        for (name in attrs) {
//            if (attrs[name]) {
//                elem.setAttribute(name, attrs[name]);
//            }
//        }
//
//        head.appendChild(elem);
//    }
//
//    // @ToDo Replace condition with language detection regexp
//    if (base.match(regEx)) {
//        addTag('base', {href: ['/', base, '/'].join('')});
//    } else {
//        window.location.pathname = defaultLanguage + window.location.pathname;
//    }
//
//})();
