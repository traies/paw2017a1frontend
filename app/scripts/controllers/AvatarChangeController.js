define(['paw2017a1frontend'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('AvatarChangeController',
    ['$scope', '$rootScope', '$location','Upload','baseUrl',
    function($scope,$rootScope, $location, Upload, baseUrl) {

        $scope.avatarError = false;

        $scope.upload = function (file) {

          console.log(file);

          $scope.avatarError = false;

          var next = $location.search().next;
          $scope.url = next != null ? next : '/';

          Upload.upload({
            url: baseUrl + '/api/user/avatar',
            data: {image: file}
          }).then(function (resp) {
            $location.path($scope.url);
          }, function (resp) {
            $scope.avatarError = true;
          }, function (evt) {
            //using this it is possible to show progress
            //to the user
          });
        };

        $scope.submit = function(){
          if ($scope.avatarForm.avatar.$valid && $scope.avatar) {
            $scope.upload($scope.avatar);
          }
        };


    }]);

});
