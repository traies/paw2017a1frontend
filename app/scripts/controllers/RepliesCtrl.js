define(['paw2017a1frontend', 'directives/postView', 'services/MessageService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('RepliesCtrl', ['$scope', '$sce', '$stateParams', 'MessageService', 'youtubePattern', function($scope, $sce, $stateParams, MessageService, youtubePattern) {


        $scope.replies = [];

        MessageService.idMessageResource().get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.post = data;
            $scope.setContentText = function (){
                $scope.contentType = 'text';
            };
            $scope.setContentVideo = function (){
                $scope.contentType = 'video';
            };


            $scope.submitReply= function (){
                if($scope.replyForm.$valid) {
                    MessageService.idMessageResource().reply({
                        id: $stateParams.id,
                        media: $scope.contentType,
                        body: $scope.body
                    }).$promise.then(function(data){
                        $scope.postError = false;
                        $scope.post.times_replied ++;
                        $scope.replies.unshift(data);
                        console.log(data);
                        $scope.body = undefined;
                        $scope.replyForm.$submitted = false;
                    }, function(err){
                        $scope.postError = true;
                    });
                }
            }

            $scope.closeModal = function(){
                $replyModal.close(true);
            }
        }, function(error) {

        });

        MessageService.idMessageResource().replies({id: $stateParams.id}, function(data) {
            Array.prototype.push.apply($scope.replies,data);
        }, function(error) {

        });

		$scope.contentType = 'text';
		$scope.body = '';
		$scope.youtubePattern = youtubePattern;
        $scope.postError = false;

        $scope.deleteMessage = function(id, index){
            MessageService.idMessageResource()
            .delete({id: id})
            .$promise.then(
                function (data) {
                    $scope.replies.splice(index, 1);
                    $scope.post.times_replied--;
                },
                function (error){
                }
            );
        };

        $scope.trustedVideoUrl = function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);

});
