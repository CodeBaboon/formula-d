'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
    .directive('backImg', function(){
        return function(scope, element, attrs){
            attrs.$observe('backImg', function(value) {
                element.css({
                    'background-image': 'url(' + value +')',
                    'background-size' : 'cover'
                });
            });
        };
    })
    .directive('draggableCanvas', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            scope: {
                kineticobj: '=',
                kineticstageobj: '=',
                isdraggable: '='
            },
            link: function (scope, el, attrs) {
                console.log("in");
                if (!scope.kineticstageobj) {
                    var id = attrs["id"];
                    //create random unique id
                    if (!id) {
                        id = Math.random().toString(36).substring(7);
                    }
                    if (!scope.kineticstageobj) {
                        scope.kineticstageobj = new Kinetic.Stage({
                            container: id,
                            width: 1740,
                            height: 1162
                        });
                    }
                    if (!scope.kineticstageobj.container) {
                        scope.kineticstageobj.attrs.container = id;
                    }
                }
                var layer = new Kinetic.Layer();
                var rectX = scope.kineticstageobj.getWidth() / 2 - 50;
                var rectY = scope.kineticstageobj.getHeight() / 2 - 25;

                //if kineticObj is null, init
                var options = {
                    x: rectX,
                    y: rectY,
                    width: 30,
                    height: 16,
                    fill: '#00D2FF',
                    stroke: 'black',
                    strokeWidth: 4
                };
                if (scope.isdraggable) {
                    options.draggable = true;
                }
                if (!scope.kineticobj) {
                    scope.kineticobj = new Kinetic.Rect(options);
                }

                // add cursor styling
                scope.kineticobj.on('mouseover', function () {

                    document.body.style.cursor = 'pointer';

                });
                scope.kineticobj.on('mouseout', function () {
                    document.body.style.cursor = 'default';
                    $rootScope.$emit("CANVAS-MOUSEOUT");
                });

                layer.add(scope.kineticobj);
                scope.kineticstageobj.add(layer);

            }
        }
    }]);
