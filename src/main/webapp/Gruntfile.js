module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-connect-rewrite');
    grunt.loadNpmTasks('grunt-contrib-connect');

    var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;
    var rewrite = require('connect-modrewrite');

    grunt.initConfig({
        connect: {
          server: {
            options: {
              port: 9000,
              base: '',
              keepalive: true,
              

              middleware: function(connect, options) {

                var middleware = [];

                // 1. mod-rewrite behavior
                var rules = [
                    '^/docs/sentiment-analysis/manual$ https://docs.google.com/document/d/1QLQ5tArdyrZurp_uCqg4wTsFRpzWsTybHQaeMYwYD5A/edit?usp=sharing [R]',
                    '^/docs/sentiment-analysis/sdd$ https://docs.google.com/document/d/1zcSfpth0UP4qm9T8VkIJca7TqOvtQtWTrZ-FbnCENDQ/edit?usp=sharing [R]',
                   
                    '^/docs/semantic-models/manual$ https://docs.google.com/document/d/1d_kT2V8_AOefrRv1gPTjYsvNOLWkapLSkXy93KgirrM/edit#heading=h.b1foaomg7if4 [R]',
                    '^/docs/semantic-models/sdd$ https://docs.google.com/document/d/1fMyOof5giKd9-BZt9i4ThXzi7hNp_fqFIa9U8BD3haQ/edit [R]',
                   
                    '^/docs/essay-grading/manual$ https://docs.google.com/document/d/1d_kT2V8_AOefrRv1gPTjYsvNOLWkapLSkXy93KgirrM/edit#heading=h.typdl8bjnljw [R]',
                    '^/docs/essay-grading/sdd$ https://docs.google.com/document/d/1r2l_qaewGmZP_yKwg6lVQHw4n5T1gMqQjUm46z1a-VY/edit [R]',
                   
                    '^/docs/cscl/manual$ https://docs.google.com/document/d/1d_kT2V8_AOefrRv1gPTjYsvNOLWkapLSkXy93KgirrM/edit#heading=h.r5mzxbuhlnrd [R]',
                    '^/docs/cscl/sdd$ https://docs.google.com/document/d/17JP49EtZXoZglRLklLeGnVLwBRT2hKsBuuf9PUFVbGs/edit [R]',
                   
                    '^/docs/reading-strategies/manual$ https://docs.google.com/document/d/1d_kT2V8_AOefrRv1gPTjYsvNOLWkapLSkXy93KgirrM/edit#heading=h.8waasfe8387d [R]',
                    '^/docs/reading-strategies/sdd$ https://docs.google.com/document/d/1Q-BsAuWp2XmY1xmqursZuTbIyzeXoEAWs0m4mXDhhTc/edit [R]',
                    
                    '^/webvowl$ /webvowl/index.html',

                    '^/chat$ /chat/app/index.html',
                    '^/chat/app$ /chat/app/index.html',
                    
                    '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
                ];
                middleware.push(rewrite(rules));

                // 2. original middleware behavior
                var base = options.base;
                if (!Array.isArray(base)) {
                    base = [base];
                }
                base.forEach(function(path) {
                    middleware.push(connect.static(path));
                });

                return middleware;

              }

            }
          }
        }
    });

};
