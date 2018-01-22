define(['paw2017a1frontend','services/authService','controllers/ReplyModalCtrl'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.directive('postView', function() {
       return {
			restrict: 'E',
			replace: 'true',
			templateUrl: 'views/postView.html',
			scope: {post: '='},
			controller: ['$scope','$sce','authService','$uibModal' ,function($scope,$sce,auth,$uibModal) {
				$scope.user = auth.getLoggedUser();
				var post = $scope.post;
				$scope.isSameUser = $scope.user != null ?  $scope.user.id === $scope.post.message.user.id : false;

				$scope.post.contextSharers.forEach(function(element){
						if (element.id == $scope.user.id)
							$scope.haveShared = true;
				});

				$scope.trustedVideoUrl = function(url) {
					return $sce.trustAsResourceUrl(url);
				};

				$scope.replyModal = function(){
					return $uibModal.open({
						templateUrl: 'views/modals/replyModal.html',
						controller: 'ReplyModalCtrl',
						  resolve: {
					           post: function () {
					            	return $scope.post;
					           }
				         }
					}).result.catch(function(res) {
					  if (!(res === 'backdrop click' || res === 'escape key press')) {
					    throw res;
					  }
					});;
				}

			}]
		}
    });

});
