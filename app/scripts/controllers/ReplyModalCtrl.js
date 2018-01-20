'use strict';
define(['paw2017a1frontend','services/restService','typeahead','typeahead-jquery'], function(paw2017a1frontend) {

	paw2017a1frontend.controller('ReplyModalCtrl', ['$scope','restService','post','$uibModalInstance' ,function($scope,rest,post,$replyModal) {
		$scope.postUsername = post.message.user.name;
		$scope.contentType = 'Text';
		$scope.body = '';
		$scope.link = '';
		$scope.youtubePattern = /^(?:https:\/\/(?:www\.)?)?((?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\?t=(?:[0-9]+m)?[0-9]+s)?)$/;


		$scope.setContentText = function (){
			$scope.contentType = 'Text';
		};
		$scope.setContentVideo = function (){
			$scope.contentType = 'Video';
		};


		$scope.submitReply= function (){
			if($scope.replyForm.$valid) {
				console.log("submiting reply");
				//post
				$replyModal.close(true);
			}
		}
		$scope.closeModal = function(){
			$replyModal.close(true);
		}
	}]);
});

