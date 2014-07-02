'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
   .controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
      syncData('syncedValue').$bind($scope, 'syncedValue');
   }])

   .controller('LoginCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
      $scope.email = null;
      $scope.pass = null;
      $scope.confirm = null;
      $scope.createMode = false;

      $scope.login = function(provider, cb) {
         $scope.err = null;
//         if( !$scope.email ) {
//            $scope.err = 'Please enter an email address';
//         }
//         else if( !$scope.pass ) {
//            $scope.err = 'Please enter a password';
//         }
//         else {
            loginService.login(provider, function(err, user) {
               $scope.err = err? err + '' : null;
               if( !err ) {
                  cb && cb(user);
               }
            });
//         }
      };
   }])

   .controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location', function($scope, loginService, syncData, $location) {
      syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

        $scope.logout = function() {
            loginService.logout();
        };

        $scope.oldpass = null;

        if ($scope.auth.user.provider === 'google') {
            $scope.pictureUrl = $scope.auth.user.thirdPartyUserData.picture;
        } else if ($scope.auth.user.provider === 'twitter') {
            $scope.pictureUrl = $scope.auth.user.thirdPartyUserData.profile_image_url_https;
        } else {
            $scope.pictureUrl = "img/user-icon.png";
        }
      $scope.newpass = null;
      $scope.confirm = null;

      $scope.reset = function() {
         $scope.err = null;
         $scope.msg = null;
      };

      $scope.updatePassword = function() {
         $scope.reset();
         loginService.changePassword(buildPwdParms());
      };

      function buildPwdParms() {
         return {
            email: $scope.auth.user.email,
            oldpass: $scope.oldpass,
            newpass: $scope.newpass,
            confirm: $scope.confirm,
            callback: function(err) {
               if( err ) {
                  $scope.err = err;
               }
               else {
                  $scope.oldpass = null;
                  $scope.newpass = null;
                  $scope.confirm = null;
                  $scope.msg = 'Password updated!';
               }
            }
         }
      }

   }]);