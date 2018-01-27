'use strict';
define(
	['paw2017a1frontend',
	'services/MessageService',
	'typeahead',
	'typeahead-jquery'],
	function(paw2017a1frontend) {

	paw2017a1frontend.controller('ReplyModalCtrl',
	['$scope',
	'MessageService',
	'post',
	'$uibModalInstance',
	'youtubePattern',
	function($scope, messageService, post, $replyModal, youtubePattern) {
		$scope.postUsername = post.message.author.name;
		$scope.contentType = 'text';
		$scope.body = '';
		$scope.youtubePattern = youtubePattern;
		$scope.postError = false;


		$scope.setContentText = function (){
			$scope.contentType = 'text';
		};
		$scope.setContentVideo = function (){
			$scope.contentType = 'video';
		};


		$scope.submitReply= function (){
			if($scope.replyForm.$valid) {
				messageService.idMessageResource().reply({
					id: post.message.id,
					media: $scope.contentType,
					body: $scope.body
				}).$promise.then(function(data){
					$scope.postError = false;
					post.times_replied ++;
					$replyModal.close(true);
				}, function(err){
					$scope.postError = true;
					console.log('error');
				});
			}
		}

		$scope.closeModal = function(){
			$replyModal.close(true);
		}
	}]);
});
