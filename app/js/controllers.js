'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
   .controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {

        syncData('syncedValue').$bind($scope, 'syncedValue');

   }])

   .controller('LoginCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {

      $scope.login = function(provider, cb) {
         $scope.err = null;

            loginService.login(provider, function(err, user) {
               $scope.err = err? err + '' : null;
               if( !err ) {
                  cb && cb(user);
               }
            });
      };
   }])

   .controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location', function($scope, loginService, syncData, $location) {

        syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

        $scope.logout = function() {
            loginService.logout();
        };

        if ($scope.auth.user.provider === 'google') {
            $scope.pictureUrl = $scope.auth.user.thirdPartyUserData.picture;
        } else if ($scope.auth.user.provider === 'twitter') {
            $scope.pictureUrl = $scope.auth.user.thirdPartyUserData.profile_image_url_https;
        } else {
            $scope.pictureUrl = "img/user-icon.png";
        }

   }])

    .controller('GameCtrl', ['$scope', function($scope) {
        $scope.gameBoardImgUrl = 'img/full-board.png';
        $scope.canvasKineticObj = false;
        $scope.canvaskineticStageObj = false;
        $scope.isDraggable = true;
    }]);