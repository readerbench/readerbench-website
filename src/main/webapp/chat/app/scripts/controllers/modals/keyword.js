'use strict';

/**
 *
 */
angular.module('controllers.modals')
.controller('keyword', function ($scope, $state, $stateParams, $timeout, Data) {
    $scope.keyword = $stateParams.keyword;

    $scope.drawGraph = function () {
        var rgraph = new $jit.RGraph({
            // Where to append the visualization
            injectInto: 'rgraph',
            // Optional: create a background canvas that plots concentric circles.
            background: {
                CanvasStyles: {
                    strokeStyle: '#777',
                    height: '700px'
                }
            },
            // Add navigation capabilities: zooming by scrolling and panning.
            Navigation: {
                enable: true,
                panning: true,
                zooming: 10
            },
            // Set Node and Edge styles.
            Node: {
                color: '#888'
            },

            Edge: {
                color: '#C17878',
                lineWidth: 1.5
            },

            onBeforeCompute: function (node) {},

            //Add the name of the node in the correponding label
            //and a click handler to move the graph.
            //This method is called once, on label creation.
            onCreateLabel: function (domElement, node) {
                domElement.innerHTML = node.name;
                domElement.onclick = function (){
                    rgraph.onClick(node.id, {
                        onComplete: function () {}
                    });
                };
            },
            // Change some label dom properties.
            // This method is called each time a label is plotted.
            onPlaceLabel: function (domElement, node){
                var style = domElement.style;
                style.display = '';
                style.fontFamily = 'Roboto';
                style.cursor = 'pointer';

                if (node._depth <= 1) {
                    style.fontSize = '1.1em';
                    style.color = '#09f';

                } else if (node._depth == 2){
                    style.fontSize = '1em';
                    style.color = '#222';

                } else if (node._depth == 3) {
                    style.fontSize = '0.9em';
                    style.color = '#444';

                } else if (node._depth == 4) {
                    style.fontSize = '0.8em';
                    style.color = '#555';

                } else {
                    style.fontSize = '0.7em';
                    style.color = '#666';
                }

                var left = parseInt(style.left);
                var w = domElement.offsetWidth;
                style.left = (left - w / 2) + 'px';
            }
        });

        // load JSON data
        rgraph.loadJSON(Data);
        // trigger small animation
        rgraph.graph.eachNode(function (n) {
            var pos = n.getPos();
            pos.setc(-200, -200);
        });
        rgraph.compute('end');
        rgraph.fx.animate({
            modes:['polar'],
            duration: 1000
        });
    };

    $timeout(function () {
        $scope.drawGraph();
    }, 500);

});
